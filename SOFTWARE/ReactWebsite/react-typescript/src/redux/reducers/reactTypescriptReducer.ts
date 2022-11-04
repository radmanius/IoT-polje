import { createSlice } from "@reduxjs/toolkit";
import { reactTypescriptExampleThunk } from "redux/actions/reactTypescriptActions";
import { LoadingActionModel, ReactTypescriptResponse } from "redux/models/reactTypescriptModels";
import { UserLoggedInStateEnum } from "utils/enums";

export interface ReactTypescriptReducerState {
    error?: string;
    reactTypescriptData: ReactTypescriptResponse;
    userState: UserLoggedInStateEnum;
    loadingActions: Array<LoadingActionModel>;
}

const initialState: ReactTypescriptReducerState = {
    error: "",
    reactTypescriptData: {
        id: 0,
        name: undefined,
    },
    userState: UserLoggedInStateEnum.Uninitialized,
    loadingActions: [],
};

export const reactTypescriptSlice = createSlice({
    name: "reactTypescript",
    initialState,
    reducers: {
        unAuthorized(state) {
            state.userState = UserLoggedInStateEnum.Unauthorized;
        },
        addLoaderAction(state, action) {
            state.loadingActions.push(action.payload);
        },
        removeLoaderAction(state, action) {
            state.loadingActions = state.loadingActions.filter(x => x.requestId != action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(reactTypescriptExampleThunk.fulfilled, (state, action) => {
            state.reactTypescriptData = action.payload;
        });
    },
});

const { reducer } = reactTypescriptSlice;
export const { unAuthorized, addLoaderAction, removeLoaderAction } = reactTypescriptSlice.actions;
export default reducer;
