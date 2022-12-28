import { useKeycloak } from "@react-keycloak/web";
import { useEffect } from "react";

const LoginPage = () => {
    const { keycloak } = useKeycloak();
    console.log(keycloak);

    useEffect(() => {}, []);
    return (
        <div>
            <div>{`User is ${!keycloak.authenticated ? "NOT " : ""} authenticated`}</div>

            {!keycloak.authenticated && (
                <button
                    type="button"
                    onClick={() => keycloak.login()}
                >
                    Login
                </button>
            )}
        </div>
    );

    /*const [data1, setData1] = useState();
    const [adminPrivilages, setAdminPrivilages] = useState(false);
    const [data2, setData2] = useState();
    const [customerPrivilages, setCustomerPrivilages] = useState(false);

    let initOptions = {
        url: "https://iotat.tel.fer.hr:58443/auth",
        realm: "spring",
        clientId: "react-mobile-client",
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
};

export default LoginPage;
