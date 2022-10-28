import { useNavigate } from "react-router-dom";
import { StringResources as Res, translate as t } from "utils/language/languageResource";
import { Button } from "primereact/button";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>{t(Res.LandingPage)}</h1>
            <Button
                onClick={() => navigate("/scene-view")}
                label={"Prikaži scenu"}
            />
        </div>
    );
};

export default LandingPage;
