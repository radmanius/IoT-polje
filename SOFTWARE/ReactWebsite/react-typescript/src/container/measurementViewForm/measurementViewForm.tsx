import { IScene, IShortScene } from "models/scenes";
import { initMeasurementView } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
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
    const [dataFormat, setDataFormat] = useState("");

    const handleAddNewMeasurementView = async (data: any) => {
        try {
            console.log(data);
            setDataFormat("");
        } catch (error) {
            console.log("error while adding new actuation view");
        } finally {
        }
    };
    console.log(dataFormat);

    return (
        <div className="measurement-view-form-container">
            <div>
                <h3>Measurement view form for: {scene.title}</h3>
                <div className="form-fields-container">
                    <Form
                        onSubmit={data => handleAddNewMeasurementView(data)}
                        initialValues={initMeasurementView}
                        render={({ handleSubmit, values }) => (
                            <form
                                id="new-measurement-view"
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
                                                        placeholder="single or series"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="measurementUnit"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Mjerna jedinica:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="measurementUnit"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Select form (submit selection request)</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="selectForm.submitSelectionRequest.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.submitSelectionRequest.URI"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="selectForm.submitSelectionRequest.method"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.submitSelectionRequest.method"
                                                        className="scene-field-form"
                                                        placeholder="GET | POST"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="selectForm.submitSelectionRequest.headers"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.submitSelectionRequest.headers"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="selectForm.submitSelectionRequest.payload"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.submitSelectionRequest.payload"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Select form (inputs)</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="selectForm.inputs.name"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Name:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.inputs"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="selectForm.inputs.title"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Title:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="selectForm.inputs"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Query</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="query.URI"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>URI:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="query.URI"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="query.method"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Method:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="query.method"
                                                        placeholder="GET | POST"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="query.headers"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Headers:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="query.headers"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <Field
                                        name="query.payload"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Payload:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="query.payload"
                                                        className="scene-field-form"
                                                        {...input}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                </div>
                                <hr />
                                <h3>Response extractor</h3>
                                <div className="measurement-view-form-container-inputs">
                                    <Field
                                        name="responseExtracting.dataFormat"
                                        render={({ input }) => (
                                            <div>
                                                <span>
                                                    <p>Data format:</p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="responseExtracting.dataFormat"
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
