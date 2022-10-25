import { t } from "i18next";

export enum StringResources {
    SuccessExampleGet = "SuccessExampleGet",
    DefaultErrorMessage = "DefaultErrorMessage",
    NotFound = "NotFound",
    GhostStoleThisPage = "GhostStoleThisPage",
    LoginPage = "LoginPage",
    LandingPage = "LandingPage"
}

export function translate(stringResources: StringResources) {
    return t(stringResources);
}
