import { useNavigate } from "react-router-dom";
import { StringResources as Res, translate as t } from "utils/language/languageResource";
import { Button } from "primereact/button";
import "./LandingPage.scss";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div>
                <h1>{t(Res.LandingPage)}</h1>
                <Button
                    onClick={() => navigate("/short-scene")}
                    label={"Prikaži kratke scene"}
                />
            </div>
        </div>
    );
};

export default LandingPage;
