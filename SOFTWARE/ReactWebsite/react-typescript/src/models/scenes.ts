//import { IView } from "./viewsInterfaces/views";

import { IView } from "./viewsInterfaces/views";



export interface IShortScene{
    id: number;
    title: string;
    subtitle: string;
    tags?: IShortTag[];
    views?: IView[];
}

export interface IShortTag{
    name: string;
}

export interface IScene{
    id?: number;
    title: string;
    subtitle: string;
    pictureLink: string;
    layout: string;
    tags: any[];
    views: any[];
    roles: any[];
    keys: any[];
}

// export interface IScene{
//     id: number;
//     title: string;
//     subtitle: string;
//     pictureLink: string;
//     layout: "list"|"grid";
//     tags: string[];
//     views: IView[];
//     roles: string[];
//     keys: string[];
// }




export const initScenes = {
    id: -1,
    title: "",
    subtitle: "",
    pictureLink: "",
    layout: "",
    tags: [],
    views: [],
    roles: [],
    keys: []
};

export const sceneLayoutOptions: any[] = [
    {
        text: "LIST",
        value: "LIST",
    },
    {
        text: "GRID",
        value: "GRID",
    }
]