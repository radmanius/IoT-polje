import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./SpecificSceneView.scss";
import { IShortScene } from "models/shortScene";
import { useCallback, useEffect, useState } from "react";
import { initScene, IScene } from "models/scenes";
import { PAGE_ROUTES } from "utils/paths";
import { getSceneById } from "utils/axios/scenes";

interface ILocationState {
    shortScene: IShortScene;
}

const SpecificSceneView = () => {
    const location = useLocation();
    const shortScene = (location.state as ILocationState)?.shortScene;
    console.log(shortScene);
    const [scene, setScene] = useState<IScene>(initScene);
    const navigate = useNavigate();

    const fetchScene = useCallback(async () => {
        try {
            const res = await getSceneById(shortScene.sceneId);
            setScene(res);
        } catch (error) {
            //toast message
            console.log(scene);
        }
    }, []);

    useEffect(() => {
        fetchScene();
    }, [fetchScene]);

    return (
        <div className="scene-page">
            <div>
                <h1>{shortScene.sceneTitle}</h1>
                <h3>{shortScene.sceneSubtitle}</h3>
                <img
                    src="/iot.jpeg"
                    className="iot-img"
                    alt="iot slika"
                />
            </div>
            <div>
                <Button
                    onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                    label={"Natrag na prikaz kratkih scena"}
                />
            </div>
        </div>
    );
};

export default SpecificSceneView;
