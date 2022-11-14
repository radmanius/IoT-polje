import axios from "axios";
import { IScene, IbackendScene } from "models/scenes";

export const getAllScenes = async () => {
    const response = await axios.get("/scene")
    return response.data as IbackendScene[]; 
} 

export const createNewScene = async (scene: IScene) => {
    await axios.post("/scene", scene);
};

export const getSceneById = async (id: number) => {
    const response = await axios.get(`/scene/${id}`)
    return response.data as IScene; 
}

export const editScene = async (id: number) => {
    await axios.patch(`/scene/${id}`);
};

export const deleteScene = async (id: number) => {
    await axios.delete(`/scene/${id}`);
}