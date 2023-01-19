export const PAGE_ROUTES = {
    Global: "/",
    SpecificSceneView: "/specific-scene-view",
    ShortSceneView: "/short-scene",
    AddNewScene: "/scene-add",
    EditScene: "/scene-edit",
    KeysView: "/keys",
    AddNewKey: "/key-add",
    EditKey: "/key-edit",
    AddActuationView: "/actuation-view-add",
    AddMeasurementView: "/measurement-view-add",
    EditActuationView: "/actuation-view-edit",
    EditMeasurementView: "/measurement-view-edit",
};

export const PATHS = {
    Global: {
        Home: "/",
        ReactTypescriptExample: "react-typescript-example",
        Login: "login"
    },
};

export const CONTROLLER_ROUTES = {
    Auth: "auth"
};

export const ENDPOINTS = {
    Account: {
        Login: CONTROLLER_ROUTES.Auth + "/login"
    },
};
