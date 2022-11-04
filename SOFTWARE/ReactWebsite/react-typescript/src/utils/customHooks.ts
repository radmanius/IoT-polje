import { AsyncThunk } from "@reduxjs/toolkit";
import { useState, useEffect } from "react";
import { useAppDispatch } from "redux/store";

export function useContainerThunkDispatch<ReturnType, ArgumentType>(
    thunkAction?: AsyncThunk<ReturnType, ArgumentType, {}>,
    args?: ArgumentType
) {
    const appDispatch = useAppDispatch();
    const [status, setStatus] = useState<{
        loading: boolean;
        isValid: boolean;
        error?: Error;
        data?: ReturnType;
    }>({
        loading: true,
        isValid: false,
    });

    const executeRequest = (thunkAction: AsyncThunk<ReturnType, ArgumentType, {}>, args: ArgumentType) => {
        appDispatch(thunkAction(args))
            .unwrap()
            .then(data => {
                setStatus({
                    loading: false,
                    isValid: true,
                    data,
                });
            })
            .catch(error => {
                setStatus({
                    loading: false,
                    isValid: false,
                    error,
                });
            });
    };

    useEffect(() => {
        if (thunkAction && args) {
            executeRequest(thunkAction, args);
        }
    }, []);

    return { ...status, executeRequest };
}
