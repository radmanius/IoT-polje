import LandingPage from "container/landingPage/landingPage";
import ReactTypescriptExampleContainer from "container/reactTypescriptContainer/reactTypescriptExampleContainer/reactTypescriptExampleContainer";
import SceneForm from "container/sceneForm/sceneForm";
import ShortSceneView from "container/shortSceneView/shortSceneView";
import SceneEditForm from "container/sceneEditForm/sceneEditForm";
import SpecificSceneView from "container/specificSceneView/specificSceneView";
import { PAGE_ROUTES, PATHS } from "./paths";
import KeysView from "container/keysView/keysView";
import KeyForm from "container/keyForm/keyForm";
import KeyEditForm from "container/keyEditForm/keyEditForm";
import ActuationViewForm from "container/actuationViewForm/actuationViewForm";
import MeasurementViewForm from "container/measurementViewForm/measurementViewForm";
import ActuationViewEditForm from "container/actuationViewEditForm/actuationViewEditForm";
import MeasurementViewEditForm from "container/measurementViewEditForm/measurementViewEditForm";

const PathsAndElementsLoggedIn = [
    { path: PAGE_ROUTES.Global, element: <LandingPage /> },
    { path: PAGE_ROUTES.SpecificSceneView, element: <SpecificSceneView /> },
    { path: PAGE_ROUTES.ShortSceneView, element: <ShortSceneView /> },
    { path: PAGE_ROUTES.AddNewScene, element: <SceneForm /> },
    { path: PAGE_ROUTES.EditScene, element: <SceneEditForm /> },
    { path: PATHS.Global.ReactTypescriptExample, element: <ReactTypescriptExampleContainer /> },
    { path: PAGE_ROUTES.KeysView, element: <KeysView /> },
    { path: PAGE_ROUTES.AddNewKey, element: <KeyForm /> },
    { path: PAGE_ROUTES.EditKey, element: <KeyEditForm /> },
    { path: PAGE_ROUTES.AddActuationView, element: <ActuationViewForm /> },
    { path: PAGE_ROUTES.AddMeasurementView, element: <MeasurementViewForm /> },
    { path: PAGE_ROUTES.EditActuationView, element: <ActuationViewEditForm /> },
    { path: PAGE_ROUTES.EditMeasurementView, element: <MeasurementViewEditForm /> },
];

export default PathsAndElementsLoggedIn;
