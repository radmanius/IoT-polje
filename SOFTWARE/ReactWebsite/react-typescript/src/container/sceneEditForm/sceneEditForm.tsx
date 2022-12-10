import { useNavigate, useLocation} from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { IScene } from "models/scenes";
import "./sceneEditForm.scss";
import { Button } from "primereact/button";
import { editScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { useState } from "react";
import { getAllScenes } from "utils/axios/scenesApi";

interface ILocationState {
    scene: IScene;
}

const SceneEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scene, setScene] = useState<IScene>((location.state as ILocationState)?.scene as IScene)

    const navigateToPreviousPage = async () => {
        try {
            const res = await getAllScenes();
            navigate(PAGE_ROUTES.SpecificSceneView, {
                        state: {
                            shortScene: res?.find(x => x.id === scene.id),
                        },
            }
            ); //vrati se nazad na scenu koju si editirao
        } catch (error) {
            //toast message
            console.log("error");
            navigate(PAGE_ROUTES.ShortSceneView);
        }
    };

    const handleAddNewScene = async (data: IScene) => {
        try {
            await editScene(data);
        } catch (error) {
            console.log("greška pri dodavanju nove scene");
            //here toast message
        } finally {
            await navigateToPreviousPage();
        }
    };

    const handleChange = (e: any) => {
        
        if (e.target.id === "title") {
            setScene({
                ...scene,
                title: e.target.value
            })
        } else if(e.target.id === "subtitle") {
            setScene({
                ...scene,
                subtitle: e.target.value
            })
        } else if(e.target.id === "pictureLink") {
            setScene({
                ...scene,
                pictureLink: e.target.value
            })
        }
    
    };


    const handleClick = (e: any) => {
        e.preventDefault();
        console.log(scene);
        handleAddNewScene(scene);
    };

    return (
        <div className="scene-form-container">
            <div>
                <h1>Uredi scenu {scene.id}</h1>
                <div className="form-fields-container">
                    <Form
                        initialValues={scene}
                        onSubmit={handleClick}
                        render={() => (
                            <form
                                id="new-scene"
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="title"
                                    render={({ input }) => (
                                        <div>
                                            <span>Naslov scene: </span>
                                            <span>
                                                <InputText
                                                    id="title"
                                                    {...input}
                                                    onChange={e => handleChange(e)}
                                                    onKeyPress={(e) => { e.key === 'Enter' && handleClick(e); }}
                                                    value={scene.title}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="subtitle"
                                    render={({ input }) => (
                                        <div>
                                            <span>Podnaslov scene: </span>
                                            <span>
                                                <InputText
                                                    id="subtitle"
                                                    {...input}
                                                    onChange={e => handleChange(e)}
                                                    onKeyPress={(e) => { e.key === 'Enter' && handleClick(e); }}
                                                    value={scene.subtitle}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="pictureLink"
                                    render={({ input }) => (
                                        <div>
                                            <span>Link slike scene: </span>
                                            <span>
                                                <InputText
                                                    id="pictureLink"
                                                    {...input}
                                                    onChange={e => handleChange(e)}
                                                    onKeyPress={(e) => { e.key === 'Enter' && handleClick(e); }}
                                                    value={scene.pictureLink}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />

                                <div className="scene-form-buttons">
                                    <Button
                                        label="Dodaj"
                                        icon="pi pi-check"
                                        type="button"
                                        onClick={(e) => handleClick(e)}
                                    />
                                    <Button
                                        label="Odustani"
                                        type="button"
                                        onClick={() => navigateToPreviousPage()}
                                    />
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default SceneEditForm;
