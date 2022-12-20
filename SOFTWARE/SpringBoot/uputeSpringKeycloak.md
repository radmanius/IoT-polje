# Upute

<!-- TOC -->

- [Upute](#upute)
    - [Osnovni projekt](#osnovni-projekt)
    - [Keycloak](#keycloak)
        - [Pokretanje](#pokretanje)
        - [Konfiguracija](#konfiguracija)
    - [Podešavanje spring boota](#podešavanje-spring-boota)
    - [Korištenje](#korištenje)
        - [Bez tokena](#bez-tokena)
        - [Dohvaćanje tokena](#dohvaćanje-tokena)
        - [S tokenom](#s-tokenom)
        - [Istekao token](#istekao-token)
        - [Pomoćna skripta](#pomoćna-skripta)
        - [Test](#test)
            - [korisnik u1](#korisnik-u1)
            - [korisnik u2](#korisnik-u2)
            - [korisnik u3](#korisnik-u3)
    - [Literatura](#literatura)

<!-- /TOC -->

## Osnovni projekt

Napraviti spring boot projekt s:

- web
- security

## Keycloak

### Pokretanje

Koristimo bitnami/keycloak sa docker huba - https://hub.docker.com/r/bitnami/keycloak

Skinuta je datoteka `docker-compose.yml` prema uputama i promijenjeno preslikavnje *port*ova u:

```yml

...
    ports:
      - "8180:8080"
```

Nakon toga pokrećemo `docker-compose up`.

### Konfiguracija

Otvorimo stranicu: http://localhost:8180 - klik na Administartion Console

UN: user
PW: bitnami

Postupak:

1. add realm: spring
2. create client

    - Client id: rest-keycloak
    - Client protocol: openid-connect
    - Root URL: http://localhost:8080/*
    - Klik na save
    - access type: confidential
    - Authorization Enabled: ON
    - Service Accounts Enabled: ON
    - Klik na save
    - Credentials tab:
        - Client Secret je potrebna za Spring Boot Application Keycloak konfiguraciju
    - Client Roles tab:
        - add role: iot-read
        - add role: iot-write
        - add role: fer 
        - add role: ferit 
        (ako scene sadrze ostale tagove, tu je potrebno dodati identicnu rolu kako bi taj user imao prava nad tom scenom)
    - kliknuti na Roles u menu sa strane da bismo kreirali uloge na razini realma koje mogu biti komponirane od client rola
        -ovisno o roli dodati Client role (npr. fer i ferit dodati na app-admin ako zelimo da admin ima pristup scenama s tagovima fer i ferit)
        - add role: app-user
            - omogućiti composite roles
            - za client roles odabrati: rest-keycloak
            - prebaciti iot-read
        - add role: app-maintainer
        - add role: app-admin

3. create users

    - Username: u1, u2, u3
    - User enabled: on
    - Email verified: on
    - Klik na save
    - credentials tab:
        - upisati password: u1, u2, u3
        - temporary: off
        - set password
    - Role Mappings tab:
        - app-user za u1
        - app-maintainer za u2
        - app-admin za u3

## Podešavanje spring boota

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
keycloak.use-resource-role-mappings = true
keycloak.bearer-only                = true
```

npr.:

```properties
keycloak.realm                      = spring
keycloak.auth-server-url            = http://localhost:8180/auth
keycloak.ssl-required               = external
keycloak.resource                   = rest-keycloak
keycloak.credentials.secret         = 66b99ac5-41cb-40c3-9942-a60a44b03a4c
keycloak.use-resource-role-mappings = true
keycloak.bearer-only                = true
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

  @RequestMapping(value = "/a", method = RequestMethod.GET)
  public ResponseEntity<String> getAnonymous() {
    return ResponseEntity.ok("Anonymous");
  }

  @RolesAllowed("iot-read")
  @RequestMapping(value = "/read", method = RequestMethod.GET)
  public ResponseEntity<String> getUser() {
      return ResponseEntity.ok("Reading");
  }

  @RolesAllowed("iot-write")
  @RequestMapping(value = "/write", method = RequestMethod.GET)
  public ResponseEntity<String> getAdmin() {
      return ResponseEntity.ok("Writing");
  }
}
```

## Korištenje

### Bez tokena

```sh
$ curl -X GET 'http://localhost:8080/a'
Anonymous

$ curl -X GET 'http://localhost:8080/read'
{"timestamp":"2021-11-16T15:55:49.002+00:00","status":401,"error":"Unauthorized","path":"/read"}

$ curl -X GET 'http://localhost:8080/write'
{"timestamp":"2021-11-16T15:55:57.853+00:00","status":401,"error":"Unauthorized","path":"/write"}
```

### Dohvaćanje tokena

Predložak:

```sh
curl -X POST '<KEYCLOAK_SERVER_URL>/auth/realms/<REALM_NAME>/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=<CLIENT_ID>' \
 --data-urlencode 'client_secret=<CLIENT_SECRET>' \
 --data-urlencode 'username=<USERNAME>' \
 --data-urlencode 'password=<PASSWORD>'
```

za u1:

```sh
curl -X POST 'http://localhost:8180/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode 'client_secret=66b99ac5-41cb-40c3-9942-a60a44b03a4c' \
 --data-urlencode 'username=u1' \
 --data-urlencode 'password=u1'

{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvYzNNdzJieEhlTTNsWlBRclNqVk5lLVJNTXNxclFDLXZfOFM4eEl0eXdVIn0.eyJleHAiOjE2MzcwNzg4MTIsImlhdCI6MTYzNzA3ODUxMiwianRpIjoiOTRmOWNkN2YtMGY3Mi00YTE1LWFkZDktNTQ1YWYxM2RlYWM2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlMmU4NWIwZS0xZmM2LTQ1NzgtOGEwNS1mYzhhZGExYzRkNmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXN0LWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6IjMxOTExMGZmLTIyOTItNGEzMy04NmIzLTRiZDYwZmNlMDI2MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNwcmluZyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlc3Qta2V5Y2xvYWsiOnsicm9sZXMiOlsiaW90LXJlYWQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjMxOTExMGZmLTIyOTItNGEzMy04NmIzLTRiZDYwZmNlMDI2MiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.QmTCc5vFmJXBwjNJMao8HoYPjesfALotUU72d1YyiRybdNirEEuWxBzZzLLyU2z0o9rwc25pyOTHdVtpe8mkOROSXQAwX6XKiBsw--jK6TTZcg1gpkFCEad2NWxOYJYKXAV04_QkCdnl-zFfGi2cSUAEzYvFX0doR10wLhd-JRuF3HlAkVc9_wLc3aWgnmzQW-x7kAQK0S7ouMsKxHfkOi9eFmCQ_Re-_tIYOJr-lzxdEHz-p2dC_dCwf9X6uG4dzidrGlKE4oNIp3GsgSsQB51OrNJIVOOTbsfYXxK4oQzcmarDwPg4KZd_wN7pxkJsidrN_wQDoZ2FCaSVxn2AGA",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M2U3OWY2MS0yMjM0LTQ3YzUtOWM4Mi02YjRhM2NiODI2ZWIifQ.eyJleHAiOjE2MzcwODAzMTIsImlhdCI6MTYzNzA3ODUxMiwianRpIjoiZWI5YjdlN2EtMjhiNi00ODBlLWI1ZjEtNTA2OTgwMWFmNGZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODE4MC9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiJlMmU4NWIwZS0xZmM2LTQ1NzgtOGEwNS1mYzhhZGExYzRkNmQiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoicmVzdC1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiIzMTkxMTBmZi0yMjkyLTRhMzMtODZiMy00YmQ2MGZjZTAyNjIiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiIzMTkxMTBmZi0yMjkyLTRhMzMtODZiMy00YmQ2MGZjZTAyNjIifQ.3NQofY8kkiUVdbmC06BETv01jqaC7LYn3IPHghAoobs",
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "319110ff-2292-4a33-86b3-4bd60fce0262",
  "scope": "profile email"
}
```

### S tokenom

Predložak:

```sh
curl -X GET 'http://localhost:8080/read' \
--header 'Authorization: bearer <ACCESS_TOKEN>'
```

Konkretno:

```sh
curl -X GET 'http://localhost:8080/read' \
--header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJvYzNNdzJieEhlTTNsWlBRclNqVk5lLVJNTXNxclFDLXZfOFM4eEl0eXdVIn0.eyJleHAiOjE2MzcwNzg4MTIsImlhdCI6MTYzNzA3ODUxMiwianRpIjoiOTRmOWNkN2YtMGY3Mi00YTE1LWFkZDktNTQ1YWYxM2RlYWM2IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJlMmU4NWIwZS0xZmM2LTQ1NzgtOGEwNS1mYzhhZGExYzRkNmQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXN0LWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6IjMxOTExMGZmLTIyOTItNGEzMy04NmIzLTRiZDYwZmNlMDI2MiIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNwcmluZyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlc3Qta2V5Y2xvYWsiOnsicm9sZXMiOlsiaW90LXJlYWQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjMxOTExMGZmLTIyOTItNGEzMy04NmIzLTRiZDYwZmNlMDI2MiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.QmTCc5vFmJXBwjNJMao8HoYPjesfALotUU72d1YyiRybdNirEEuWxBzZzLLyU2z0o9rwc25pyOTHdVtpe8mkOROSXQAwX6XKiBsw--jK6TTZcg1gpkFCEad2NWxOYJYKXAV04_QkCdnl-zFfGi2cSUAEzYvFX0doR10wLhd-JRuF3HlAkVc9_wLc3aWgnmzQW-x7kAQK0S7ouMsKxHfkOi9eFmCQ_Re-_tIYOJr-lzxdEHz-p2dC_dCwf9X6uG4dzidrGlKE4oNIp3GsgSsQB51OrNJIVOOTbsfYXxK4oQzcmarDwPg4KZd_wN7pxkJsidrN_wQDoZ2FCaSVxn2AGA'
```

ili (vidi pomoćni dio)

```sh
curl -X GET 'http://localhost:8080/read' \
--header "Authorization: bearer $keycloak_access"
```

### Istekao token

Kada nam je istekao token onda kao odgovor dobijemo 401 i u headerima:

```http
...
 WWW-Authenticate: Bearer realm="spring", error="invalid_token", error_description="Token is not active"
```

Nakon toga se token treba ponovno dohvatiti pomoću refreash tokena:

```sh
curl -X POST '<KEYCLOAK_SERVER_URL>/auth/realms/<REALM_NAME>/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=refresh_token' \
 --data-urlencode 'client_id=<CLIENT_ID>' \
 --data-urlencode 'client_secret=<CLIENT_SECRET>' \
 --data-urlencode 'refresh_token=<REFRESH_TOKEN>'
```

Npr.

```sh
curl -X POST 'http://localhost:8180/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=refresh_token' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode 'client_secret=66b99ac5-41cb-40c3-9942-a60a44b03a4c' \
 --data-urlencode 'refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI0M2U3OWY2MS0yMjM0LTQ3YzUtOWM4Mi02YjRhM2NiODI2ZWIifQ.eyJleHAiOjE2MzcwODAzMTIsImlhdCI6MTYzNzA3ODUxMiwianRpIjoiZWI5YjdlN2EtMjhiNi00ODBlLWI1ZjEtNTA2OTgwMWFmNGZkIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODE4MC9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiJlMmU4NWIwZS0xZmM2LTQ1NzgtOGEwNS1mYzhhZGExYzRkNmQiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoicmVzdC1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiIzMTkxMTBmZi0yMjkyLTRhMzMtODZiMy00YmQ2MGZjZTAyNjIiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiIzMTkxMTBmZi0yMjkyLTRhMzMtODZiMy00YmQ2MGZjZTAyNjIifQ.3NQofY8kkiUVdbmC06BETv01jqaC7LYn3IPHghAoobs'
```

### Pomoćna skripta

Dohvaćanje tokena i spremanje u varijable:

```sh
export keycloak_response=$(
curl -X POST 'http://localhost:8180/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode 'client_secret=66b99ac5-41cb-40c3-9942-a60a44b03a4c' \
 --data-urlencode 'username=u1' \
 --data-urlencode 'password=u1') && \
 export keycloak_access=$(echo $keycloak_response | jq -r '.access_token') && \
 export keycloak_refresh=$(echo $keycloak_response | jq -r '.refresh_token')
```

Refreshanje tokena i spremanje u varijable:

```sh
export keycloak_response=$(curl -X POST 'http://localhost:8180/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=refresh_token' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode 'client_secret=66b99ac5-41cb-40c3-9942-a60a44b03a4c' \
 --data-urlencode "refresh_token=$keycloak_refresh") && \
 export keycloak_access=$(echo $keycloak_response | jq -r '.access_token') && \
 export keycloak_refresh=$(echo $keycloak_response | jq -r '.refresh_token')
```

Slanje zahtjeva:

```sh
curl -X GET 'http://localhost:8080/read' \
--header "Authorization: bearer $keycloak_access"
```

### Test

#### korisnik u1

```sh
$ curl -X GET 'http://localhost:8080/a' \
--header "Authorization: bearer $keycloak_access"

Anonymous


$ curl -X GET 'http://localhost:8080/read' \
--header "Authorization: bearer $keycloak_access"

Reading


$ curl -X GET 'http://localhost:8080/write' \
--header "Authorization: bearer $keycloak_access"

# 403
{"timestamp":"2021-11-16T16:31:16.208+00:00","status":403,"error":"Forbidden","path":"/write"}
```

#### korisnik u2

```sh
$ curl -X GET 'http://localhost:8080/a' \
--header "Authorization: bearer $keycloak_access"

Anonymous


$ curl -X GET 'http://localhost:8080/read' \
--header "Authorization: bearer $keycloak_access"

# 403
{"timestamp":"2021-11-16T16:33:57.595+00:00","status":403,"error":"Forbidden","path":"/read"}


$ curl -X GET 'http://localhost:8080/write' \
--header "Authorization: bearer $keycloak_access"

Writing
```

#### korisnik u3

```sh
$ curl -X GET 'http://localhost:8080/a' \
--header "Authorization: bearer $keycloak_access"

Anonymous


$ curl -X GET 'http://localhost:8080/read' \
--header "Authorization: bearer $keycloak_access"

Reading


$ curl -X GET 'http://localhost:8080/write' \
--header "Authorization: bearer $keycloak_access"

Writing
```

## Literatura

Po ovom primjeru su rađene upute: https://medium.com/devops-dudes/securing-spring-boot-rest-apis-with-keycloak-1d760b2004e

- keycloak running in docker
    - https://www.keycloak.org/getting-started/getting-started-docker
    - https://hub.docker.com/r/bitnami/keycloak
    - Running Keycloak with Docker - http://www.mastertheboss.com/keycloak/keycloak-with-docker/
    - https://github.com/keycloak/keycloak-containers/tree/main/server#database
- primjer korištenja keycloaka u springu
    - https://www.keycloak.org/docs/latest/securing_apps/index.html#_spring_boot_adapter
    - https://www.baeldung.com/spring-boot-keycloak
    - https://www.baeldung.com/keycloak-embedded-in-spring-boot-app
    - Easily secure your Spring Boot applications with Keycloak https://developers.redhat.com/blog/2017/05/25/easily-secure-your-spring-boot-applications-with-keycloak
        - Part 1 - https://www.youtube.com/watch?v=vpgRTPFDHAw
        - Part 2 - https://www.youtube.com/watch?v=O5ePCWON08Y
    - Secure Spring Boot Microservices with Keycloak
        - part 1 - https://www.youtube.com/watch?v=Bdg_DjuoX0A
    - Securing Spring Microservices with Keycloak - Part 1 - https://blog.jdriven.com/2018/10/securing-spring-microservices-with-keycloak-part-1/
    - Securing Spring Microservices with Keycloak – Part 2 - https://blog.jdriven.com/2018/10/securing-spring-microservices-with-keycloak-part-2/
    - authentication - Is it possible to authenticate against a Keycloak's Identity Provider (OpenAM) without using the Login screen? - Stack Overflow  https://stackoverflow.com/questions/38859379/is-it-possible-to-authenticate-against-a-keycloaks-identity-provider-openam-w
    - A Quick Guide To Using Keycloak For Identity And Access Management  https://www.comakeit.com/blog/quick-guide-using-keycloak-identity-access-management/
    - Secure Your Spring Boot App With Spring Security, GitHub Using Keycloak | Better Programming  https://betterprogramming.pub/secure-your-spring-boot-app-with-spring-security-and-github-using-keycloak-a6eb5bfeb4bf
    - Securing Spring Boot REST APIs with Keycloak | by Dinuth De Zoysa | DevOps Dudes | Medium *** odličan  https://medium.com/devops-dudes/securing-spring-boot-rest-apis-with-keycloak-1d760b2004e
    - Securing Applications using Spring Boot Keycloak Integration - Part 2  https://progressivecoder.com/securing-applications-using-spring-boot-keycloak-integration-part-2/
    - A Quick Guide to Using Keycloak with Spring Boot | Baeldung  https://www.baeldung.com/spring-boot-keycloak
    - Secure Spring Boot Application With Keycloak - DZone Java  https://dzone.com/articles/secure-spring-boot-application-with-keycloak
- primjer korištenja keycloaka u mobilnoj aplikaciji - kao klijent @aReview_daily
    - https://github.com/openid/AppAuth-Android
    - https://github.com/openid/AppAuth-iOS
