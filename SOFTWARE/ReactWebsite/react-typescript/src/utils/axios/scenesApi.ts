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

export const createNewScene = async (scene: any, token: string) => {
    await axios.post("/scene2", scene, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
};

export const getSceneById = async (id: number, token: string) => {
    const response = await axios.get(`/scene2/${id}`, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    })
    return response.data as IScene; 
}

export const editScene = async (scene: any, token: string) => {
    const response = await axios.put("/scene2/" + scene.id, scene, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
    return response.data as IScene;
};

export const deleteScene = async (id: number, token: string) => {
    await axios.delete(`/scene2/${id}`, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
}

export const testScene = async (scene: any, token: string) => {
    const response = await axios.post("/check/scene", scene, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
    return response;
};