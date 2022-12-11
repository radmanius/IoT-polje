import LandingPage from "container/landingPage/landingPage";
import ReactTypescriptExampleContainer from "container/reactTypescriptContainer/reactTypescriptExampleContainer/reactTypescriptExampleContainer";
import SceneForm from "container/sceneForm/sceneForm";
import ShortSceneView from "container/shortSceneView/shortSceneView";
import SceneEditForm from "container/sceneEditForm/sceneEditForm";
import SpecificSceneView from "container/specificSceneView/specificSceneView";
import { PAGE_ROUTES, PATHS } from "./paths";

const PathsAndElementsLoggedIn = [
    { path: PAGE_ROUTES.Global, element: <LandingPage /> },
    { path: PAGE_ROUTES.SpecificSceneView, element: <SpecificSceneView /> },
    { path: PAGE_ROUTES.ShortSceneView, element: <ShortSceneView /> },
    { path: PAGE_ROUTES.AddNewScene, element: <SceneForm /> },
    { path: PAGE_ROUTES.EditScene, element: <SceneEditForm /> },
    { path: PATHS.Global.ReactTypescriptExample, element: <ReactTypescriptExampleContainer /> },
];

export default PathsAndElementsLoggedIn;
