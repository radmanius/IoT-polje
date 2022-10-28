import "utils/language/languangeClient";
import "core-js/stable";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "regenerator-runtime/runtime";
import "./index.scss";
import { store } from "redux/store/store"; // import your store
import { Provider } from "react-redux"; // import the provider
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from "./app";

const rootElement = document.getElementById("root");
render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement
);
