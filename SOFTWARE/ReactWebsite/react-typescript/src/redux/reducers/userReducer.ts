import { Reducer } from "redux";
import { AuthentificationActionType, CLEAR_PASSWORD_RECOVERY_TOKEN, CLEAR_USER, SET_USER, SET_USER_LOCALE } from "redux/actions/autentificationActions";

 
import {  Locale, UserData } from "../models/userData";

const savedState: UserData | null =
    sessionStorage.getItem("user") !== null
        ? JSON.parse(sessionStorage.getItem("user") || "")
        : null;

const initialState: UserData = {
    userName: undefined,
    firstName: undefined,
    lastName: undefined,
    token: undefined,
    locale: Locale.en,
};

export const userReducer: Reducer<UserData> = (
    state: UserData = savedState || initialState,
    action: AuthentificationActionType
): UserData => {
    switch (action.type) {
        case SET_USER:
            return { ...action.user };
        case CLEAR_USER:
            return { ...initialState };
        case CLEAR_PASSWORD_RECOVERY_TOKEN:
            return { ...state, passwordRecoveryToken: undefined };
        case SET_USER_LOCALE:
            return { ...state, locale: action.locale };
        default:
            return state;
    }
};

export default userReducer;
