import LandingPage from "container/LandingPage/LanidingPage";
import ReactTypescriptExampleContainer from "container/reactTypescriptContainer/reactTypescriptExampleContainer/reactTypescriptExampleContainer";
import SceneView from "container/SceneView/SceneView";
import { PAGE_ROUTES, PATHS } from "./paths";

const PathsAndElementsLoggedIn = [
    { path: PAGE_ROUTES.Global, element: <LandingPage /> },
    { path: PAGE_ROUTES.SceneView, element: <SceneView /> },
    { path: PATHS.Global.ReactTypescriptExample, element: <ReactTypescriptExampleContainer /> },
];

export default PathsAndElementsLoggedIn;
