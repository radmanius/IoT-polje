import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { UserData } from "../models/userData";
import { LoginState } from "redux/reducers/loginReducer";
import createSagaMiddleware from "redux-saga";


export interface AppState {
    login: LoginState;
    user: UserData;
}

const configureStore = (initialState?: AppState) => {
    const rootReducer = combineReducers<AppState>({
        
    });

    const sagaMiddleware = createSagaMiddleware();

    

};

export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
