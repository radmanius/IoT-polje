export interface IShortScene{
    id: number;
    title: string;
    subtitle: string;
    tags?: IShortTag[];
}

export interface IShortTag{
    name: string;
}

export interface IScene{
    id?: number;
    title: string;
    subtitle: string;
    pictureLink: string;
    layout: any;
    tags: any[];
    views: any[];
    roles: any[];
    keys: any[];
}

export interface ISceneLayout{
    id?: number;
    name: string;
}

export interface ITag{
    id?: number;
    name: string;
}

export interface IRole{
    id?: number;
    name: string;
}

export interface IKey{
    id?: number;
    name: string;
    value: unknown;
    canDelete: boolean;
}




export interface ISceneOld {
    sceneId?: number;
    pictureLink: string;
    sceneSubtitle: string;
    sceneTitle: string;
    layoutId?: number
}

export const initScene:ISceneOld = {
    sceneTitle: "",
    pictureLink: "",
    sceneSubtitle: "",
}

export const initScenes:ISceneOld[] = [
    { 
        sceneId: 1,
        sceneTitle: "Scena 1",
        sceneSubtitle: "podnaslov scene 1",
        pictureLink: "https://Scena_1_link_slike",
        layoutId: 23
    },
    { 
        sceneId: 2,
        sceneTitle: "Scena 2",
        sceneSubtitle: "podnaslov scene 1",
        pictureLink: "https://Scena_1_link_slike",
        layoutId: 22
    },
    { 
        sceneId: 3,
        sceneTitle: "Scena 3",
        sceneSubtitle: "podnaslov scene 1",
        pictureLink: "https://Scena_1_link_slike",
        layoutId: 12
    },
    { 
        sceneId: 4,
        sceneTitle: "Scena 4",
        sceneSubtitle: "podnaslov scene 1",
        pictureLink: "https://Scena_1_link_slike",
        layoutId: 112
    },
]