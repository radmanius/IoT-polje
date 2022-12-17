export interface IRequest{
    URI: string;
    method: "GET"|"POST";
    headers: any;
    payload: string;
}