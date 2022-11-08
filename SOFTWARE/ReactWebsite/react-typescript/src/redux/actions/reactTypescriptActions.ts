import { createAsyncThunk } from "@reduxjs/toolkit";
import { ReactTypescriptRequest, ReactTypescriptResponse } from "redux/models/reactTypescriptModels";
import { ReactTypescriptGetExample } from "redux/services/reactTypescript.services";

export const reactTypescriptExampleThunk = createAsyncThunk<ReactTypescriptResponse, ReactTypescriptRequest>(
    "react-typescript/get-example",
    async (request, thunkAPI) => {
        await ReactTypescriptGetExample(request);

        var request: ReactTypescriptRequest = {
            id: 1,
        };
        return request;
    }
);
