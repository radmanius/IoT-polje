export interface UserData {
    firstName?: string;
    lastName?: string;
    userName?: string;
    token?: string;
    passwordRecoveryToken?: string;
    locale?: Locale;
}

export enum Locale {
    en = 0,
    hr = 1,
}
