import { IScene, IShortScene } from "models/scenes";
import { initActuatinoView } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import "./actuationViewForm.scss";

interface ILocationState {
    shortScene: IScene;
}

const ActuationViewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scene = (location.state as ILocationState)?.shortScene as IShortScene;

    const handleAddNewActuationView = async (data: any) => {
        try {
            console.log(data);
        } catch (error) {
            console.log("error while adding new actuation view");
        } finally {
        }
    };
    return (
        <div className="actuation-view-form-container">
            <div>
                <h3>Actuation view form for: {scene.title}</h3>
                <div className="form-fields-container">
                    <Form
                        onSubmit={data => handleAddNewActuationView(data)}
                        initialValues={initActuatinoView}
                        render={({ handleSubmit }) => (
                            <form
                                id="new-actuation-view"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="actuation-view-form-header">
                                    <Field
                                        name="title"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Naslov:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="title"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="viewType"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Tip:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="viewType"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Defualt values request</h3>
                                <div className="actuation-view-form-container-inputs">
                                    <Field
                                        name="form.defaultValuesRequest.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.URI"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.defaultValuesRequest.method"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.method"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />

                                    <Field
                                        name="form.defaultValuesRequest.headers"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.headers"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.defaultValuesRequest.payload"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.payload"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Submit form request</h3>
                                <div className="actuation-view-form-container-inputs">
                                    <Field
                                        name="form.submitFormRequest.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.URI"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.submitFormRequest.method"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.method"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />

                                    <Field
                                        name="form.submitFormRequest.headers"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.headers"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.submitFormRequest.payload"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.payload"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Inputs</h3>
                                <div className="actuation-view-form-container-inputs">
                                    <Field
                                        name="form.inputs.name"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Input name:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.name"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.inputs.title"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Input title:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.title"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />

                                    <Field
                                        name="form.inputs.inputType"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Input type:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.inputType"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.inputs.description"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Input description:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.description"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="form.inputs.defaultValue"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p className="scene-label">Input default value:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.defaultValue"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
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

export default ActuationViewForm;
