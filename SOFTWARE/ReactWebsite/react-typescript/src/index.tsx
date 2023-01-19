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
import { ToastMessage } from "container/toastMessage/toastMessage";


const prefix = "/ui"

const rootElement = document.getElementById("root");
render(
    <ReactKeycloakProvider
        authClient={keycloak}
        initOptions={{
            redirectUri: "https://iot-fer.duckdns.org" + prefix,
            pkceMethod: "S256",
            onLoad: "login-required",
        }}
    >
        <Provider store={store}>
            <BrowserRouter basename={prefix}>
                <App />
            </BrowserRouter>
            <ToastMessage />
        </Provider>
    </ReactKeycloakProvider>,
    rootElement
);
