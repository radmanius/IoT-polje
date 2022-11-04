import LandingPage from "container/landingPage/lanidingPage";
import ReactTypescriptExampleContainer from "container/reactTypescriptContainer/reactTypescriptExampleContainer/reactTypescriptExampleContainer";
import SceneView from "container/sceneView/sceneView";
import ShortSceneView from "container/shortSceneView/shortSceneView";
import SpecificSceneView from "container/specificSceneView/SpecificSceneView";
import { PAGE_ROUTES, PATHS } from "./paths";

const PathsAndElementsLoggedIn = [
    { path: PAGE_ROUTES.Global, element: <LandingPage /> },
    { path: PAGE_ROUTES.SceneView, element: <SceneView /> },
    { path: PAGE_ROUTES.SpecificSceneView, element: <SpecificSceneView /> },
    { path: PAGE_ROUTES.ShortSceneView, element: <ShortSceneView /> },
    { path: PATHS.Global.ReactTypescriptExample, element: <ReactTypescriptExampleContainer /> },
];

export default PathsAndElementsLoggedIn;
