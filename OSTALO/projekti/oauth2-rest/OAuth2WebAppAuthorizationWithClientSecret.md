<!-- TOC -->

- [Dohvaćanje keycloak endpointa](#dohva-anje-keycloak-endpointa)
- [SpringBoot REST app](#springboot-rest-app)
- [Korištenje](#kori-tenje)

<!-- /TOC -->

## Dohvaćanje keycloak endpointa

Predložak URL-a: `http://<host>:<port>/auth/realms/<realm_name>/.well-known/openid-configuration`

Primjer dohvaćanja liste URL-ova:

```sh
curl https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration
```

Kao rezultat dobiti ćemo JSON iz kojeg nam je važno:

**authorization_endpoint** za *authortization flow* (klijentska web-applikacija npr. React i mobilne aplikacije):

```sh
curl -s https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration | jq '.authorization_endpoint'

"https://iotat.tel.fer.hr:58443/auth/realms/spring/protocol/openid-connect/auth" 
```

**token_endpoint** - za dohvaćanje tokena

```sh
curl -s https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration | jq '.token_endpoint'

"https://iotat.tel.fer.hr:58443/auth/realms/spring/protocol/openid-connect/token"
```

Token se može dohvatiti ili kao *access type* koji je:

- `public` - za *authorization flow*
- `confidential` - za poslužiteljske web-applikacije (potreban je *client secret*)

Ovaj URL služi i za obnavljanje tokena.

**end_session_endpoint** - za odlogiravanje korisnika

```sh
curl -s https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration | jq '.end_session_endpoint'

"https://iotat.tel.fer.hr:58443/auth/realms/spring/protocol/openid-connect/logout"
```

Služi za odlogirati korisnika. Radi se POST sa tijelom koje je kodirao `x-www-form-urlencoded`. Sadržaj mora imati: 

- `client_id`
- `client_secret` - jedino ako je *access type*  `confidential` i 
- `refresh_token`

**revocation_endpoint** - opozivanje tokena

```sh
curl -s https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration | jq '.revocation_endpoint'

"https://iotat.tel.fer.hr:58443/auth/realms/spring/protocol/openid-connect/revoke"
```

Kada se žali opozvati token (*refresh_token* ili *access_token*) treba napraviti POST s tijelom koje je kodirano `x-www-form-urlencoded`. Sadržaj mora biti:

- `token` - token koji se želi opozvati
- `token_type_hint` - koji može imati vrijednosti `refresh_token` ili `access_token`

**device_authorization_endpoint** - za device flow

```sh
curl -s https://iotat.tel.fer.hr:58443/auth/realms/spring/.well-known/openid-configuration | jq '.device_authorization_endpoint'

"https://iotat.tel.fer.hr:58443/auth/realms/spring/protocol/openid-connect/auth/device"
```

Ovo se koristi za uređeje koji su nesigurni tj. ne mogu imati tajnu i koji nemaju mogućnost otvaranja preglednika.

## SpringBoot REST app

dodati ovisnost:

```groovy
implementation 'org.keycloak:keycloak-spring-boot-starter:15.0.2'
```

U `application.propreties` dodati:

```properties
keycloak.realm                      = <REALM_NAME>
keycloak.auth-server-url            = <KEYCLOAK_SERVER_URL>/auth
keycloak.ssl-required               = external
keycloak.resource                   = <CLIENT_ID>
keycloak.credentials.secret         = <CLIENT_SECRET>
keycloak.bearer-only                = true
keycloak.principal-attribute        = preferred_username
# ako se koriste role definirane za klijenta 
keycloak.use-resource-role-mappings = true
# ako se koriste role definirane za realm
keycloak.use-resource-role-mappings = false
```

npr.:

```properties
keycloak.realm=spring
keycloak.auth-server-url=http://localhost:8180/auth
keycloak.ssl-required=external
keycloak.resource=rest-keycloak
keycloak.credentials.secret=fakeKeycloakSecret
keycloak.bearer-only=true
keycloak.principal-attribute=preferred_username
keycloak.use-resource-role-mappings=true
```

Napraviti klasu `KeycloakSecurityConfig`:

```java
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true)
public class KeycloakSecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);
    http.authorizeRequests().anyRequest().permitAll();
    http.csrf().disable();
  }

  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
    KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
    keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());
    auth.authenticationProvider(keycloakAuthenticationProvider);
  }

  @Bean
  @Override
  protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
    return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
  }

  public static List<GrantedAuthority> getRoles() {
    try {
      Authentication auth = SecurityContextHolder.getContext().getAuthentication();
      return auth.getAuthorities().stream().collect(Collectors.toList());
    } catch (Exception e) {
      return null;
    }
  }
}
```

Napraviti `KeycloakConfig`:

```java
@Configuration
public class KeycloakConfig {
  @Bean
  public KeycloakConfigResolver keycloakConfigResolver() {
    return new KeycloakSpringBootConfigResolver();
  }
}
```

Napraviti kontroler:

```java
@RestController
@RequestMapping("/")
public class TestController {

  @GetMapping("/a")
  public ResponseEntity<String> getAnonymous() {
    return ResponseEntity.ok("Anonymous response");
  }

  @RolesAllowed("iot-read")
  @GetMapping("/read")
  public ResponseEntity<String> getUser() {
      return ResponseEntity.ok("Reading response");
  }

  @RolesAllowed("iot-write")
  @GetMapping("/write")
  public ResponseEntity<String> getAdmin() {
      return ResponseEntity.ok("Writing response");
  }

  @RolesAllowed({"iot-write", "iot-read"})
  @GetMapping("/info")
  public ResponseEntity<String> getInfo(Principal principal) {
    StringBuilder sb = new StringBuilder();

    sb.append("Principal: ");
    sb.append(principal.getName());
    sb.append("\nAuthorities:\n");

    sb.append(KeycloakSecurityConfig.getRoles().stream()
      .map(ga -> ga.getAuthority())
      .collect(Collectors.joining("\n  ", "  ", "\n")));

    return ResponseEntity.ok("Info response\n" + sb.toString());
  }
}
```

## Korištenje

Kada neautorizirani korisnik šalje upit:

- `/a` - Anonymous response
- `/read` - 401 Unauthorized
- `/write` - 401 Unauthorized

Kada autorizirani korisnik šalje upite:

- **u1**
  - `/info`
    - Principal: u1
    - Authorities:
      - ROLE_iot-read
      - ROLE_fer
      - ROLE_ferit
      - ROLE_offline_access
      - ROLE_uma_authorization
      - ROLE_default-roles-spring
      - ROLE_app-user
  - `/a` - Anonymous response
  - `/read` - Reading response
  - `/write` - 403 Forbidden
- **u2**
  - `/info`
    - Principal: u2
    - Authorities:
      - ROLE_iot-write
      - ROLE_offline_access
      - ROLE_default-roles-spring
      - ROLE_app-maintainer
      - ROLE_uma_authorization
  - `/a` - Anonymous response
  - `/read` - 403 Forbidden
  - `/write` - Writing response
- **u3**
  - `/info`
    - Principal: u3
    - Authorities:
      - ROLE_iot-read
      - ROLE_iot-write
      - ROLE_fer
      - ROLE_ferit
      - ROLE_offline_access
      - ROLE_uma_authorization
      - ROLE_default-roles-spring
      - ROLE_app-admin
  - `/a` - Anonymous response
  - `/read` - Reading response
  - `/write` - Writing response
- **u4**
  - `/info`
    - Principal: u4
    - Authorities:
      - ROLE_iot-read
      - ROLE_fer
      - ROLE_fer-user
      - ROLE_offline_access
      - ROLE_default-roles-spring
      - ROLE_uma_authorization
  - `/a` - Anonymous response
  - `/read` - Reading response
  - `/write` - 403 Forbidden
