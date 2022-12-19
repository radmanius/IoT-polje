import axios from "axios";

export const getAllKeys = async () => {
    const response = await axios.get("/keys")
    return response.data as any; 
}