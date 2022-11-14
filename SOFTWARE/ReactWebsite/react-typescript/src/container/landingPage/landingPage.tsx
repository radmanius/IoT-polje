import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./landingPage.scss";
import { PAGE_ROUTES } from "utils/paths";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="landing-page">
            <div>
                <h1>Početna stranica</h1>
                <Button
                    onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                    label={"Prikaži kratke scene"}
                />
            </div>
        </div>
    );
};

export default LandingPage;
