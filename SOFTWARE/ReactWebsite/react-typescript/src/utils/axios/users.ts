import axios, { AxiosResponse } from "axios";

export const login = async (username: string, password: string) => {
    const res = await axios.post("/users/authenticate", { username, password });
    const userExists = await handleResponse(res);
    if (userExists) {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        sessionStorage.setItem("loggedIn", JSON.stringify(true));
        return res.data;
    } else {
        return null;
    }
};

const handleResponse = async (res: AxiosResponse) => {
    const data = res.data;
    if (data !== null) {
        return true;
    } else {
        return false;
    }
};