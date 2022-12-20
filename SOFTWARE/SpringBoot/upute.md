# Upute za podizanje rest-servera i mongodb baze


## 1. Pokrenuti mongodb 

Pozicionirati se u ...\SOFTWARE\rest-server

Upisati naredbu: 
```sh
docker docker-compose-mongodb.yml up
```
Kada se naredba izvrši, otići na 
```
http://localhost:8081/
``` 
i prijaviti se sa username: "**admin**", password: "**pass**".
Kliknuti veliki zeleni gumb *Create database* i bazu nazvati **exampleDB**

## 2. Modifikacije na rest-serveru za uspješno pokretanje
Potrebno je biti u **dev** profilu za automatsko generiranje testnih primjera u bazu naredbom u *application.properties*
```
spring.profiles.active=dev
```
koja je inicijalno dodana.

#### Bez key-cloak tokena nemoguće je pristupati rutama!
dostupne rute nalaze se u dokumentu **swagger.yml**

## 3. Pokrenuti key-cloak
slijediti upute napisane u dokumentu **instal.md** i pokrenuti rest-server naredbom

```java
./gradlew bootRun
```

napomena: za uspješno izvršavanje potrebno je u keycloak pod clients\Rest-keycloak dodati role **fer** i **ferit**. Preporuča se izrada korisnika koji imaju navedene role.
