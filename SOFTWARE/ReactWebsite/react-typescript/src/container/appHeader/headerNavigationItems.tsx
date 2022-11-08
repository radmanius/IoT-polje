import { PAGE_ROUTES } from "utils/paths";

export interface ISimpleHeaderItems {
    link: string;
    label: string;
}

export const getHeaderItems = (): ISimpleHeaderItems[] => {
    return [
        {
            label: "POČETNA STRANICA",
            link: PAGE_ROUTES.Global,
        },
        {
            label: "KRATKE SCENE",
            link: PAGE_ROUTES.ShortSceneView,
        },
        {
            label: "SCENE",
            link: PAGE_ROUTES.SceneView,
        },
    ];
};
