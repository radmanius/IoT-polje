import axios, { AxiosResponse } from "axios";

export const login = async (username: string, password: string) => {
    const res = await axios.post("/users/authenticate", { username, password });
    const user = await handleResponse(res);
    if (user.token) {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("loggedIn", JSON.stringify(true));
    }
    return user;
};

const handleResponse = async (res: AxiosResponse) => {
    const data = res.data;
    if (res.status !== 200) {
        if (res.status === 401) logout();
        if (res.status === 403) return Promise.reject("403");
        const error = (data && data.message) || res.statusText;
        return Promise.reject(error);
    }
    return data || res.status === 200;
};

export const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.setItem("loggedIn", JSON.stringify(false));
    localStorage.setItem("language", "de");
};