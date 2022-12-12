import { useNavigate, useLocation } from "react-router-dom";
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
    const [scene, setScene] = useState<IScene>((location.state as ILocationState)?.scene as IScene);

    const navigateToPreviousPage = async () => {
        try {
            const res = await getAllScenes();
            navigate(PAGE_ROUTES.SpecificSceneView, {
                state: {
                    shortScene: res?.find(x => x.id === scene.id),
                },
            }); //vrati se nazad na scenu koju si editirao
        } catch (error) {
            //toast message
            console.log("error");
            navigate(PAGE_ROUTES.ShortSceneView);
        }
    };

    const handleEditScene = async (data: IScene) => {
        try {
            for (let i = 0; i < data.tags.length; i++) {
                data.tags[i] = data.tags[i].name;
            }
            for (let i = 0; i < data.keys.length; i++) {
                data.keys[i] = data.keys[i].name;
            }
            for (let i = 0; i < data.roles.length; i++) {
                data.roles[i] = data.roles[i].name;
            }

            data.layout = data.layout.name;
            data.views.map(view => {
                delete view.id;

                if (view.selectForm) {
                    if (view.selectForm.submitSelectionRequest) {
                        delete view.selectForm.submitSelectionRequest.id;
                    } else {
                        view.selectForm.submitSelectionRequest = {};
                    }
                } else if (view.form) {
                    if (view.form.submitFormRequest) {
                        delete view.form.submitFormRequest.id;
                    } else {
                        view.form.submitFormRequest = {};
                    }
                }
            });

            data.roles.map(role => delete role.id);
            data.keys.map(key => delete key.id);

            console.log("here");
            console.log(data);
            const response = await editScene(data);
            console.log("response");
            console.log(response);
        } catch (error) {
            console.log(error);
            //console.log("greška pri dodavanju nove scene");
            //here toast message
        } finally {
            await navigateToPreviousPage();
        }
    };

    const handleChange = (e: any) => {
        if (e.target.id === "title") {
            setScene({
                ...scene,
                title: e.target.value,
            });
        } else if (e.target.id === "subtitle") {
            setScene({
                ...scene,
                subtitle: e.target.value,
            });
        } else if (e.target.id === "pictureLink") {
            setScene({
                ...scene,
                pictureLink: e.target.value,
            });
        }
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        await handleEditScene(scene);
    };

    return (
        <div className="scene-form-container-edit">
            {scene && (
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
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
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
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
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
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
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
                                            onClick={e => handleClick(e)}
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
            )}
        </div>
    );
};

export default SceneEditForm;
