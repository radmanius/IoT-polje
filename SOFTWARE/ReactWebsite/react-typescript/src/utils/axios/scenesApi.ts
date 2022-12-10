import axios from "axios";
import { IScene, IShortScene } from "models/scenes";

export const getAllScenes = async () => {
    const response = await axios.get("/scene")
    return response.data as IShortScene[]; 
} 

export const createNewScene = async (scene: IShortScene) => {
    await axios.post("/scene", scene);
};

export const getSceneById = async (id: number) => {
    const response = await axios.get(`/scene/${id}`)
    return response.data as IScene; 
}

export const editScene = async (scene: IScene) => {
    await axios.put("/scene", scene);
};

export const deleteScene = async (id: number) => {
    await axios.delete(`/scene/${id}`);
}