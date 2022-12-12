import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { initScenes } from "models/scenes";
import "./sceneForm.scss";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import { editScene } from "utils/axios/scenesApi";
import { MultiSelect } from "primereact/multiselect";
import { tagsTypeOptions } from "models/tags";
import { roleTypeOptions } from "models/role";
import { keysTypeOptions } from "models/keys";

const SceneForm = () => {
    const navigate = useNavigate();

    const handleAddNewScene = async (data: any) => {
        try {
            console.log(data);
            console.log(initScenes);
            await editScene(data);
        } catch (error) {
            console.log("greška pri dodavanju nove scene");
        } finally {
            navigate(PAGE_ROUTES.ShortSceneView);
        }
    };

    return (
        <div className="scene-form-container">
            <div>
                <h1>Dodaj novu scenu</h1>
                <div className="form-fields-container">
                    <Form
                        onSubmit={data => handleAddNewScene(data)}
                        initialValues={initScenes}
                        render={({ handleSubmit }) => (
                            <form
                                id="new-scene"
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="title"
                                    className="scene-field-form"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Naslov scene:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="title"
                                                    className="scene-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="subtitle"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Podnaslov scene:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="subtitle"
                                                    className="scene-field-form"
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
                                            <span>
                                                <p className="scene-label">Link slike scene:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="pictureLink"
                                                    className="scene-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="layout"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Layout:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="layout"
                                                    className="scene-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="tags"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Tagovi:</p>
                                            </span>
                                            <span>
                                                <MultiSelect
                                                    id="tags"
                                                    className="scene-field-form"
                                                    {...input}
                                                    options={tagsTypeOptions}
                                                    filter
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="roles"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Rolovi:</p>
                                            </span>
                                            <span>
                                                <MultiSelect
                                                    id="roles"
                                                    className="scene-field-form"
                                                    {...input}
                                                    options={roleTypeOptions}
                                                    filter
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="keys"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Keys:</p>
                                            </span>
                                            <span>
                                                <MultiSelect
                                                    id="keys"
                                                    className="scene-field-form"
                                                    {...input}
                                                    options={keysTypeOptions}
                                                    filter
                                                />
                                            </span>
                                        </div>
                                    )}
                                />

                                <div className="scene-form-buttons">
                                    <Button
                                        label="Dodaj"
                                        icon="pi pi-check"
                                        type="submit"
                                    />
                                    <Button
                                        label="Odustani"
                                        onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
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

export default SceneForm;
