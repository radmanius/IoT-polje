import "utils/language/languangeClient";
import "core-js/stable";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";
import "./index.scss";
import { Provider } from "react-redux"; // import the provider
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./app";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "keycloak";
import store from "redux/store/store";

const rootElement = document.getElementById("root");
render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            redirectUri: "http://localhost:8001/",
            pkceMethod: "S256",
            onLoad: "login-required",
        }}
    >
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ReactKeycloakProvider>,
    rootElement
);
