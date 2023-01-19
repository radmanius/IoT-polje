export interface ReactTypescriptRequest {
    id: number;
}

export interface ReactTypescriptResponse {
    id: number;
    name?: string;
}

export interface LoadingActionModel {
    requestId: string;
    type: string;
    isLoaderIgnored: boolean;
}
