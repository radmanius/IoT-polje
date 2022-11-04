import React from "react";
import { PATHS } from "./paths";
const ReactTypescriptLoginWrapperLazy = React.lazy(
    () => import("../components/wrappers/reactTypescriptLoginWrapper/reactTypescriptLoginWrapper")
);

const PathsAndElementsNonLoggedIn = [
    {
        path: PATHS.Global.Login,
        element: <ReactTypescriptLoginWrapperLazy />,
    },
];

export default PathsAndElementsNonLoggedIn;
