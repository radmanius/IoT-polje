import axios from "axios";
import { IKey } from "models/keys";

export const getAllKeys = async (token: string) => {
    const response = await axios.get("/keys2", {
        headers: {
            'Authorization': "Bearer " + token,
        }
    })
    return response.data as IKey[]; 
}

export const addKey = async (key: IKey, token: string) => {
    const response = await axios.post("/keys2", key, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
    return response.data as any;
}

export const editKey = async (key: IKey, token: string) => {
    const response = await axios.put("/key2/" + key.name, key.value, {
        headers: {
            'Authorization': "Bearer " + token,
            "Content-Type": "text/plain"
        }
    });
    return response.data as any;
}

export const deleteKey = async (keyName: string, token: string) => {
    const response = await axios.delete("/key2/" + keyName, {
        headers: {
            'Authorization': "Bearer " + token,
        }
    });
    return response.data as any;
}