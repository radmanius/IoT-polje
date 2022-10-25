import { StringResources as Res, translate as t } from "utils/language/languageResource";

const LandingPage = () => {
    return (
        <div>
            <span>{t(Res.LandingPage)}</span>
        </div>
    );
};

export default LandingPage;
