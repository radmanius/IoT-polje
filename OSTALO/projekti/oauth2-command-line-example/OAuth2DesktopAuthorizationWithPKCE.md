
```plantuml
@startuml
autonumber
hide footbox

participant "Resource Owner\n(user)" as RO
participant "Client\n(desktop app)" as UAM
participant "User Agent\n(browser)" as UAB
participant "Authorization Server\n(keycloak)" as AS
participant "Resource Server\n(rest server)" as RS


legend top left
App is using only Client ID. It is not using Client Secret.

For redirectURI is used http://localhost:xxxxx/ - desktop app need to listen HTTP on xxxxx (random port)
endlegend


RO -> UAM: start app
note over UAM
generate random secret (PKCE Code Verifier) - 43-128 characters
calculate hash of it (PKCE Code Callenge) - SHA256
generate URL for Authorization Server (Authorization Code Request):
  response_type=code
  PKCE Code Challenge: code_challenge=...hash
  code_challenge_method=S256
  ClientID: client_id=...
  Redirect URL: redirect_uri=http://localhost:xxxxx/
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

  group consent screen [if authorization server needs to ask for it]
    AS --> UAB: Consent page to login to this application
    UAB --> RO: Consent page to login to this application
    RO -> UAB: Consent confirmation
    UAB -> AS: Consent confirmation
  end

  group front channel
    note left AS
    Redirect URL:
      base URL (localhost)
      code=generated code
      state=...from request
    end note
    AS --> UAB: Authorization Code Response, Redirect URL (localhost)  
    UAB -> UAM: HTTP request to localhost with: Authorization Code Response
    UAM --> UAB: web page that the user is successfully authorized and can close browser
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
      Calculate hash and compare with PKCE Code Challenge
    end note
  AS --> UAM: Access Token, Refresh Token
  note right UAM
  check that state value is the same as in request
  save refresh token in secure storage
  save access token in memory
  end note
  end

UAM -> RS: GET resource data with Access Token
note over RS: validate\naccess token
RS --> UAM: Response with data
UAM --> RO: Show screen with data

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
  AS --> UAM: Access Token, Refresh Token
  note right UAM
  save refresh token in secure storage
  save access token in memory
end note
end
@enduml
```

## Poruke

### 3 browser -> keycloak

```HTTP
GET /auth/realms/spring/protocol/openid-connect/auth?redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&scope=openid%20profile&response_type=code&client_id=mobile-keycloak&code_challenge=eGJ_4NXVEF30etTFnQN4WItrwgavQTiWHWaXC26eseE&code_challenge_method=S256&response_mode=query HTTP/1.1[\r][\n]
Host: iotat.tel.fer.hr:58443[\r][\n]
...
[\r][\n]
```

### 4 browser <- keycloak

```HTTP
HTTP/1.1 200 OK[\r][\n]
Content-Type: text/html;charset=utf-8[\r][\n]
Content-Length: 3676[\r][\n]
...
[\r][\n]
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">[\n]" 
<html xmlns="http://www.w3.org/1999/xhtml" class="login-pf">[\n]" 
page for entering login and password
</html>[\n]" 
```

### 7 browser -> keycloak

Sending login credentials to server

```HTTP
POST /auth/realms/spring/login-actions/authenticate?session_code=GCsfCdBW3FqBHL1S3n2xDT5gI82Wp2XjPr5hz3Kx8kc&execution=042e325a-4d5a-44dc-a878-1c292f7a8a01&client_id=mobile-keycloak&tab_id=ykinAXfdsyg HTTP/1.1[\r][\n]
Content-Type: application/x-www-form-urlencoded[\r][\n]
Host: iotat.tel.fer.hr:58443[\r][\n]
Connection: keep-alive[\r][\n]
Cookie: AUTH_SESSION_ID=d011fbe2-55ed-47ec-a60e-c5bceae7a54d.4890d19e3622; AUTH_SESSION_ID_LEGACY=d011fbe2-55ed-47ec-a60e-c5bceae7a54d.4890d19e3622; KC_RESTART=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZjA2MTY5YS1lZDllLTQ4NTEtOGJhYi02NTVmYTlmN2Y0MjUifQ.eyJjaWQiOiJtb2JpbGUta2V5Y2xvYWsiLCJwdHkiOiJvcGVuaWQtY29ubmVjdCIsInJ1cmkiOiJmZXIudGVsLmlvdC5wb2xqZS5pb3Rwb2xqZTovb2F1dGgyQ2FsbGJhY2siLCJhY3QiOiJBVVRIRU5USUNBVEUiLCJub3RlcyI6eyJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiaXNzIjoiaHR0cHM6Ly9pb3RhdC50ZWwuZmVyLmhyOjU4NDQzL2F1dGgvcmVhbG1zL3NwcmluZyIsInJlc3BvbnNlX3R5cGUiOiJjb2RlIiwiY29kZV9jaGFsbGVuZ2VfbWV0aG9kIjoiUzI1NiIsInJlZGlyZWN0X3VyaSI6ImZlci50ZWwuaW90LnBvbGplLklvVFBvbGplOi9vYXV0aDJDYWxsYmFjayIsImNvZGVfY2hhbGxlbmdlIjoiZUdKXzROWFZFRjMwZXRURm5RTjRXSXRyd2dhdlFUaVdIV2FYQzI2ZXNlRSIsInJlc3BvbnNlX21vZGUiOiJxdWVyeSJ9fQ.RCIU9lMTsAjzsN9flAbdllIau1pNi80fqu9rFG7YF-Y[\r][\n]
...
[\r][\n]
username=someusername&password=somepassword&credentialId=
```

### 12 browser <- keycloak

Redirect response (Authorization code response)

```HTTP
HTTP/1.1 302 Found[\r][\n]
Location: http://localhost:8080/?session_state=d011fbe2-55ed-47ec-a60e-c5bceae7a54d&code=d0a77753-d2bd-4a4b-88b4-ce3d8f7a7604.d011fbe2-55ed-47ec-a60e-c5bceae7a54d.3e5ff0c8-21da-4b1e-bdf2-20a011df1f6b[\r][\n]
...
[\r][\n]
```

### 13 browser -> desktop app

HTTP request to redirectURI (desktop app that is listening).

```HTTP
GET /?session_state=d011fbe2-55ed-47ec-a60e-c5bceae7a54d&code=d0a77753-d2bd-4a4b-88b4-ce3d8f7a7604.d011fbe2-55ed-47ec-a60e-c5bceae7a54d.3e5ff0c8-21da-4b1e-bdf2-20a011df1f6b HTTP/1.1[\r][\n] 
Host: localhost:8080[\r][\n] 
...
[\r][\n]
```

### 14 browser <- desktop app

```HTTP
HTTP/1.1 200 OK[\r][\n]
Content-Type: text/html[\r][\n]
[\r][\n]
<html>[\n]
<body>[\n]
<p>Sucessfull login! You can now close browser.</p>[\n]
<script>[\n]
      window.close();[\n]
</script>[\n]
</body>[\n]
</html>[\n]
```

### 15 desktop app -> keycloak

```HTTP
POST /auth/realms/spring/protocol/openid-connect/token HTTP/1.1[\r][\n]
Content-Type: application/x-www-form-urlencoded[\r][\n]
Host: iotat.tel.fer.hr:58443[\r][\n]
...
[\r][\n]
grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&code=d0a77753-d2bd-4a4b-88b4-ce3d8f7a7604.d011fbe2-55ed-47ec-a60e-c5bceae7a54d.3e5ff0c8-21da-4b1e-bdf2-20a011df1f6b&code_verifier=lc557ehHJ6x5rrzQkqskfitxMT1T5e8NPatx87tmIs5e0kzp0r&client_id=mobile-keycloak
```

### 16 desktop app <- keycloak

```http
HTTP/1.1 200 OK[\r][\n]
Server: nginx/1.21.0[\r][\n]
Content-Type: application/json[\r][\n]
...
[\r][\n]
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwLXRPRm0yYUVTQXoydTh3N084WE9RQ0psOFJBNlBwYWFVY3lfeFRaVWxZIn0.eyJleHAiOjE2NjY3NzI2NzgsImlhdCI6MTY2Njc3MjM3OCwiYXV0aF90aW1lIjoxNjY2NzcyMzc4LCJqdGkiOiJjZGFmM2FkNy0wY2FmLTRjMmEtYTc1My1hNmZkZDA5NTE2ZTQiLCJpc3MiOiJodHRwczovL2lvdGF0LnRlbC5mZXIuaHI6NTg0NDMvYXV0aC9yZWFsbXMvc3ByaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4NDM1N2M1LTcyYzktNGEzNi1iMTNmLWJiMGEyNjM4N2IzMCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1vYmlsZS1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiI2NjE1MzM4My05NTQyLTQzODctODcwOC1hNzlhYTk0N2UzNTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0MyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZmVyaXQiLCJmZXIiLCJkZWZhdWx0LXJvbGVzLXNwcmluZyIsImlvdC1yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjY2MTUzMzgzLTk1NDItNDM4Ny04NzA4LWE3OWFhOTQ3ZTM1NSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.MiVwzDZfznw9uSPklp8RIzwbPCt3-YtfHESgaBY7XbUklGT20uVdjhCzh0nucMxnUcu9g3vKLLihoTNLb7ss5zJvQwtHp34KihkbzOu7pGoW6jYF8ppxJyKllGH-LtXYCmnkAv1JenFz4bROPvx8dGx4hGdJ15Nx7y29hblpY1HoE-5DkIcjEKff0nn9oeUFSKTQgjIag24ULTMG7lPDd82HcxRPI_alL1l7RzKxfPtRyw6uJrpbeAAZQ2V3Jg3nju8BCPTJcw3WCt_KvmG1_ZbDCtVy-TY14F6uEDO7LDC_-wXTXp8L-vTa876raJPxJNTagbSZnQ3QMo2xTDM4Rw",
"expires_in":300,
"refresh_expires_in":1800,
"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZjA2MTY5YS1lZDllLTQ4NTEtOGJhYi02NTVmYTlmN2Y0MjUifQ.eyJleHAiOjE2NjY3NzQxNzgsImlhdCI6MTY2Njc3MjM3OCwianRpIjoiOTE2NjA3NjItYTQwYy00YzIwLWJiODctYTU3ODkxMDFlMzk0IiwiaXNzIjoiaHR0cHM6Ly9pb3RhdC50ZWwuZmVyLmhyOjU4NDQzL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0My9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiIwODQzNTdjNS03MmM5LTRhMzYtYjEzZi1iYjBhMjYzODdiMzAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibW9iaWxlLWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6IjY2MTUzMzgzLTk1NDItNDM4Ny04NzA4LWE3OWFhOTQ3ZTM1NSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiI2NjE1MzM4My05NTQyLTQzODctODcwOC1hNzlhYTk0N2UzNTUifQ.Ui1wAJcnWBZmjIHAxFjgzO3HhZQ0XLxDkgQ1ecxQOIE",
"token_type":"Bearer",
"id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwLXRPRm0yYUVTQXoydTh3N084WE9RQ0psOFJBNlBwYWFVY3lfeFRaVWxZIn0.eyJleHAiOjE2NjY3NzI2NzgsImlhdCI6MTY2Njc3MjM3OCwiYXV0aF90aW1lIjoxNjY2NzcyMzc4LCJqdGkiOiI1MmIyYmZjYy0wNTM2LTQ5ZWUtODMwZC0xODIwMmQ3ZjJjNTAiLCJpc3MiOiJodHRwczovL2lvdGF0LnRlbC5mZXIuaHI6NTg0NDMvYXV0aC9yZWFsbXMvc3ByaW5nIiwiYXVkIjoibW9iaWxlLWtleWNsb2FrIiwic3ViIjoiMDg0MzU3YzUtNzJjOS00YTM2LWIxM2YtYmIwYTI2Mzg3YjMwIiwidHlwIjoiSUQiLCJhenAiOiJtb2JpbGUta2V5Y2xvYWsiLCJzZXNzaW9uX3N0YXRlIjoiNjYxNTMzODMtOTU0Mi00Mzg3LTg3MDgtYTc5YWE5NDdlMzU1IiwiYXRfaGFzaCI6ImVIc2tJSTVOSXdGNExWd084akZVM3ciLCJhY3IiOiIxIiwic2lkIjoiNjYxNTMzODMtOTU0Mi00Mzg3LTg3MDgtYTc5YWE5NDdlMzU1IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InUxIn0.Kbjmqc6_5Hg2bElpGJ0AgGLgbV8tV6uciV9Vn4BEp3-fsgkP1BlLqsZOAI50tQeiwDPoZlvVN58lOUMh86aWc-HMmgG15tX3wGT1uH7jwtAMZ02gRxo5R_p3LL6DAytdtbA0dxw6hOWmQFLC6CNH3-gQDan8vFcjWnNF6dGa9orN-ARwU2eC6TZqYMF2oN7yF6jxCLEv_WaIZkm5VQ4FMpakA8G4PYYFLrL7Gw_M3Li99-hb3djMtf-9BEiAcP5i15GvskFRCQ9Mj89BRXI6vA5AbUrWmZbBT41iTY07s7vzrHZC7z_Sq_2ii_ryA4zvzG2JKN17K1eimZZMB4ig9A",
"not-before-policy":0,"session_state":"66153383-9542-4387-8708-a79aa947e355",
"scope":"openid profile email"}" 
```

### 17 desktop app -> rest server

```http
GET /rest/keys HTTP/1.1[\r][\n]" 
Authorization: bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwLXRPRm0yYUVTQXoydTh3N084WE9RQ0psOFJBNlBwYWFVY3lfeFRaVWxZIn0.eyJleHAiOjE2NjY3NzI2NzgsImlhdCI6MTY2Njc3MjM3OCwiYXV0aF90aW1lIjoxNjY2NzcyMzc4LCJqdGkiOiJjZGFmM2FkNy0wY2FmLTRjMmEtYTc1My1hNmZkZDA5NTE2ZTQiLCJpc3MiOiJodHRwczovL2lvdGF0LnRlbC5mZXIuaHI6NTg0NDMvYXV0aC9yZWFsbXMvc3ByaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4NDM1N2M1LTcyYzktNGEzNi1iMTNmLWJiMGEyNjM4N2IzMCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1vYmlsZS1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiI2NjE1MzM4My05NTQyLTQzODctODcwOC1hNzlhYTk0N2UzNTUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0MyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZmVyaXQiLCJmZXIiLCJkZWZhdWx0LXJvbGVzLXNwcmluZyIsImlvdC1yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6IjY2MTUzMzgzLTk1NDItNDM4Ny04NzA4LWE3OWFhOTQ3ZTM1NSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.MiVwzDZfznw9uSPklp8RIzwbPCt3-YtfHESgaBY7XbUklGT20uVdjhCzh0nucMxnUcu9g3vKLLihoTNLb7ss5zJvQwtHp34KihkbzOu7pGoW6jYF8ppxJyKllGH-LtXYCmnkAv1JenFz4bROPvx8dGx4hGdJ15Nx7y29hblpY1HoE-5DkIcjEKff0nn9oeUFSKTQgjIag24ULTMG7lPDd82HcxRPI_alL1l7RzKxfPtRyw6uJrpbeAAZQ2V3Jg3nju8BCPTJcw3WCt_KvmG1_ZbDCtVy-TY14F6uEDO7LDC_-wXTXp8L-vTa876raJPxJNTagbSZnQ3QMo2xTDM4Rw[\r][\n]" 
Accept-Encoding: gzip, x-gzip, deflate[\r][\n]" 
Host: iotat.tel.fer.hr:58443[\r][\n]" 
Connection: keep-alive[\r][\n]" 
User-Agent: Apache-HttpClient/5.1.3 (Java/17.0.2)[\r][\n]" 
[\r][\n]" 
```

### 18 desktop app <- rest server

```http
HTTP/1.1 200 [\r][\n]
Content-Type: application/json[\r][\n]
...
[\r][\n]
73[\r][\n]
[{"token1":"bzdHTbpCFmoByUgkC-l-m_8Lv2ohNadNwwPmV78ZfDMaENUcb-HKOEVLbv8QYt1hH-AWTUBwKu2gjJKlHqvGUQ==",
"token2":""}][\r][\n] 
```

### 20 desktop app -> keycloak

```http
POST /auth/realms/spring/protocol/openid-connect/token HTTP/1.1[\r][\n]
Content-Type: application/x-www-form-urlencoded[\r][\n]
Host: iotat.tel.fer.hr:58443[\r][\n]
...
[\r][\n]
grant_type=refresh_token&client_id=mobile-keycloak&refresh_token=eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZjA2MTY5YS1lZDllLTQ4NTEtOGJhYi02NTVmYTlmN2Y0MjUifQ.eyJleHAiOjE2NjY3ODQ3MjgsImlhdCI6MTY2Njc4MjkyOCwianRpIjoiOTFhMDRiYWEtMmI1MC00YWFiLTg3N2EtYTcyNDhlZGU0NGQ0IiwiaXNzIjoiaHR0cHM6Ly9pb3RhdC50ZWwuZmVyLmhyOjU4NDQzL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0My9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiIwODQzNTdjNS03MmM5LTRhMzYtYjEzZi1iYjBhMjYzODdiMzAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibW9iaWxlLWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6ImI0YjA2OTc4LTU1YmItNGU3My05MGJkLTNlYmM5ZDMzM2Y5YyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJiNGIwNjk3OC01NWJiLTRlNzMtOTBiZC0zZWJjOWQzMzNmOWMifQ.EGzBSF3IEGeaqP7z8QeYwSoYz0XPLZtNMX6LSkNMC9Y
```

### 21 desktop app <- keycloak

```http
HTTP/1.1 200 OK[\r][\n]
Content-Type: application/json[\r][\n]
...
[\r][\n]
{"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwLXRPRm0yYUVTQXoydTh3N084WE9RQ0psOFJBNlBwYWFVY3lfeFRaVWxZIn0.eyJleHAiOjE2NjY3ODMwNTMsImlhdCI6MTY2Njc4Mjk5MywiYXV0aF90aW1lIjoxNjY2Nzc4Njc3LCJqdGkiOiI0MDRiZDk2Ni0yN2Q4LTQ3NmUtODA5Mi1jN2YzMDM0NzI5NTgiLCJpc3MiOiJodHRwczovL2lvdGF0LnRlbC5mZXIuaHI6NTg0NDMvYXV0aC9yZWFsbXMvc3ByaW5nIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjA4NDM1N2M1LTcyYzktNGEzNi1iMTNmLWJiMGEyNjM4N2IzMCIsInR5cCI6IkJlYXJlciIsImF6cCI6Im1vYmlsZS1rZXljbG9hayIsInNlc3Npb25fc3RhdGUiOiJiNGIwNjk3OC01NWJiLTRlNzMtOTBiZC0zZWJjOWQzMzNmOWMiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0MyJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZmVyaXQiLCJmZXIiLCJkZWZhdWx0LXJvbGVzLXNwcmluZyIsImlvdC1yZWFkIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImI0YjA2OTc4LTU1YmItNGU3My05MGJkLTNlYmM5ZDMzM2Y5YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1MSJ9.fXHhlQjypaHgxZmcJEwjQ-VqjQs8IkfhoGUdxdRheDplRIegUSLr9GrYU63aLKpoOF_q2MX0Ob66eGbLnKz0yeWdUwsqrNJ7lEsI4yEy0cfS_JN6F4I7yEa2EQY8YpGbQPOqGlvJmL-lo92rkal-Hel2drPDVAMKml49cB2I2YUa2hTKfEuMcFqAav7AgSAXUhmMDIWgz3LRydScdrRYhHOkaXMz59bchnxd7RzxXV1kHMoRiyk5u9dli8LELQyBxuia7ZXMGWrzmqCGUQu41qBGs7TGv_dHl0A5KNSBGH84XIw6k5nsQKwQGpz8fUG0VBPSss0y1-CynL7wVI9GYQ",
"expires_in":60,
"refresh_expires_in":1800,
"refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlZjA2MTY5YS1lZDllLTQ4NTEtOGJhYi02NTVmYTlmN2Y0MjUifQ.eyJleHAiOjE2NjY3ODQ3OTMsImlhdCI6MTY2Njc4Mjk5MywianRpIjoiYmVjYzliZTgtODAzMS00YWZhLTllYjktOTNmZTJkYTZlNDdjIiwiaXNzIjoiaHR0cHM6Ly9pb3RhdC50ZWwuZmVyLmhyOjU4NDQzL2F1dGgvcmVhbG1zL3NwcmluZyIsImF1ZCI6Imh0dHBzOi8vaW90YXQudGVsLmZlci5ocjo1ODQ0My9hdXRoL3JlYWxtcy9zcHJpbmciLCJzdWIiOiIwODQzNTdjNS03MmM5LTRhMzYtYjEzZi1iYjBhMjYzODdiMzAiLCJ0eXAiOiJSZWZyZXNoIiwiYXpwIjoibW9iaWxlLWtleWNsb2FrIiwic2Vzc2lvbl9zdGF0ZSI6ImI0YjA2OTc4LTU1YmItNGU3My05MGJkLTNlYmM5ZDMzM2Y5YyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWQiOiJiNGIwNjk3OC01NWJiLTRlNzMtOTBiZC0zZWJjOWQzMzNmOWMifQ.5bLmPku7o5UCIub3OV4oPhUt76QRYvwjyAqgrLLW9pc","token_type":"Bearer","id_token":"eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwLXRPRm0yYUVTQXoydTh3N084WE9RQ0psOFJBNlBwYWFVY3lfeFRaVWxZIn0.eyJleHAiOjE2NjY3ODMwNTMsImlhdCI6MTY2Njc4Mjk5MywiYXV0aF90aW1lIjoxNjY2Nzc4Njc3LCJqdGkiOiI3OTAwODI5Ny0xMTBjLTQxYzAtODUyMi1mYmZlMTkzYjRjYjUiLCJpc3MiOiJodHRwczovL2lvdGF0LnRlbC5mZXIuaHI6NTg0NDMvYXV0aC9yZWFsbXMvc3ByaW5nIiwiYXVkIjoibW9iaWxlLWtleWNsb2FrIiwic3ViIjoiMDg0MzU3YzUtNzJjOS00YTM2LWIxM2YtYmIwYTI2Mzg3YjMwIiwidHlwIjoiSUQiLCJhenAiOiJtb2JpbGUta2V5Y2xvYWsiLCJzZXNzaW9uX3N0YXRlIjoiYjRiMDY5NzgtNTViYi00ZTczLTkwYmQtM2ViYzlkMzMzZjljIiwiYXRfaGFzaCI6IlR6Nl9yLW9ZQWhZQnhRMUU2Qk9jV3ciLCJhY3IiOiIwIiwic2lkIjoiYjRiMDY5NzgtNTViYi00ZTczLTkwYmQtM2ViYzlkMzMzZjljIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InUxIn0.FOJh2F5suoXOrhVV-ZVjXPbz7WL0bJ-t7x26j3Aj0VDu4rmq3Nw6vAhscLlLCRJ-X0xLzv7J_ctAFywzSeLpub6-R1qMtlNfXTp8jfpgSButu8HCBal2xxRk6sA0ge0SCpSHMzEGpxOq3udaXCtZwMS3sPy64H4Wpjm4wpJELcn2hoTcUEwr5D_g8tvgeAz0DRdHlxHbVCvvVnP5azeBKuJh0lJFVYB8Hxse6_Ga1nwSmtOfo1OXFieSTFmHoYMH_z1DmlPTzf1BaR2nv-l3I_Dc4TkUbJmYirM3ye641Yb8yUc4Tj6NvWVlk4tuO8AOK5TW1o9cz_mQ8HC2vrET7Q",
"not-before-policy":0,
"session_state":"b4b06978-55bb-4e73-90bd-3ebc9d333f9c",
"scope":"openid profile email"}
```
