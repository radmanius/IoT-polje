import axios from "axios";
import { IScene, IShortScene } from "models/scenes";

export const getAllScenes = async (token : string) => {
    const response = await axios.get("/scene2", {
        headers: {
            'Authorization': "Bearer " + token,
        }
    })
    return response.data as IShortScene[]; 
} 

export const createNewScene = async (scene: any) => {
    await axios.post("/scene", scene);
};

export const getSceneById = async (id: number) => {
    const response = await axios.get(`/scene/${id}`)
    return response.data as IScene; 
}

export const editScene = async (scene: any) => {
    const response = await axios.put("/scene/" + scene.id, scene);
    return response.data as IScene;
};

export const deleteScene = async (id: number) => {
    await axios.delete(`/scene/${id}`);
}