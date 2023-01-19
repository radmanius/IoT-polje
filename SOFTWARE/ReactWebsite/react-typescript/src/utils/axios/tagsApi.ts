import axios from "axios";

export const getAllTags = async (token: string) => {
    const response = await axios.get("/tags2", {
        headers: {
            'Authorization': "Bearer " + token,
        }
    })
    return response.data as any; 
}