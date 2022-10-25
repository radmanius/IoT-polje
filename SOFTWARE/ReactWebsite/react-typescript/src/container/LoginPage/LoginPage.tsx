import { StringResources as Res, translate as t } from "utils/language/languageResource";

const LoginPage = () => {
    return (
        <div>
            <span>{t(Res.LoginPage)}</span>
        </div>
    );
};

export default LoginPage;
