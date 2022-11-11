import axios from "axios";
import { toast } from "react-toastify";
import { devConsoleError, devConsoleLog } from "utils/helperFunctions";
import { ReactTypescriptxiosError, ReactTypescriptAxiosResponse } from "utils/axios/apiModels";

if (location.hostname == "localhost") {
    var port = 8080; // Depends on backend port

    axios.defaults.baseURL = "http://" + location.hostname + ":" + port;
} else {
    axios.defaults.baseURL = "production url";
}

// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        devConsoleLog(`REQUEST : ${config.url}\n\nJSON : ${JSON.stringify(config)}`);

        return config;
    },
    function (error) {
        // Do something with request error
        devConsoleLog(`API request error : ${JSON.stringify(error)}`);

        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response: ReactTypescriptAxiosResponse) {
        devConsoleLog(
            `RESPONSE : ${response.config.url} - Status : ${response.status} \n\nJSON : ${JSON.stringify(response)}`
        );
        if (response.config.successMessage != undefined) {
            toast.success(response.config.successMessage);
        }

        return response;
    },
    function (error: ReactTypescriptxiosError) {
        // Do something with response error
        if (error.response) {
            if (error.response.config.useBackendErrorMessage) {
                toast.error(error.response?.data.Message);
            } else if (error.response.config.errorMessage != undefined) {
                toast.error(error.response.config.errorMessage);
            }
            devConsoleError(`API response error : ${JSON.stringify(error.response)}`);
        } else {
            if (error.config.errorMessage != undefined) {
                toast.error(error.config.errorMessage);
            }
            devConsoleError(`API response error : ${JSON.stringify(error)}`);
        }

        return Promise.reject({
            name: error.name,
            message: error.response?.data.Message,
            code: error.response?.status?.toString(),
            stack: error.stack,
        });
    }
);

export default axios;
