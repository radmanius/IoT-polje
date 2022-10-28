import { Reducer } from "redux";
import { AuthentificationActionType, CLEAR_LOGIN_ERROR, REQUEST_LOGIN_ERROR, SENDING_LOGIN_REQUEST, SET_AUTH } from "redux/actions/autentificationActions";

export interface LoginState {
    error?: string;
    currentlySending: boolean;
    loggedIn: boolean;
}

let savedState = sessionStorage.getItem("loggedIn");

let initialState: LoginState = {
    currentlySending: false,
    loggedIn: savedState ? JSON.parse(savedState) : false,
};

export const loginReducer: Reducer<LoginState> = (
    state: LoginState = initialState,
    action: AuthentificationActionType
): LoginState => {
    switch (action.type) {
        case SET_AUTH:
            return { ...state, loggedIn: action.newAuthState };
        case SENDING_LOGIN_REQUEST:
            return { ...state, currentlySending: action.sending };
        case REQUEST_LOGIN_ERROR:
            return { ...state, error: action.error };
        case CLEAR_LOGIN_ERROR:
            return { ...state, error: undefined };
        default:
            return state;
    }
};