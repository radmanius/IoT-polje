import axios from "axios";
import { IKey } from "models/keys";

export const getAllKeys = async () => {
    const response = await axios.get("/keys")
    return response.data as IKey[]; 
}

export const addKey = async (key: IKey) => {
    const response = await axios.post("/keys", key);
    return response.data as any;
}

export const editKey = async (key: IKey) => {
    const response = await axios.put("/key/" + key.name, key.value);
    return response.data as any;
}

export const deleteKey = async (keyName: string) => {
    const response = await axios.delete("/key/" + keyName);
    return response.data as any;
}