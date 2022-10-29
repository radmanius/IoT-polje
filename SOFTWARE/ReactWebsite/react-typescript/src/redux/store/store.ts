
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import modalReducer from "redux/reducers/modalReducer";
import reactTypescriptReducer from "redux/reducers/reactTypescriptReducer";
import { loaderMiddleware } from "redux/store/storeActionMiddleware";

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