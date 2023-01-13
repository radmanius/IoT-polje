import Keycloak from "keycloak-js";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: "https://iotat.tel.fer.hr:58443/auth",
  realm: "spring",
  clientId: "mobile-keycloak",
});

export default keycloak;