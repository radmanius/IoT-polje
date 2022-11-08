import "./app.scss";
import "react-toastify/dist/reactToastify.css";
import "rsuite/dist/rsuite.min.css";
//import { ToastContainer } from "react-toastify";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import AppFooter from "container/appFooter/appFooter";
//import ReactTypescriptModalContainer from "container/reactTypescriptModalContainer/reactTypescriptModalContainer";
import PathsAndElementsLoggedIn from "utils/pathsAndElementsLoggedIn";
import PathsAndElementsNonLoggedIn from "utils/pathsAndElementsNonLoggedIn";
import NotFound from "container/notFound/notFound";
import AppHeader from "container/appHeader/appHeader";

const ReactTypescriptWrapperLoggedInLazy = React.lazy(
    () => import("./components/wrappers/reactTypescriptWrapperLoggedIn")
);
const ReactTypescriptWrapperNonLoggedInLazy = React.lazy(
    () => import("./components/wrappers/reactTypescriptWrapperNonLoggedIn")
);

const App = () => {
    return (
        <div className="app">
            <AppHeader />
            {/*
            <ReactTypescriptModalContainer />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                className={"react-typescript__toast"}
            />
            */}
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
                    path={PAGE_ROUTES.Global}
                    element={
                        <React.Suspense
                            fallback={<LazyLoadingFallbackComponent />}
                            children={<ReactTypescriptWrapperNonLoggedInLazy />}
                        />
                    }
                >
                    {PathsAndElementsNonLoggedIn.map((route, index) => (
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
            <AppFooter />
        </div>
    );
};

export const LazyLoadingFallbackComponent = () => <div className="app-body-lazy"></div>;

export default App;
