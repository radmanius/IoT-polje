import { ReactTypescriptRequest } from "redux/models/reactTypescriptModels";
import { StringResources as Res, translate as t } from "utils/language/languageResource";
import { ENDPOINTS } from "utils/paths";
import { executeGetRequest } from "./services";

export async function ReactTypescriptGetExample(request: ReactTypescriptRequest) {
    return await executeGetRequest(
        ENDPOINTS.Account.Login + `/${request.id}`,
        {},
        {
            successMessage: t(Res.SuccessExampleGet),
            useBackendErrorMessage: true,
            errorMessage: t(Res.DefaultErrorMessage),
        }
    )
}
