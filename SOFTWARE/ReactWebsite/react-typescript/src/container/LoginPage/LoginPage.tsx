//import { StringResources as Res, translate as t } from "utils/language/languageResource";
import Keycloak from "keycloak-js";

const LoginPage = () => {
    /*const [data1, setData1] = useState();
    const [adminPrivilages, setAdminPrivilages] = useState(false);
    const [data2, setData2] = useState();
    const [customerPrivilages, setCustomerPrivilages] = useState(false);
*/
    let initOptions = {
        url: "https://iotat.tel.fer.hr:58443/auth",
        realm: "spring",
        clientId: "mobile-keycloak",
    };

    const keycloak = new Keycloak(initOptions);

    keycloak
        .init({ onLoad: "login-required" })
        .then(auth => {
            console.log(auth);
            console.log(keycloak);
            if (!auth) {
                window.location.reload();
            } else {
                console.info("Authenticated");
            }
        })
        .catch(() => {
            console.log("greska");
        });
    /*
        .success((auth: any) => {
            if (!auth) {
                window.location.reload();
            } else {
                console.info("Authenticated");
            }

            localStorage.setItem("bearer-token", keycloak.token);
            localStorage.setItem("refresh-token", keycloak.refreshToken);
            console.log(keycloak.token);

            setTimeout(() => {
                keycloak
                    .updateToken(70)
                    .success((refreshed: any) => {
                        if (refreshed) {
                            console.debug("Token refreshed" + refreshed);
                        } else {
                            console.warn(
                                "Token not refreshed, valid for " +
                                    Math.round(
                                        keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000
                                    ) +
                                    " seconds"
                            );
                        }
                    })
                    .error(() => {
                        console.error("Failed to refresh token");
                    });
            }, 60000);
        })
        .error(() => {
            console.error("Authenticated Failed");
        });*/
    /*
    function LogOut() {
        const logout = () => {
            keycloak.logout();
        };

        return (
            <>
                <button onClick={logout}>Logout</button>
            </>
        );
    }

    ReactDOM.render(<LogOut />, document.getElementById("logoutBtn"));

    function CheckRoles() {
        const check = () => {
            $.ajax({
                type: "GET",
                url: "http://localhost:8080/check/admin",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("bearer-token"),
                },
                success: function (data1) {
                    setData1(data1);
                },
                error: function (error) {
                    setAdminPrivilages(true);
                },
            });

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/check/customer",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("bearer-token"),
                },
                success: function (data2) {
                    setData2(data2);
                },
                error: function (error) {
                    setCustomerPrivilages(true);
                },
            });
        };
*/
    return (
        <>
            <p>
                {" "}
                Check Admin privilages at <strong>/check/admin</strong> and check Customer privilages at{" "}
                <strong>/check/customer</strong>
            </p>
            {/*<button onClick={check}>Check</button>*/}
        </>
    );
};

export default LoginPage;
