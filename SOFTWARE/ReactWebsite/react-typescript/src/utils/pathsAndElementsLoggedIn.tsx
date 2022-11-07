import LandingPage from "container/LandingPage/LanidingPage";
import ReactTypescriptExampleContainer from "container/reactTypescriptContainer/reactTypescriptExampleContainer/reactTypescriptExampleContainer";
import SceneView from "container/SceneView/SceneView";
import ShortSceneView from "container/ShortSceneView/ShortSceneView";
import SpecificSceneView from "container/SpecificSceneView/SpecificSceneView";
import { PAGE_ROUTES, PATHS } from "./paths";

const PathsAndElementsLoggedIn = [
    { path: PAGE_ROUTES.Global, element: <LandingPage /> },
    { path: PAGE_ROUTES.SceneView, element: <SceneView /> },
    { path: PAGE_ROUTES.SpecificSceneView, element: <SpecificSceneView /> },
    { path: PAGE_ROUTES.ShortSceneView, element: <ShortSceneView /> },
    { path: PATHS.Global.ReactTypescriptExample, element: <ReactTypescriptExampleContainer /> },
];

export default PathsAndElementsLoggedIn;
