#!/bin/bash
#
# Run following commands
# docker cp init.sh rest-keycloak-fake-keycloak-1:/tmp/init.sh
# docker exec rest-keycloak-fake-keycloak-1 /bin/bash -c "source /tmp/init.sh"
#
export kauth="--no-config --server http://localhost:8080/auth --realm master --user user --password bitnami"
# create realm
kcadm.sh create realms -s realm=spring -s enabled=true -o $kauth
# create client
export uuid="$(cat /proc/sys/kernel/random/uuid)"
kcadm.sh create clients -r spring -s clientId=rest-keycloak -s secret=$uuid -s "redirectUris=[\"http://localhost:8080/*\"]" -s directAccessGrantsEnabled=true -s serviceAccountsEnabled=true -s authorizationServicesEnabled=true $kauth -i > /tmp/cid.txt
export cid="$(cat /tmp/cid.txt)"
# create roles
#   user roles
kcadm.sh create clients/$cid/roles -r spring -s name=iot-read $kauth
kcadm.sh create clients/$cid/roles -r spring -s name=iot-write $kauth
#   realm roles
kcadm.sh create roles -r spring -s name=app-user $kauth
kcadm.sh add-roles -r spring --rname app-user --cclientid rest-keycloak --rolename iot-read $kauth
kcadm.sh create roles -r spring -s name=app-maintainer $kauth
kcadm.sh add-roles -r spring --rname app-maintainer --cclientid rest-keycloak --rolename iot-write $kauth
kcadm.sh create roles -r spring -s name=app-admin $kauth
kcadm.sh add-roles -r spring --rname app-admin --cclientid rest-keycloak --rolename iot-read $kauth
kcadm.sh add-roles -r spring --rname app-admin --cclientid rest-keycloak --rolename iot-write $kauth
#
# create users
#   u1
kcadm.sh create users -r spring -s username=u1 -s enabled=true -s emailVerified=true $kauth
kcadm.sh set-password -r spring --username u1 --new-password u1 $kauth
kcadm.sh add-roles --uusername u1 --rolename app-user -r spring $kauth
#   u2
kcadm.sh create users -r spring -s username=u2 -s enabled=true -s emailVerified=true $kauth
kcadm.sh set-password -r spring --username u2 --new-password u2 $kauth
kcadm.sh add-roles --uusername u2 --rolename app-maintainer -r spring $kauth
#   u3
kcadm.sh create users -r spring -s username=u3 -s enabled=true -s emailVerified=true $kauth
kcadm.sh set-password -r spring --username u3 --new-password u3 $kauth
kcadm.sh add-roles --uusername u3 --rolename app-admin -r spring $kauth
#   u4
kcadm.sh create users -r spring -s username=u4 -s enabled=true -s emailVerified=true $kauth
kcadm.sh set-password -r spring --username u4 --new-password u4 $kauth
kcadm.sh add-roles --uusername u4 --rolename app-user -r spring $kauth
#
export secret=$(kcadm.sh get clients/$cid/client-secret -r spring $kauth | grep value | sed 's/^.*"value" : "\(.*\)"/\1/')
#
echo
echo application.properties:
echo
echo keycloak.realm=spring
echo keycloak.auth-server-url=http://localhost:8180/auth
echo keycloak.ssl-required=external
echo keycloak.resource=rest-keycloak
echo keycloak.credentials.secret=$secret
echo keycloak.use-resource-role-mappings=true
echo keycloak.bearer-only=true
