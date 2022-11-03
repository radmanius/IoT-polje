//import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./SceneView.css";
import { IShortScene } from "models/shortScene";
import { useCallback, useEffect, useState } from "react";
import { initScene, IScene } from "models/scenes";

interface ILocationState {
    shortScene: IShortScene;
}

const SceneView = () => {
    const location = useLocation();
    const shortScene = (location.state as ILocationState)?.shortScene;
    console.log(shortScene);
    const [scene, setScene] = useState<IScene>(initScene);
    const navigate = useNavigate();
    //const dispatch = useDispatch();

    const fetchScene = useCallback(async () => {
        try {
            //const res = await getScenes(shortScene.sceneId);
            setScene(initScene);
        } catch (error) {
            //toast message
            console.log("error");
        }
    }, []);

    useEffect(() => {
        fetchScene();
    }, [fetchScene]);

    return (
        <div className="scene-page">
            <div>
                <h1>{scene.sceneTitle}</h1>
                <span>{scene.sceneSubtitle}</span>
            </div>
            <div>
                <Button
                    onClick={() => navigate(-1)}
                    label={"Nazatrag na prikaz kratkih scena"}
                />
            </div>
        </div>
    );
};

export default SceneView;
