import { isPending, isRejected, Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { addLoaderAction, removeLoaderAction, unAuthorized } from "../reducers/reactTypescriptReducer";

export const loaderMiddleware: Middleware = (api: MiddlewareAPI) => next => action => {
    if (isRejected(action)) {
        if (action.error.code == 401 || action.error.code == 403) {
            api.dispatch(unAuthorized());
        }
    }
    if (action.meta != undefined) {
        if (isPending(action)) {
            api.dispatch(
                addLoaderAction({
                    type: action.type,
                    requestId: action.meta.requestId,
                })
            );
        } else {
            api.dispatch(removeLoaderAction(action.meta.requestId));
        }
    }

    return next(action);
};