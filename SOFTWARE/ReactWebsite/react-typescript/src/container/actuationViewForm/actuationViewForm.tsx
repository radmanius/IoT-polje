import { IScene, IShortScene } from "models/scenes";
import { initActuatinoView } from "models/viewsInterfaces/views";
//import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation } from "react-router-dom";
//import { PAGE_ROUTES } from "utils/paths";
import "./actuationViewForm.scss";

interface ILocationState {
    shortScene: IScene;
}

const ActuationViewForm = () => {
    //const navigate = useNavigate();
    const location = useLocation();
    const scene = (location.state as ILocationState)?.shortScene as IShortScene;

    const handleAddNewActuationView = async (data: any) => {
        try {
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
                                <div className="actuation-view-form-container-inputs">
                                    <Field
                                        name="title"
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
                                        name="title"
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
                                        name="title"
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
                                        name="title"
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
                                        name="title"
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
                                        name="title"
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
                                </div>
                                {/*
                                    <div className="scene-form-buttons">
                                        <Button
                                            label="Dodaj"
                                            icon="pi pi-check"
                                            type="submit"
                                        />
                                        <Button
                                            label="Odustani"
                                            onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                                            //onClick={ () => console.log(multiselectRef.current.getSelectedItems())}
                                        />
                                    </div>
                                */}
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ActuationViewForm;
