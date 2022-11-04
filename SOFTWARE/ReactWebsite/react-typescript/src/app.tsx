import "./app.scss";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";
import ReactTypescriptMainLoader from "container/reactTypescriptMainLoader/reactTypescriptMainLoader";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import AppFooter from "container/appFooter/appFooter";
import ReactTypescriptModalContainer from "container/reactTypescriptModalContainer/reactTypescriptModalContainer";
import { displayLoaderSelector } from "redux/selectors/reactTypescriptSelectors";
import PathsAndElementsLoggedIn from "utils/pathsAndElementsLoggedIn";
import PathsAndElementsNonLoggedIn from "utils/pathsAndElementsNonLoggedIn";
import NotFound from "container/notFound/notFound";

const ReactTypescriptWrapperLoggedInLazy = React.lazy(
    () => import("./components/wrappers/reactTypescriptWrapperLoggedIn")
);
const ReactTypescriptWrapperNonLoggedInLazy = React.lazy(
    () => import("./components/wrappers/reactTypescriptWrapperNonLoggedIn")
);

const App = () => {
    return (
        <div className="app">
            <ReactTypescriptMainLoader displayLoaderSelector={displayLoaderSelector} />
            <ReactTypescriptModalContainer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                className={"react-typescript__toast"}
            />
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
                    {PathsAndElementsLoggedIn.map(route => (
                        <Route
                            path={route.path}
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
                    path={PAGE_ROUTES.Global}
                    element={
                        <React.Suspense
                            fallback={<LazyLoadingFallbackComponent />}
                            children={<ReactTypescriptWrapperNonLoggedInLazy />}
                        />
                    }
                >
                    {PathsAndElementsNonLoggedIn.map(route => (
                        <Route
                            path={route.path}
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
            <AppFooter />
        </div>
    );
};

export const LazyLoadingFallbackComponent = () => <div className="app-body-lazy"></div>;

export default App;
