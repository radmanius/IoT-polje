import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./specificSceneView.scss";
import { useCallback, useEffect, useState } from "react";
import { IScene, IShortScene } from "models/scenes";
import { PAGE_ROUTES } from "utils/paths";
import { getSceneById } from "utils/axios/scenesApi";
import Popup from "./deletePopup";

interface ILocationState {
    shortScene: IScene;
}

const SpecificSceneView = () => {
    const location = useLocation();
    const shortScene = (location.state as ILocationState)?.shortScene as IShortScene;
    const [scene, setScene] = useState<IScene>();
    const navigate = useNavigate();

    const [popup, setPopup] = useState(false);

    const fetchScene = useCallback(async () => {
        try {
            const res = await getSceneById(shortScene.id);
            setScene(res);
        } catch (error) {
            //toast message
            console.log("error");
        }
    }, []);

    function handleClickEdit() {
        navigate(PAGE_ROUTES.EditScene, { state: { scene } });
    }

    async function handleClickDelete() {
        setPopup(true);
        // try {
        //     await deleteScene(shortScene.id);
        //     navigate(PAGE_ROUTES.ShortSceneView);
        // }
        // catch {
        //     console.log("Error");
        // }
    }

    useEffect(() => {
        fetchScene();
    }, [fetchScene]);

    return (
        <div className="scene-page">
            {scene && (
                <div>
                    <div className="specific-scene-buttons-top">
                        <div className="align-left-button">
                            <Button
                                onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                                label={"Natrag na prikaz kratkih scena"}
                            />
                        </div>
                        <div>
                            <div className="align-right-button">
                                <Button
                                    className="edit-button"
                                    onClick={handleClickEdit}
                                    label={"Uredi scenu"}
                                />
                            </div>
                            <div className="align-right-button">
                                <Button
                                    className="delete-button"
                                    onClick={handleClickDelete}
                                    label={"Obriši scenu"}
                                />
                            </div>
                        </div>
                    </div>
                    <Popup
                        trigger={popup}
                        setTrigger={setPopup}
                        id={shortScene.id}
                    />
                    <h1>{scene.title}</h1>
                    <h3>{scene.subtitle}</h3>
                    <img
                        src={scene.pictureLink}
                        className="iot-img"
                        alt="iot slika"
                    />
                </div>
            )}
        </div>
    );
};

export default SpecificSceneView;
