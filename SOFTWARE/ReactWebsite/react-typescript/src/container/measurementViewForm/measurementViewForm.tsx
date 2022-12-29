import { IScene, IShortScene } from "models/scenes";
import { initMeasurementView } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import "./measurementViewForm.scss";

interface ILocationState {
    shortScene: IScene;
}

const MeasurementViewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scene = (location.state as ILocationState)?.shortScene as IShortScene;

    const handleAddNewMeasurementView = async (data: any) => {
        try {
            console.log(data);
        } catch (error) {
            console.log("error while adding new actuation view");
        } finally {
        }
    };
    return (
        <div className="measurement-view-form-container">
            <div>
                <h3>Actuation view form for: {scene.title}</h3>
                <div className="form-fields-container">
                    <Form
                        onSubmit={data => handleAddNewMeasurementView(data)}
                        initialValues={initMeasurementView}
                        render={({ handleSubmit }) => (
                            <form
                                id="new-actuation-view"
                                onSubmit={handleSubmit}
                                autoComplete="off"
                            >
                                <div className="measurement-view-form-container-inputs">
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
                                                        className="scene-field-form"
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
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Defualt values request</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="form.defaultValuesRequest.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.URI"
                                                        className="scene-field-form"
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
                                                    <p>Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.method"
                                                        className="scene-field-form"
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
                                                    <p>Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.headers"
                                                        className="scene-field-form"
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
                                                    <p>Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.defaultValuesRequest.payload"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Submit form request</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="form.submitFormRequest.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.URI"
                                                        className="scene-field-form"
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
                                                    <p>Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.method"
                                                        className="scene-field-form"
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
                                                    <p>Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.headers"
                                                        className="scene-field-form"
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
                                                    <p>Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.submitFormRequest.payload"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Inputs</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="form.inputs.name"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Input name:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.name"
                                                        className="scene-field-form"
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
                                                    <p>Input title:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.title"
                                                        className="scene-field-form"
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
                                                    <p>Input type:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.inputType"
                                                        className="scene-field-form"
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
                                                    <p>Input description:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.description"
                                                        className="scene-field-form"
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
                                                    <p>Input default value:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="form.inputs.defaultValue"
                                                        className="scene-field-form"
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

export default MeasurementViewForm;
