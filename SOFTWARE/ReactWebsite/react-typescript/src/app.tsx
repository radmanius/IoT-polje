import "./app.scss";
import "react-toastify/dist/reactToastify.css";
import "rsuite/dist/rsuite.min.css";
import { Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import PathsAndElementsLoggedIn from "utils/pathsAndElementsLoggedIn";
import NotFound from "container/notFound/notFound";
import AppHeader from "container/appHeader/appHeader";
import { useKeycloak } from "@react-keycloak/web";
import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const ReactTypescriptWrapperLoggedInLazy = React.lazy(
    () => import("./components/wrappers/reactTypescriptWrapperLoggedIn")
);

const App = () => {
    const { keycloak } = useKeycloak();

    if (!keycloak.refreshToken && !keycloak.token) {
        return <></>;
    }

    return (
        <div className="app">
            <AppHeader />
            <Routes>
                <Route
                    path={PAGE_ROUTES.Global}
                    element={
                        <React.Suspense
                            fallback={<LazyLoadingFallbackComponent />}
                            children={<ReactTypescriptWrapperLoggedInLazy />}
                        />
                    }
                >
                    {PathsAndElementsLoggedIn.map((route, index) => (
                        <Route
                            path={route.path}
                            key={index}
                            element={
                                <React.Suspense
                                    fallback={<LazyLoadingFallbackComponent />}
                                    children={route.element}
                                />
                            }
                        />
                    ))}
                </Route>
                <Route
                    path="*"
                    element={<NotFound />}
                />
            </Routes>
            {/* <AppFooter /> */}
        </div>
    );
};

export const LazyLoadingFallbackComponent = () => <div className="app-body-lazy"></div>;

export default App;
