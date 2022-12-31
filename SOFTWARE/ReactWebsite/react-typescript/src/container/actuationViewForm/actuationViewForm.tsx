import { IScene } from "models/scenes";
import { ActuationView, initActuationView, viewMethodOptions } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { Dropdown } from "primereact/dropdown";

import "./actuationViewForm.scss";
import { viewInputsOptions } from "models/viewsInterfaces/inputs";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";
import { useState } from "react";

interface ILocationState {
    shortScene: IScene;
}

const ActuationViewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    let scene = (location.state as ILocationState)?.shortScene as IScene;

    const [headersDefault, setHeadersDefault] = useState<Array<Array<string>>>([["", ""]]);
    const [headersSubmit, setHeadersSubmit] = useState<Array<Array<string>>>([["", ""]]);

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
        let keySubmit = headersSubmit[0][0];
        let valueSubmit = headersSubmit[0][1];
        let headersSubmitMap = {} as { [key: string]: string };
        headersSubmitMap[keySubmit] = valueSubmit;

        let keyDefault = headersDefault[0][0];
        let valueDefault = headersDefault[0][1];
        let headersDefaultMap = {} as { [key: string]: string };
        headersDefaultMap[keyDefault] = valueDefault;

        newData = {
            ...newData,
            form: {
                ...newData.form,
                defaultValuesRequest: {
                    ...newData.form.defaultValuesRequest,
                    headers: headersDefaultMap,
                },
                submitFormRequest: {
                    ...newData.form.submitFormRequest,
                    headers: headersSubmitMap,
                },
            },
        };
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
            await editScene({ ...scene, views: views }, keycloak.token ?? "");
            dispatch(showToastMessage("Actuation view successfully created", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Error while adding new actuation view.", "error"));
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
                            initialValues={initActuationView}
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
                                                            id="form.defaultValuesRequest.headers.key"
                                                            className="scene-field-form-key"
                                                            value={headersDefault[0][0]}
                                                            onChange={e => {
                                                                let headersCopy = [...headersDefault];
                                                                headersCopy[0][0] = e.target.value;
                                                                setHeadersDefault(headersCopy);
                                                            }}
                                                        />
                                                        <InputText
                                                            id="form.defaultValuesRequest.headers.value"
                                                            className="scene-field-form-value"
                                                            value={headersDefault[0][1]}
                                                            onChange={e => {
                                                                let headersCopy = [...headersDefault];
                                                                headersCopy[0][1] = e.target.value;
                                                                setHeadersDefault(headersCopy);
                                                            }}
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
                                                            id="form.submitFormRequest.headers.key"
                                                            className="scene-field-form-key"
                                                            value={headersSubmit[0][0]}
                                                            onChange={e => {
                                                                let headersCopy = [...headersSubmit];
                                                                headersCopy[0][0] = e.target.value;
                                                                setHeadersSubmit(headersCopy);
                                                            }}
                                                        />
                                                        <InputText
                                                            id="form.submitFormRequest.headers.value"
                                                            className="scene-field-form-value"
                                                            value={headersSubmit[0][1]}
                                                            onChange={e => {
                                                                let headersCopy = [...headersSubmit];
                                                                headersCopy[0][1] = e.target.value;
                                                                setHeadersSubmit(headersCopy);
                                                            }}
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
                                        {(values.form.inputs?.inputType === "INTEGER" ||
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
                                        )}
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

export default ActuationViewForm;
