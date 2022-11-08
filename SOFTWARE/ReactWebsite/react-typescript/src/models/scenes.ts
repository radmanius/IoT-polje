export interface IScene {
    sceneId: number;
    pictureLink: string;
    sceneSubtitle: string;
    sceneTitle: string;
    layoutId: number
}

export const initScene:IScene = {
    sceneId: 1,
    sceneTitle: "Scena 1",
    pictureLink: "link za scenu",
    sceneSubtitle: "podnaslov scene 1",
    layoutId: 24
}

export const initScenes:IScene[] = [
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