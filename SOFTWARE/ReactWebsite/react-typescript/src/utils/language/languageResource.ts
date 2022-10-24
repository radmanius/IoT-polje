import { t } from "i18next";

export enum StringResources {
    SuccessExampleGet = "SuccessExampleGet",
    DefaultErrorMessage = "DefaultErrorMessage",
    NotFound = "NotFound",
    GhostStoleThisPage = "GhostStoleThisPage",
}

export function translate(stringResources: StringResources) {
    return t(stringResources);
}
