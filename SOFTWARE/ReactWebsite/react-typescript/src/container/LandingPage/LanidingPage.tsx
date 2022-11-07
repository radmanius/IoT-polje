import { useNavigate } from "react-router-dom";
import { StringResources as Res, translate as t } from "utils/language/languageResource";
import { Button } from "primereact/button";
import "./LandingPage.scss";
import { PAGE_ROUTES } from "utils/paths";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div>
                <h1>{t(Res.LandingPage)}</h1>
                <Button
                    onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                    label={"Prikaži kratke scene"}
                />
            </div>
        </div>
    );
};

export default LandingPage;
