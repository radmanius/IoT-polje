import axios from "axios";

export const getAllTags = async () => {
    const response = await axios.get("/tags")
    return response.data as any; 
}