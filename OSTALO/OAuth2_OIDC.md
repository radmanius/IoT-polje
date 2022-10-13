# OAuth2 i OIDC 

## Primjer korištenja

Primjer korištenja prikazan je sljedećim slijednim dijagramom:

```puml
@startuml
autonumber


autonumber
hide footbox

participant "Resource Owner\n(user)" as RO
participant "Client\n(mob app)" as UAM
participant "User Agent\n(in app browser)" as UAB
participant "Authorization Server\n(keycloak)" as AS
participant "Resource Server\n(rest server)" as RS
participant InfluxDB as i


legend top left
App is using only Client ID. It is not using Client Secret.

For starting web browser to login to app use:
  - iOS SFSafariVeiwController
  - Android ChromeCustomTabs

Deep linking is used for redirectURI:
 - iOS - UniversalLink https://abhimuralidharan.medium.com/universal-links-in-ios-79c4ee038272
 - Android - Verify Android App Links https://developer.android.com/training/app-links/verify-site-associations
endlegend


RO -> UAM: login button
note over UAM
generate random secret (PKCE Code Verifier) - 43-128 characters
calculate hash of it (PKCE Code Callenge) - SHA256
generate URL for Authorization Server (Authorization Code Request):
  response_type=code
  PKCE Code Challenge: code_challenge=...hash
  code_challenge_method=S256
  ClientID: client_id=...
  Redirect URL: redirect_uri=deep link
  Scope: scope=...
  state=random value
end note

  group front channel
    UAM -> UAB: open generated URL
    UAB -> AS: Authorization Code Request
  end

  group login to authorization server
    AS --> UAB: Login page
    UAB --> RO: Login page
    RO -> UAB: Login credentials
    UAB -> AS: Login credentials
  end

  group consent screen
    AS --> UAB: Consent page to login to this application
    UAB --> RO: Consent page to login to this application
    RO -> UAB: Consent confirmation
    UAB -> AS: Consent confirmation
  end

  group front channel
    note left AS
    Redirect URL:
      base URL (deep link)
      code=generated code
      state=...from request
    end note
    AS --> UAB: Authorization Code Response, Redirect URL (deep link)  
    UAB --> UAM: open mobile app: Authorization Code Response, Redirect URL
  end

  group back channel
    note right UAM
    create Exchange Code for Token with Authorization Code POST request
      grand_type=authorization_code
      code=from redirect URL
      redirect_uri=...
      code_verifier=PKCE Code Verifier
      client_id=...
    end note
    UAM -> AS: Exchange Code for Token with Authorization Code, PKCE Code Verifier, Clinet ID
    note over AS
    check Authorization Code
      I created it
      It has not been used
      It is valid in time (passed <1 min)
      It is for this Client ID
      Calcualate hash and copare with PKCE Code Challenge
    end note
  AS --> UAM: Access Token, Refresh Token
  note right UAM
  check that state value is the same as in request
  save refresh token in secure storage in phone
  save access token in memory
  end note
  end

group access data
  UAM -> RS: GET keys (resource data with Access Token)
  note over RS: validate\naccess token
  RS --> UAM: key lista
  UAM -> RS: get tags (with Access token)
  note over RS: validate\naccess token
  RS --> UAM: tag list
  UAM -> RS: get scenes [with tags] (with Access token)
  note over RS: validate\naccess token
  RS --> UAM: scene list

  
  UAM --> RO: show scenes
  RO -> UAM: choose scene
  UAM -> RS: get scene (with Access token)
  note over RS: validate\naccess token
  RS --> UAM: scene with views


  loop for each view from scene
    note over UAM: fill template for view\nsend HTTP request
    UAM -> i: fetch data for view based on template
    i --> UAM: data in CSV format
  end

  UAM --> RO: Show screen with data
end


group refresh token
note right UAM
Token endpoint
  grand_type=refresh_token
  refresh_token=...
  client_id=...
end note
UAM -> AS: Refresh token request
note left AS
generate new pair of tokens
end note
end


@enduml
```

Slijedi primjer poruka:

### Poruke **1** i **2** -- nije dobro --

`client_secret` promijenite tako da ga uzmete iz `application.properties`.

```sh
curl -X POST 'http://localhost:8080/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode 'client_secret=e7f4f3e4-7503-467d-bb8e-e0463ba59020' \
 --data-urlencode 'username=u1' \
 --data-urlencode 'password=u1'

{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhSHZmV3p1Y05qZU12a3d2aGxreGpvbWY4MzJhdlQtZmdURmloNzMwbmtNIn0.eyJleHAiOjE2NDAxNjE4MDIsImlhdCI6MTY0MDE2MTUwMiwianRpIjoiMWNjOGJkY2YtY2U3Zi00MzUxLWFmNDctYTBlMTcyMjVlNzg5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3YjM0MTdmNi1iMzAzLTRiOTUtYTNkMS01YWYzNGJmZWQ2YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXN0LWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6ImFjMTRhYmUzLTgzYjQtNGZkNi04MTg4LTg5MGY5MGU5MWQ4OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNwcmluZyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlc3Qta2V5Y2xvYWsiOnsicm9sZXMiOlsiaW90LXJlYWQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImFjMTRhYmUzLTgzYjQtNGZkNi04MTg4LTg5MGY5MGU5MWQ4OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.SW4aWdGWFyPBf2jNvrHdEluJBRErd_JYhkf2Q8k-2YT2L4pTlCWQ2-85W37UFDtLBrPhbFSDffiE5ZJSTU6R6p0bVsUVLBxLm67PBeTUM-Bhx2PbzVJmXpM3nzpeVSji2fpIQ2SKW3anKQhAoWpKV3Z7XDNJmRkw5cCNt9xGdPs57ABTmldJvAWSPq0yKNUVP5vlO_TRjdEWWoHsVB7j9m0zSD26Cn3LOXB6I4UOjWGKl7uQjJ7uFvC9Ujlg30cPBUN75LHqI9Nn12Wgy4_pkKkctGpeT7WrAw3jxeTmbkZj7bkCdQKTZ-wFtjC-eIcVLIasVOX2iIcWevqabkYReQ",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiZTI0Zjk1NS1lMzEzLTRlMTktOWM1Ni01YjM4OGRiNjJkZGIifQ.eyJleHAiOjE2NDAxNjMzMDIsImlhdCI6MTY0MDE2MTUwMiwianRpIjoiMTk2MzFlYzctNWQzZS00MDNiLTg2YTAtZGQxNThiYjgwODUwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODE4MC9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiI3YjM0MTdmNi1iMzAzLTRiOTUtYTNkMS01YWYzNGJmZWQ2YjUiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoicmVzdC1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiJhYzE0YWJlMy04M2I0LTRmZDYtODE4OC04OTBmOTBlOTFkODgiLCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJhYzE0YWJlMy04M2I0LTRmZDYtODE4OC04OTBmOTBlOTFkODgifQ.RfD3MktbiiMlWcH2DDQWv0hd2gVDgNcwrbnUjhezadg",
  "token_type": "Bearer",
  "not-before-policy": 0,
  "session_state": "ac14abe3-83b4-4fd6-8188-890f90e91d88",
  "scope": "profile email"
}
```

#### Dohvaćanje tokena i spremenje u varijable

Prvo trebamo postaviti csecret (možemp pogledati u application.properties):

```sh
export csecret=e7f4f3e4-7503-467d-bb8e-e0463ba59020
```

Kako je Access token kratkog vijeka najbolje je da ga se spremi u varijablu da ne trošimo vrijeme na kopiranje. Pomoću git bash-a možemo spremiti tokene u varijable okoline `keycloak_access` i `keycloak_refresh` na sljedeći način:

```sh
export keycloak_response=$(curl -X POST 'http://localhost:8080/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=password' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode "client_secret=$csecret" \
 --data-urlencode 'username=u1' \
 --data-urlencode 'password=u1') && \
 export keycloak_access=$(echo $keycloak_response | jq -r '.access_token') && \
 export keycloak_refresh=$(echo $keycloak_response | jq -r '.refresh_token')
```

Komandom `env` možemo porovjeriti jesu li postavljene varijable okoline.

#### Refreshanje tokena i spremanje u varijable

Za obv nam je potreban alat jq kojeg možete skinuto s [ove stranice](https://stedolan.github.io/jq/download/).

```sh
export keycloak_response=$(curl -X POST 'http://localhost:8080/auth/realms/spring/protocol/openid-connect/token' \
 --header 'Content-Type: application/x-www-form-urlencoded' \
 --data-urlencode 'grant_type=refresh_token' \
 --data-urlencode 'client_id=rest-keycloak' \
 --data-urlencode "client_secret=$csecret" \
 --data-urlencode "refresh_token=$keycloak_refresh") && \
 export keycloak_access=$(echo $keycloak_response | jq -r '.access_token') && \
 export keycloak_refresh=$(echo $keycloak_response | jq -r '.refresh_token')
```

### Poruke 16 i 17

```sh
curl -X GET 'http://localhost:8081/keys' \
--header 'Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJhSHZmV3p1Y05qZU12a3d2aGxreGpvbWY4MzJhdlQtZmdURmloNzMwbmtNIn0.eyJleHAiOjE2NDAxNjE4MDIsImlhdCI6MTY0MDE2MTUwMiwianRpIjoiMWNjOGJkY2YtY2U3Zi00MzUxLWFmNDctYTBlMTcyMjVlNzg5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MTgwL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI3YjM0MTdmNi1iMzAzLTRiOTUtYTNkMS01YWYzNGJmZWQ2YjUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJyZXN0LWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6ImFjMTRhYmUzLTgzYjQtNGZkNi04MTg4LTg5MGY5MGU5MWQ4OCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo4MDgwIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXNwcmluZyIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iLCJhcHAtdXNlciJdfSwicmVzb3VyY2VfYWNjZXNzIjp7InJlc3Qta2V5Y2xvYWsiOnsicm9sZXMiOlsiaW90LXJlYWQiXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6ImFjMTRhYmUzLTgzYjQtNGZkNi04MTg4LTg5MGY5MGU5MWQ4OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.SW4aWdGWFyPBf2jNvrHdEluJBRErd_JYhkf2Q8k-2YT2L4pTlCWQ2-85W37UFDtLBrPhbFSDffiE5ZJSTU6R6p0bVsUVLBxLm67PBeTUM-Bhx2PbzVJmXpM3nzpeVSji2fpIQ2SKW3anKQhAoWpKV3Z7XDNJmRkw5cCNt9xGdPs57ABTmldJvAWSPq0yKNUVP5vlO_TRjdEWWoHsVB7j9m0zSD26Cn3LOXB6I4UOjWGKl7uQjJ7uFvC9Ujlg30cPBUN75LHqI9Nn12Wgy4_pkKkctGpeT7WrAw3jxeTmbkZj7bkCdQKTZ-wFtjC-eIcVLIasVOX2iIcWevqabkYReQ'

{
  "token1": "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
  "token2": "546thtdsghdgyre"
}
```

ili preko varijabli:

```sh
curl -X GET 'http://localhost:8081/keys' \
--header "Authorization: bearer $keycloak_access"

{
  "token1": "bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
  "token2": "546thtdsghdgyre"
}
```

ako se ništa ne ispiše moguće je da je istekao token. Možemo poslati upit s ocijom -v koja će nam ispisati zahtjev i odgovor te ćemo u odgovoru vidjeti da smo dobili 401 što znači da je istekao access token.

```sh
curl -v -X GET 'http://localhost:8081/keys' \
--header "Authorization: bearer $keycloak_access"

Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8081 (#0)
> GET /keys HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/7.64.1
> Accept: */*
> Authorization: bearer null
>
< HTTP/1.1 401
< WWW-Authenticate: Bearer realm="spring", error="invalid_token", error_description="Failed to parse JWT"
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< Pragma: no-cache
< Expires: 0
< X-Frame-Options: DENY
< WWW-Authenticate: Bearer realm="spring", error="invalid_token", error_description="Failed to parse JWT"
< Content-Length: 0
< Date: Wed, 22 Dec 2021 08:40:09 GMT
<
* Connection #0 to host localhost left intact
* Closing connection 0
```

Tada je potrebno obnoviti token kako je objašnjeno ranije.

### Poruke 18 i 19

```sh
curl -X GET 'http://localhost:8081/tags' \
--header "Authorization: bearer $keycloak_access"

[
  "fer",
  "sap01"
]
```

### Poruke 20 i 21

Popis svih scena:

```sh
curl -X GET 'http://localhost:8081/scene' \
--header "Authorization: bearer $keycloak_access"

[
  {
    "id": "scena1",
    "title": "testnaScena",
    "subtitle": "testScena"
  },
  {
    "id": "scena2",
    "title": "HUM_sap01AG",
    "subtitle": "dohvaca AVG vrijednost podataka HUM za sap01 senzor "
  },
  {
    "id": "scena3",
    "title": "sap01 scene",
    "subtitle": "dohvaca sva mjerenja za sap01 senzor"
  },
  {
    "id": "scena4",
    "title": "HUM_LW_sap02",
    "subtitle": "dohvaca HUM i LW mjerenja za sap02 senzor"
  }
]
```

Popis scena s tagom "fer":

```sh
curl -X POST 'http://localhost:8081/scene' \
--header "Authorization: bearer $keycloak_access" \
--header "Content-type: application/json" \
-d '[ "fer" ]' 

[
  {
    "id": "scena1",
    "title": "testnaScena",
    "subtitle": "testScena"
  }
]
```

### Dohvaćanje jedne scene - poruke 26 i 27

```sh
curl -X GET 'http://localhost:8081/scene/scena2' \
--header "Authorization: bearer $keycloak_access"

{
  "id": "scena2",
  "title": "HUM_sap01AG",
  "subtitle": "dohvaca AVG vrijednost podataka HUM za sap01 senzor ",
  "layout": "LIST",
  "tags": [
    "sap01"
  ],
  "views": [
    {
      "title": "HUM_sap01_agregatedAVG",
      "query": {
        "method": "POST",
        "headers": {
          "Authorization": [
            "Token {{token1}}"
          ],
          "Accept": [
            "application/csv"
          ],
          "Content-Type": [
            "application/vnd.flux"
          ]
        },
        "uri": "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"
      },
      "payload": "from(bucket:\"telegraf\")\n        |> range(start: {{startTimeISO}})\n        |> filter(fn: (r) => r._measurement == \"HUM\" and r.id_wasp == \"SAP01\" and r._field == \"value\")\n        |> drop(columns: [\"_start\", \"_stop\", \"_field\", \"host\", \"id\"])\n        |> window(every: {{agregationRange}})\n        |> mean()\n        |> duplicate(column: \"_stop\", as: \"_time\")\n        |> drop(columns: [\"_start\", \"_stop\"])\n\n"
    }
  ]
}
```

### Popuniti predložak

Opis upita je:

```
      "query": {
        "method": "POST",
        "headers": {
          "Authorization": [
            "Token {{token1}}"
          ],
          "Accept": [
            "application/csv"
          ],
          "Content-Type": [
            "application/vnd.flux"
          ]
        },
        "uri": "https://iotat.tel.fer.hr:57786/api/v2/query?org=fer"
      },
      "payload": "from(bucket:\"telegraf\")\n        |> range(start: {{startTimeISO}})\n        |> filter(fn: (r) => r._measurement == \"HUM\" and r.id_wasp == \"SAP01\" and r._field == \"value\")\n        |> drop(columns: [\"_start\", \"_stop\", \"_field\", \"host\", \"id\"])\n        |> window(every: {{agregationRange}})\n        |> mean()\n        |> duplicate(column: \"_stop\", as: \"_time\")\n        |> drop(columns: [\"_start\", \"_stop\"])\n\n"
    }
```

Iz toga vidimo da moramo poslati sljedeći HTTP zahtjev:

- metoda: POST
- zaglavlja:
  - Authorization: Token {{token1}}
    - tu moramo {{token1}} zamijeniti s tokenom koji smo dobili ranije. Rezultat je
    - Authorization: Token bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==
  - Accept: application/csv
  - Content-Type: application/vnd.flux
- URI: https://iotat.tel.fer.hr:57786/api/v2/query?org=fer
- body je zapravo payload koji se isto treba gledati kao predložak u kojem treba mijenjati dijelove:

```
from(bucket:"telegraf")
        |> range(start: 2021-12-01T00:00:00Z)
        |> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
        |> drop(columns: ["_start", "_stop", "_field", "host", "id"])
        |> window(every: 3h)
        |> mean()
        |> duplicate(column: "_stop", as: "_time")
        |> drop(columns: ["_start", "_stop"])


```  

### Poruke 26 i 27

Sada upit onda izgleda ovako:

```sh
curl -X POST 'https://iotat.tel.fer.hr:57786/api/v2/query?org=fer' \
--header "Authorization: Token bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==" \
--header "Accept: application/csv" \
--header "Content-type: application/vnd.flux" \
-d 'from(bucket:"telegraf")
        |> range(start: 2021-12-01T00:00:00Z)
        |> filter(fn: (r) => r._measurement == "HUM" and r.id_wasp == "SAP01" and r._field == "value")
        |> drop(columns: ["_start", "_stop", "_field", "host", "id"])
        |> window(every: 3h)
        |> mean()
        |> duplicate(column: "_stop", as: "_time")
        |> drop(columns: ["_start", "_stop"])'

,result,table,_measurement,id_wasp,_value,_time
,_result,0,HUM,SAP01,66.11124674479167,2021-12-01T03:00:00Z
,_result,0,HUM,SAP01,68.50276692708333,2021-12-01T06:00:00Z
,_result,0,HUM,SAP01,69.373046875,2021-12-01T09:00:00Z
,_result,0,HUM,SAP01,54.148111979166664,2021-12-01T12:00:00Z
,_result,0,HUM,SAP01,60.23073508522727,2021-12-01T15:00:00Z
,_result,0,HUM,SAP01,66.94108072916667,2021-12-01T18:00:00Z
,_result,0,HUM,SAP01,76.647216796875,2021-12-01T21:00:00Z
,_result,0,HUM,SAP01,84.67578125,2021-12-02T00:00:00Z
,_result,0,HUM,SAP01,97.99568684895833,2021-12-02T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-02T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-02T09:00:00Z
,_result,0,HUM,SAP01,94.422607421875,2021-12-02T12:00:00Z
,_result,0,HUM,SAP01,100,2021-12-02T15:00:00Z
,_result,0,HUM,SAP01,100,2021-12-02T18:00:00Z
,_result,0,HUM,SAP01,100,2021-12-02T21:00:00Z
,_result,0,HUM,SAP01,100,2021-12-03T00:00:00Z
,_result,0,HUM,SAP01,100,2021-12-03T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-03T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-03T09:00:00Z
,_result,0,HUM,SAP01,86.17268880208333,2021-12-03T12:00:00Z
,_result,0,HUM,SAP01,70.369873046875,2021-12-03T15:00:00Z
,_result,0,HUM,SAP01,65.26481119791667,2021-12-03T18:00:00Z
,_result,0,HUM,SAP01,77.614501953125,2021-12-03T21:00:00Z
,_result,0,HUM,SAP01,87.94051106770833,2021-12-04T00:00:00Z
,_result,0,HUM,SAP01,97.99918619791667,2021-12-04T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-04T06:00:00Z
,_result,0,HUM,SAP01,99.87125651041667,2021-12-04T09:00:00Z
,_result,0,HUM,SAP01,92.520263671875,2021-12-04T12:00:00Z
,_result,0,HUM,SAP01,74.400146484375,2021-12-04T15:00:00Z
,_result,0,HUM,SAP01,75.23388671875,2021-12-04T18:00:00Z
,_result,0,HUM,SAP01,78.45157877604167,2021-12-04T21:00:00Z
,_result,0,HUM,SAP01,83.89949544270833,2021-12-05T00:00:00Z
,_result,0,HUM,SAP01,86.80113636363636,2021-12-05T03:00:00Z
,_result,0,HUM,SAP01,97.4482421875,2021-12-05T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-05T09:00:00Z
,_result,0,HUM,SAP01,100,2021-12-05T12:00:00Z
,_result,0,HUM,SAP01,99.92545572916667,2021-12-05T15:00:00Z
,_result,0,HUM,SAP01,100,2021-12-05T18:00:00Z
,_result,0,HUM,SAP01,99.74462890625,2021-12-05T21:00:00Z
,_result,0,HUM,SAP01,100,2021-12-06T00:00:00Z
,_result,0,HUM,SAP01,100,2021-12-06T03:00:00Z
,_result,0,HUM,SAP01,99.92529296875,2021-12-06T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-06T09:00:00Z
,_result,0,HUM,SAP01,91.4493075284091,2021-12-06T12:00:00Z
,_result,0,HUM,SAP01,72.97265625,2021-12-06T15:00:00Z
,_result,0,HUM,SAP01,69.265380859375,2021-12-06T18:00:00Z
,_result,0,HUM,SAP01,79.03922526041667,2021-12-06T21:00:00Z
,_result,0,HUM,SAP01,91.64388020833333,2021-12-07T00:00:00Z
,_result,0,HUM,SAP01,98.99886067708333,2021-12-07T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-07T06:00:00Z
,_result,0,HUM,SAP01,98.89461263020833,2021-12-07T09:00:00Z
,_result,0,HUM,SAP01,81.49055989583333,2021-12-07T12:00:00Z
,_result,0,HUM,SAP01,85.135986328125,2021-12-07T15:00:00Z
,_result,0,HUM,SAP01,76.005615234375,2021-12-07T18:00:00Z
,_result,0,HUM,SAP01,84.87166341145833,2021-12-07T21:00:00Z
,_result,0,HUM,SAP01,92.11669921875,2021-12-08T00:00:00Z
,_result,0,HUM,SAP01,99.78743489583333,2021-12-08T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-08T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-08T09:00:00Z
,_result,0,HUM,SAP01,100,2021-12-08T12:00:00Z
,_result,0,HUM,SAP01,91.77986653645833,2021-12-08T15:00:00Z
,_result,0,HUM,SAP01,78.51318359375,2021-12-08T18:00:00Z
,_result,0,HUM,SAP01,75.21142578125,2021-12-08T21:00:00Z
,_result,0,HUM,SAP01,72.04207356770833,2021-12-09T00:00:00Z
,_result,0,HUM,SAP01,88.48299153645833,2021-12-09T03:00:00Z
,_result,0,HUM,SAP01,96.95646158854167,2021-12-09T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-09T09:00:00Z
,_result,0,HUM,SAP01,100,2021-12-09T12:00:00Z
,_result,0,HUM,SAP01,100,2021-12-09T15:00:00Z
,_result,0,HUM,SAP01,100,2021-12-09T18:00:00Z
,_result,0,HUM,SAP01,99.98990885416667,2021-12-09T21:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T00:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T09:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T12:00:00Z
,_result,0,HUM,SAP01,100,2021-12-10T15:00:00Z
,_result,0,HUM,SAP01,97.14396158854167,2021-12-10T18:00:00Z
,_result,0,HUM,SAP01,99.755859375,2021-12-10T21:00:00Z
,_result,0,HUM,SAP01,100,2021-12-11T00:00:00Z
,_result,0,HUM,SAP01,100,2021-12-11T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-11T06:00:00Z
,_result,0,HUM,SAP01,99.65999348958333,2021-12-11T09:00:00Z
,_result,0,HUM,SAP01,91.76399739583333,2021-12-11T12:00:00Z
,_result,0,HUM,SAP01,82.371826171875,2021-12-11T15:00:00Z
,_result,0,HUM,SAP01,89.459716796875,2021-12-11T18:00:00Z
,_result,0,HUM,SAP01,90.313232421875,2021-12-11T21:00:00Z
,_result,0,HUM,SAP01,93.30322265625,2021-12-12T00:00:00Z
,_result,0,HUM,SAP01,90.94099934895833,2021-12-12T03:00:00Z
,_result,0,HUM,SAP01,94.79964192708333,2021-12-12T06:00:00Z
,_result,0,HUM,SAP01,98.58650716145833,2021-12-12T09:00:00Z
,_result,0,HUM,SAP01,76.0224609375,2021-12-12T12:00:00Z
,_result,0,HUM,SAP01,70.41373697916667,2021-12-12T15:00:00Z
,_result,0,HUM,SAP01,75.58528645833333,2021-12-12T18:00:00Z
,_result,0,HUM,SAP01,87.47062174479167,2021-12-12T21:00:00Z
,_result,0,HUM,SAP01,95.053955078125,2021-12-13T00:00:00Z
,_result,0,HUM,SAP01,96.49332682291667,2021-12-13T03:00:00Z
,_result,0,HUM,SAP01,97.34285481770833,2021-12-13T06:00:00Z
,_result,0,HUM,SAP01,94.03743489583333,2021-12-13T09:00:00Z
,_result,0,HUM,SAP01,97.33620383522727,2021-12-13T12:00:00Z
,_result,0,HUM,SAP01,85.15076622596153,2021-12-13T15:00:00Z
,_result,0,HUM,SAP01,87.94200721153847,2021-12-13T18:00:00Z
,_result,0,HUM,SAP01,87.01985677083333,2021-12-13T21:00:00Z
,_result,0,HUM,SAP01,84.46022727272727,2021-12-14T00:00:00Z
,_result,0,HUM,SAP01,86.40608723958333,2021-12-14T03:00:00Z
,_result,0,HUM,SAP01,96.92757161458333,2021-12-14T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-14T09:00:00Z
,_result,0,HUM,SAP01,99.73307291666667,2021-12-14T12:00:00Z
,_result,0,HUM,SAP01,89.13688151041667,2021-12-14T15:00:00Z
,_result,0,HUM,SAP01,88.27591646634616,2021-12-14T18:00:00Z
,_result,0,HUM,SAP01,93.6826171875,2021-12-14T21:00:00Z
,_result,0,HUM,SAP01,100,2021-12-15T00:00:00Z
,_result,0,HUM,SAP01,99.97884114583333,2021-12-15T03:00:00Z
,_result,0,HUM,SAP01,99.97501627604167,2021-12-15T06:00:00Z
,_result,0,HUM,SAP01,100,2021-12-15T09:00:00Z
,_result,0,HUM,SAP01,98.3573467548077,2021-12-15T12:00:00Z
,_result,0,HUM,SAP01,92.369873046875,2021-12-15T15:00:00Z
,_result,0,HUM,SAP01,86.96988932291667,2021-12-15T18:00:00Z
,_result,0,HUM,SAP01,90.60701497395833,2021-12-15T21:00:00Z
,_result,0,HUM,SAP01,89.75423177083333,2021-12-16T00:00:00Z
,_result,0,HUM,SAP01,95.24405924479167,2021-12-16T03:00:00Z
,_result,0,HUM,SAP01,98.29972330729167,2021-12-16T06:00:00Z
,_result,0,HUM,SAP01,99.71321614583333,2021-12-16T09:00:00Z
,_result,0,HUM,SAP01,94.92024739583333,2021-12-16T12:00:00Z
,_result,0,HUM,SAP01,85.13028971354167,2021-12-16T15:00:00Z
,_result,0,HUM,SAP01,83.04874674479167,2021-12-16T18:00:00Z
,_result,0,HUM,SAP01,90.14493815104167,2021-12-16T21:00:00Z
,_result,0,HUM,SAP01,92.84554036458333,2021-12-17T00:00:00Z
,_result,0,HUM,SAP01,94.888916015625,2021-12-17T03:00:00Z
,_result,0,HUM,SAP01,100,2021-12-17T06:00:00Z
,_result,0,HUM,SAP01,99.65641276041667,2021-12-17T09:00:00Z
,_result,0,HUM,SAP01,87.91975911458333,2021-12-17T12:00:00Z
,_result,0,HUM,SAP01,81.4267578125,2021-12-17T15:00:00Z
,_result,0,HUM,SAP01,83.42431640625,2021-12-17T18:00:00Z
,_result,0,HUM,SAP01,92.165771484375,2021-12-17T21:00:00Z
,_result,0,HUM,SAP01,88.99951171875,2021-12-18T00:00:00Z
,_result,0,HUM,SAP01,100,2021-12-18T03:00:00Z
,_result,0,HUM,SAP01,90.70792643229167,2021-12-18T06:00:00Z
,_result,0,HUM,SAP01,94.503662109375,2021-12-18T09:00:00Z
,_result,0,HUM,SAP01,76.50056966145833,2021-12-18T12:00:00Z
,_result,0,HUM,SAP01,68.064453125,2021-12-18T15:00:00Z
,_result,0,HUM,SAP01,74.10986328125,2021-12-18T18:00:00Z
,_result,0,HUM,SAP01,89.11843039772727,2021-12-18T21:00:00Z
,_result,0,HUM,SAP01,91.34028764204545,2021-12-19T00:00:00Z
,_result,0,HUM,SAP01,96.28043619791667,2021-12-19T03:00:00Z
,_result,0,HUM,SAP01,95.825439453125,2021-12-19T06:00:00Z
,_result,0,HUM,SAP01,96.34659830729167,2021-12-19T09:00:00Z
,_result,0,HUM,SAP01,83.50520833333333,2021-12-19T12:00:00Z
,_result,0,HUM,SAP01,70.1396484375,2021-12-19T15:00:00Z
,_result,0,HUM,SAP01,71.82666015625,2021-12-19T18:00:00Z
,_result,0,HUM,SAP01,79.28629557291667,2021-12-19T21:00:00Z
,_result,0,HUM,SAP01,81.93953450520833,2021-12-20T00:00:00Z
,_result,0,HUM,SAP01,92.961669921875,2021-12-20T03:00:00Z
,_result,0,HUM,SAP01,95.14339192708333,2021-12-20T06:00:00Z
,_result,0,HUM,SAP01,94.93829900568181,2021-12-20T09:00:00Z
,_result,0,HUM,SAP01,78.36876502403847,2021-12-20T12:00:00Z
,_result,0,HUM,SAP01,73.41455078125,2021-12-20T15:00:00Z
,_result,0,HUM,SAP01,76.05257161458333,2021-12-20T18:00:00Z
,_result,0,HUM,SAP01,84.822998046875,2021-12-20T21:00:00Z
,_result,0,HUM,SAP01,79.14168294270833,2021-12-21T00:00:00Z
,_result,0,HUM,SAP01,86.503662109375,2021-12-21T03:00:00Z
,_result,0,HUM,SAP01,92.09749348958333,2021-12-21T06:00:00Z
,_result,0,HUM,SAP01,93.42032877604167,2021-12-21T09:00:00Z
,_result,0,HUM,SAP01,80.603515625,2021-12-21T12:00:00Z
,_result,0,HUM,SAP01,68.27303059895833,2021-12-21T15:00:00Z
,_result,0,HUM,SAP01,63.658772786458336,2021-12-21T18:00:00Z
,_result,0,HUM,SAP01,64.82405598958333,2021-12-21T21:00:00Z
,_result,0,HUM,SAP01,75.2275390625,2021-12-22T00:00:00Z
,_result,0,HUM,SAP01,78.05029296875,2021-12-22T03:00:00Z
,_result,0,HUM,SAP01,81.39217122395833,2021-12-22T06:00:00Z
,_result,0,HUM,SAP01,80.153564453125,2021-12-22T09:00:00Z
,_result,0,HUM,SAP01,60.95703125,2021-12-22T11:15:31.236992505Z
```
