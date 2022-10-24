import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { SupportedLanguageEnum } from "utils/enums";
import { StringResources as Res } from "./languageResource";

i18n.use(initReactI18next).init({
    resources: {
        [SupportedLanguageEnum[SupportedLanguageEnum.English]]: {
            translations: {
                [Res.SuccessExampleGet]: "Successfully got example",
                [Res.DefaultErrorMessage]: "Something went wrong. Please try again later.",
                [Res.NotFound]: "Page not found",
                [Res.GhostStoleThisPage]: "Ghost stole this page",
            },
        },
        [SupportedLanguageEnum[SupportedLanguageEnum.Croatian]]: {
            translations: {
                [Res.SuccessExampleGet]: "Uspješno dohvaćanje get-a",
                [Res.DefaultErrorMessage]: "Nešto nije u redu. Molimo Vas, pokušajte ponovno kasnije.",
                [Res.NotFound]: "Stranica nije pronađena",
                [Res.GhostStoleThisPage]: "Duh je ukrao ovu stranicu",
            },
        },
    },
    fallbackLng: "English",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
