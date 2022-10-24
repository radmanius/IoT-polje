import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const isActionLoadingSelector = createSelector(
    [(state: RootState) => state.reactTypescript.loadingActions, (state, actions: Array<string>) => actions],
    (items, actions) => {
        return items.some(y => actions.some(x => y.type.includes(x)));
    }
);

export const displayLoaderSelector = createSelector(
    [(state: RootState) => state.reactTypescript.loadingActions],
    items => {
        return items.filter(x => !x.isLoaderIgnored);
    }
);
