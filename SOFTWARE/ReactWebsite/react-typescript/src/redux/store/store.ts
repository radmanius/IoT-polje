import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reactTypescriptReducer from "../reducers/reactTypescriptReducer";
import { useDispatch } from "react-redux";
import { loaderMiddleware } from "redux/store/storeActionMiddleware";
import modalReducer from "redux/reducers/modalReducer";
import { LoginState } from "redux/reducers/loginReducer";
import { UserData } from "redux/models/userData";

export interface AppState {
    login: LoginState;
    user: UserData;
}

export const store = configureStore({
    reducer: combineReducers({
        reactTypescript: reactTypescriptReducer,
        modal: modalReducer,
    }),
    middleware: () => getDefaultMiddleware().prepend(loaderMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
