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
            label: "SCENE",
            link: PAGE_ROUTES.ShortSceneView,
        },
        {
            label: "KLJUČEVI",
            link: PAGE_ROUTES.KeysView,
        },
    ];
};
