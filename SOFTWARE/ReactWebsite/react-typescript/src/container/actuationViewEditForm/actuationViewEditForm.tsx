import { IScene } from "models/scenes";
import { ActuationView, viewMethodOptions } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { Dropdown } from "primereact/dropdown";

import "./actuationViewEditForm.scss";
import { viewInputsOptions } from "models/viewsInterfaces/inputs";
import { useKeycloak } from "@react-keycloak/web";

interface ILocationState {
    shortScene: IScene;
    view: ActuationView;
}

const ActuationViewEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { keycloak } = useKeycloak();
    let scene = (location.state as ILocationState)?.shortScene as IScene;
    let view = (location.state as ILocationState)?.view as ActuationView;
    console.log(view);

    const handleAddNewActuationView = async (data: ActuationView) => {
        let newData = { ...data };
        switch (data.form.inputs?.inputType) {
            case "BOOLEAN": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue,
                            inputType: "BOOLEAN",
                        },
                    },
                };
                break;
            }
            case "INTEGER": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue ?? -1,
                            min: data.form.inputs.min,
                            max: data.form.inputs.max,
                            inputType: "INTEGER",
                        },
                    },
                };
                break;
            }
            case "DECIMAL": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue ?? -1,
                            min: data.form.inputs.min,
                            max: data.form.inputs.max,
                            inputType: "DECIMAL",
                        },
                    },
                };
                break;
            }
            case "DATE": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue ?? "",
                            inputType: "DATE",
                        },
                    },
                };
                break;
            }
            case "TIME": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue ?? "",
                            inputType: "TIME",
                        },
                    },
                };
                break;
            }
            case "STRING": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            description: data.form.inputs.description,
                            defaultValue: data.form.inputs.defaultValue ?? false,
                            pattern: data.form.inputs.pattern,
                            inputType: "STRING",
                        },
                    },
                };
                break;
            }
            case "SUBMIT": {
                newData = {
                    ...data,
                    form: {
                        ...data.form,
                        inputs: {
                            name: data.form.inputs.name ?? "",
                            title: data.form.inputs.title ?? "",
                            inputType: "SUBMIT",
                        },
                    },
                };
                break;
            }
        }
        console.log(newData);

        let views = [...scene.views];
        views.push(newData);
        views.map(view => {
            if (view.selectForm) {
                if (!view.selectForm.submitSelectionRequest) {
                    view.selectForm.submitSelectionRequest = {};
                }
            } else if (view.form) {
                if (!view.form.submitFormRequest) {
                    view.form.submitFormRequest = {};
                }
            }
        });
        try {
            //scene = { ...scene, views: views };
            await editScene({ ...scene, views: views }, keycloak.token ?? "");
        } catch (error) {
            console.log("error while adding new actuation view");
        } finally {
        }
    };

    return (
        <>
            <Button
                label="Natrag"
                className="actuation-view-back-button"
                onClick={() =>
                    navigate(PAGE_ROUTES.SpecificSceneView, {
                        state: {
                            shortScene: scene,
                        },
                    })
                }
            />
            <div className="actuation-view-form-container">
                <div>
                    <h3>Actuation view form for: {scene.title}</h3>
                    <div className="form-fields-container">
                        <Form
                            onSubmit={(data: ActuationView) => handleAddNewActuationView(data)}
                            initialValues={view}
                            render={({ handleSubmit, values }) => (
                                <form
                                    id="new-actuation-view"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                >
                                    <div className="actuation-view-form-container-inputs">
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
                                                            disabled
                                                            {...input}
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                        />
                                    </div>
                                    <hr />
                                    <h3>Default values request</h3>
                                    <div className="actuation-view-form-container-inputs">
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
                                                        <Dropdown
                                                            {...input}
                                                            className="scene-field-form dropdown-design"
                                                            options={viewMethodOptions}
                                                            optionLabel="text"
                                                            optionValue="value"
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="form.defaultValuesRequest.headers.{{accessToken}} {{token1}}"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p className="headers">
                                                            Headers:
                                                            <Button
                                                                icon="fa fa-plus"
                                                                className="p-button-success"
                                                                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    console.log("click");
                                                                }}
                                                            />
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="form.defaultValuesRequest.headers.{{accessToken}} {{token1}}"
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
                                                        <p className="payload">Payload:</p>
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
                                    <div className="actuation-view-form-container-inputs">
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
                                                        <Dropdown
                                                            {...input}
                                                            className="scene-field-form dropdown-design"
                                                            options={viewMethodOptions}
                                                            optionLabel="text"
                                                            optionValue="value"
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                        />

                                        <Field
                                            name="form.submitFormRequest.headers.{{accessToken}} {{token1}}"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p className="headers">
                                                            Headers:
                                                            <Button
                                                                icon="fa fa-plus"
                                                                className="p-button-success"
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    console.log("click");
                                                                }}
                                                            />
                                                        </p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="form.submitFormRequest.headers.{{accessToken}} {{token1}}"
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
                                                        <p className="payload">Payload:</p>
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
                                    <div className="actuation-view-form-container-inputs">
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
                                                        <Dropdown
                                                            {...input}
                                                            className="scene-field-form dropdown-design"
                                                            options={viewInputsOptions}
                                                            optionLabel="text"
                                                            optionValue="value"
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                        />
                                        {values.form.inputs?.inputType !== "SUBMIT" && (
                                            <Field
                                                name="form.inputs.description"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Description:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="form.inputs.description"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {values.form.inputs?.inputType !== "SUBMIT" && (
                                            <Field
                                                name="form.inputs.defaultValue"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Default value:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="form.inputs.defaultValue"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {values.form.inputs?.inputType === "STRING" && (
                                            <Field
                                                name="form.inputs.pattern"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Pattern:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="form.inputs.pattern"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {((values.form.inputs?.inputType === "INTEGER" ||
                                            values.form.inputs?.inputType === "DECIMAL") && (
                                                <>
                                                    <Field
                                                        name="form.inputs.min"
                                                        render={({ input }) => (
                                                            <div>
                                                                <span>
                                                                    <p>Minimum:</p>
                                                                </span>
                                                                <span>
                                                                    <InputText
                                                                        {...input}
                                                                        id="form.inputs.min"
                                                                        className="scene-field-form"
                                                                    />
                                                                </span>
                                                            </div>
                                                        )}
                                                    />
                                                    <Field
                                                        name="form.inputs.max"
                                                        render={({ input }) => (
                                                            <div>
                                                                <span>
                                                                    <p>Maximum:</p>
                                                                </span>
                                                                <span>
                                                                    <InputText
                                                                        {...input}
                                                                        id="form.inputs.max"
                                                                        className="scene-field-form"
                                                                    />
                                                                </span>
                                                            </div>
                                                        )}
                                                    />
                                                </>
                                            ))}
                                    </div>
                                    <div className="scene-form-buttons">
                                        <Button
                                            label="Dodaj"
                                            icon="pi pi-check"
                                            type="submit"
                                        />
                                        <Button
                                            label="Odustani"
                                            onClick={() =>
                                                navigate(PAGE_ROUTES.SpecificSceneView, {
                                                    state: {
                                                        shortScene: scene,
                                                    },
                                                })
                                            }
                                        />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActuationViewEditForm;
