import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./specificSceneView.scss";
import { useCallback, useEffect, useState } from "react";
import { IScene , IShortScene} from "models/scenes";
import { PAGE_ROUTES } from "utils/paths";
import { getSceneById } from "utils/axios/scenesApi";

interface ILocationState {
    shortScene: IScene;
}

const SpecificSceneView = () => {
    const location = useLocation();
    const shortScene = (location.state as ILocationState)?.shortScene as IShortScene;
    console.log(shortScene);
    const [scene, setScene] = useState<IScene>();
    const navigate = useNavigate();

    const fetchScene = useCallback(async () => {
        try {
            const res = await getSceneById(shortScene.id);
            setScene(res);
            console.log(res);
        } catch (error) {
            //toast message
            console.log(scene);
        }
    }, []);

    function handleClickEdit() {
        navigate(PAGE_ROUTES.EditScene, { state: { scene } });
    }

    useEffect(() => {
        fetchScene();
    }, [fetchScene]);

    return (
        <div className="scene-page">
            {scene && (
                <div>
                    <div className="align-right-button">
                        <Button
                            className="edit-button"
                            onClick={handleClickEdit}
                            label={"Uredi scenu"}
                        />
                    </div>  
                        <h1>{scene.title}</h1>
                    <h3>{scene.subtitle}</h3>
                    <img
                        src={scene.pictureLink}
                        className="iot-img"
                        alt="iot slika"
                    />
                </div>
            )}
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
