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