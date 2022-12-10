import { AsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

export async function executeContainerThunkDispatch<ReturnType, ArgumentType>(
    containerDispatch: ThunkDispatch<any, any, any>,
    thunkAction: AsyncThunk<ReturnType, ArgumentType, {}>,
    args: ArgumentType
) {
    let isValid = false;
    let error = undefined;
    let data = {} as ReturnType;

    try {
        data = await containerDispatch(thunkAction(args)).unwrap();
        isValid = true;
    } catch (exception) {
        error = exception;
    }

    return { data, isValid, error };
}

export function FormatDateToyyyyMMdd(date: string) {
    return DateTime.fromISO(date).toFormat("yyyy-MM-dd");
}

export const devConsoleLog = (param1?: any, param2?: any) => {
    process.env.NODE_ENV != "production" //&& console.log(param1, param2);
};

export const devConsoleError = (param1?: any, param2?: any) => {
    process.env.NODE_ENV != "production" //&& console.error(param1, param2);
};

export const devConsoleAssert = (condition: boolean) => {
    process.env.NODE_ENV != "production" //&& console.assert(condition);
};
