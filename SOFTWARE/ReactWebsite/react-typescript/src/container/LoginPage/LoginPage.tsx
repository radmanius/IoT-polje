import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StringResources as Res, translate as t } from "utils/language/languageResource";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <span>{t(Res.LoginPage)}</span>
        </div>
    );
};

export default LoginPage;
