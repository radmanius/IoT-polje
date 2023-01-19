# Deployment

## Backend - SpringBoot
 - Inside `SpringBoot` run `./gradlew bootJar`
 - Build folder will be created which is used by local `DockerFile`

## Database - PostgresSQL
 - SpringBoot uses `projektR` database
 - user: `postgres`
 - password: `postgres`
 - uncommend volumes inside `docker-compose.yaml` if you want to persiste data in conatiners

## Frontend - React
Changes:
- Inside: `index.tsx`
 ```
  redirectUri: "https://iot-fer.duckdns.org" + prefix
```
- Inside: `apiClients.ts`
```
    axios.defaults.baseURL = "https://iot-fer.duckdns.org/ui/rest2"
```