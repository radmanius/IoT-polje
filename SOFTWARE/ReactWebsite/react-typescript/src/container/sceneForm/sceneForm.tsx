import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { initScene, IScene } from "models/scenes";
import "./sceneForm.scss";
import { Button } from "primereact/button";
import { createNewScene } from "utils/axios/scenes";
import { PAGE_ROUTES } from "utils/paths";

const SceneForm = () => {
    const navigate = useNavigate();

    const handleAddNewScene = async (data: IScene) => {
        try {
            await createNewScene(data);
        } catch (error) {
            console.log("greška pri dodavanju nove scene");
            //here toast message
        } finally {
            navigate(PAGE_ROUTES.AddNewScene);
        }
    };

    return (
        <div className="scene-form-container">
            <h1>Dodaj novu scenu</h1>
            <Form
                onSubmit={(data: IScene) => handleAddNewScene(data)}
                initialValues={initScene}
                render={({ handleSubmit }) => (
                    <form
                        id="new-scene"
                        onSubmit={handleSubmit}
                        className="form-container"
                        autoComplete="off"
                    >
                        <Field
                            name="sceneTitle"
                            render={({ input }) => (
                                <div>
                                    <span>Naslov scene</span>
                                    <span>
                                        <InputText
                                            id="sceneTitle"
                                            {...input}
                                        />
                                    </span>
                                </div>
                            )}
                        />
                        <Field
                            name="sceneSubtitle"
                            render={({ input }) => (
                                <div>
                                    <span>Podnaslov scene</span>
                                    <span>
                                        <InputText
                                            id="sceneSubtitle"
                                            {...input}
                                        />
                                    </span>
                                </div>
                            )}
                        />
                        <Field
                            name="pictureLink"
                            render={({ input }) => (
                                <div>
                                    <span>Link slike scene</span>
                                    <span>
                                        <InputText
                                            id="pictureLink"
                                            {...input}
                                        />
                                    </span>
                                </div>
                            )}
                        />
                        <div>
                            <Button
                                label="Prihvati promjene"
                                icon="pi pi-check"
                                type="submit"
                            />
                            <Button
                                label="Natrag na popis scena"
                                onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                            />
                        </div>
                    </form>
                )}
            />
        </div>
    );
};

export default SceneForm;
