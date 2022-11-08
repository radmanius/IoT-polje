import { devConsoleLog } from "utils/helperFunctions";
import { RequestConfig } from "redux/services/servicesModels";

export const executeDownloadGetRequest = async (url: string, params?: any, requestConfig?: RequestConfig) => {
    // const config: ReactTypescriptAxiosRequestConfig = {
    //     params: params,
    //     headers: { Authorization: `Bearer {{token}}` },
    //     responseType: "blob",
    //     successMessage: requestConfig?.successMessage,
    //     errorMessage: requestConfig?.errorMessage,
    //     useBackendErrorMessage: requestConfig?.useBackendErrorMessage,
    // };
    // await apiClient.get(url, config).then(response => {
    //     let headerLine = response.headers["content-disposition"].replaceAll('"', "");
    //     let startFileNameIndex = headerLine.indexOf("filename=") + "filename=".length;
    //     let endFileNameIndex = headerLine.indexOf(";", startFileNameIndex);
    //     let filename = headerLine.substring(startFileNameIndex, endFileNameIndex);
    //     //@ts-ignore
    //     FileDownload(response.data, filename != "" ? filename : "report.xlsx");
    //     // FileDownload(response.data, "report.xlsx");
    // });
};

export const executeGetRequest = async (url: string, params?: any, requestConfig?: RequestConfig) => {
    // let config: ReactTypescriptAxiosRequestConfig = {
    //     params: params,
    //     successMessage: requestConfig?.successMessage,
    //     errorMessage: requestConfig?.errorMessage,
    //     useBackendErrorMessage: requestConfig?.useBackendErrorMessage,
    // };
    // config.headers = { Authorization: `Bearer {{token}}` };
    // const response = await apiClient.get(url, config);
    // return response;
};

export const executePostRequest = async (url: string, data?: any, requestConfig?: RequestConfig) => {
    // let config: ReactTypescriptAxiosRequestConfig = {
    //     successMessage: requestConfig?.successMessage,
    //     errorMessage: requestConfig?.errorMessage,
    //     useBackendErrorMessage: requestConfig?.useBackendErrorMessage,
    // };
    // config.headers = { Authorization: `Bearer {{token}}` };
    // const response = await apiClient.post(url, data, config);
    // return response;
};

export const executeDeleteRequest = async (url: string, data?: any, requestConfig?: RequestConfig) => {
    // let config: ReactTypescriptAxiosRequestConfig = {
    //     successMessage: requestConfig?.successMessage,
    //     errorMessage: requestConfig?.errorMessage,
    //     useBackendErrorMessage: requestConfig?.useBackendErrorMessage,
    //     data: data,
    // };
    // config.headers = { Authorization: `Bearer {{token}}` };
    // const response = await apiClient.delete(url, config);
    // return response;
};

export const executeRequestDirectly = async (request: Promise<any>) => {
    try {
        await request;
    } catch (e) {
        devConsoleLog(e);
    }
};
