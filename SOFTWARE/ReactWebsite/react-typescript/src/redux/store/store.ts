import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { UserData } from "../models/userData";
import { loginReducer, LoginState } from "redux/reducers/loginReducer";
import createSagaMiddleware from "redux-saga";
import root from "sagas/root";
import userReducer from "redux/reducers/userReducer";

export interface AppState {
    loginReducer: LoginState;
    userReducer: UserData;
}

const configureStore = (initialState?: AppState) => {
    const rootReducer = combineReducers<AppState>({
        loginReducer,
        userReducer,
    });
    const sagaMiddleware = createSagaMiddleware();

    const enhancers = [];
    const windowIfDefined = typeof window === "undefined" ? null : (window as any);
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }

    const result = createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(sagaMiddleware), ...enhancers)
    );

    sagaMiddleware.run(root);

    return result;
};

export const store = configureStore();

export type AppDispatch = typeof store.dispatch;
