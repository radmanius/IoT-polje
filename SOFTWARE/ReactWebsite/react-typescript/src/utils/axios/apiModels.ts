import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export interface ReactTypescriptAxiosResponse<T = any, D = any> extends AxiosResponse<T, D> {
    config: ReactTypescriptAxiosRequestConfig<D>;
}

export interface ReactTypescriptxiosError<T = any, D = any> extends AxiosError<T, D> {
    config: ReactTypescriptAxiosRequestConfig<D>;
    response: ReactTypescriptAxiosResponse<T, D>;
}

export interface ReactTypescriptAxiosRequestConfig<D = any> extends AxiosRequestConfig<D> {
    successMessage?: string;
    errorMessage?: string;
    useBackendErrorMessage?: boolean;
}
