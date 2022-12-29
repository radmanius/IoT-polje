export interface IRequest{
    URI: string;
    method: "GET"|"POST";
    headers: IHeader;
    payload: string;
}

export interface IHeader {
    '{{accessToken}} {{token1}}': string
}