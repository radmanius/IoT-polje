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
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";
import { useEffect, useState } from "react";

interface ILocationState {
    shortScene: IScene;
    view: ActuationView;
}

const ActuationViewEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    let scene = (location.state as ILocationState)?.shortScene as IScene;
    let view = (location.state as ILocationState)?.view as ActuationView;

    const [headersDefault, setHeadersDefault] = useState<Array<Array<string>>>([["", ""]]);
    const [headersSubmit, setHeadersSubmit] = useState<Array<Array<string>>>([["", ""]]);

    const fillHeadersDefault = () => {
        let newHeadersDefault = view?.form?.defaultValuesRequest?.headers;
        let headersArray: any = [];
        if (newHeadersDefault) {
            headersArray = Object.entries(newHeadersDefault);
        }
        if (headersArray.length === 0) {
            headersArray = [["", ""]];
        }
        setHeadersDefault(headersArray);
    };

    const fillHeadersSubmit = () => {
        let newHeadersSubmit = view?.form?.submitFormRequest?.headers;
        let headersArray: any = [];
        if (newHeadersSubmit) {
            headersArray = Object.entries(newHeadersSubmit);
        }
        if (headersArray.length === 0) {
            headersArray = [["", ""]];
        }
        setHeadersSubmit(headersArray);
    };

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

        let headersSubmitMap = {} as { [key: string]: string };
        headersSubmit.forEach(pair => {
            if (pair[0] !== "") headersSubmitMap[pair[0]] = pair[1];
        });

        let headersDefaultMap = {} as { [key: string]: string };

        headersDefault.forEach(pair => {
            if (pair[0] !== "") headersDefaultMap[pair[0]] = pair[1];
        });

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
        const index = views.indexOf(view);
        views.splice(index, 1, newData);
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
            dispatch(showToastMessage("Actuation view successfully edited", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Unable to edit current actuation view.", "error"));
        }
    };

    useEffect(() => {
        fillHeadersDefault();
        fillHeadersSubmit();
    }, []);

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
                                                            disabled
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
                                            name="form.defaultValuesRequest.headers"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p className="headers">
                                                            Headers:
                                                            <Button
                                                                icon="fa fa-plus"
                                                                className="p-button-success"
                                                                //tooltip={"Obriši"}
                                                                onClick={e => {
                                                                    e.preventDefault();
                                                                    let headersDefaultCopy = [...headersDefault];
                                                                    headersDefaultCopy.push(["", ""]);
                                                                    setHeadersDefault(headersDefaultCopy);
                                                                }}
                                                            />
                                                        </p>
                                                    </span>
                                                    <div>
                                                        {headersDefault.map((header, index) => (
                                                            <span className="headerRow">
                                                                <InputText
                                                                    id="form.defaultValuesRequest.headers.key"
                                                                    placeholder="Key"
                                                                    className="scene-field-form-key"
                                                                    value={headersDefault[index][0]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersDefault];
                                                                        headersCopy[index][0] = e.target.value;
                                                                        setHeadersDefault(headersCopy);
                                                                    }}
                                                                />
                                                                <InputText
                                                                    id="form.defaultValuesRequest.headers.value"
                                                                    placeholder="Value"
                                                                    className="scene-field-form-value"
                                                                    value={headersDefault[index][1]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersDefault];
                                                                        headersCopy[index][1] = e.target.value;
                                                                        setHeadersDefault(headersCopy);
                                                                    }}
                                                                />
                                                                <Button
                                                                    icon="fa-sharp fa-solid fa-xmark"
                                                                    className="p-button-danger small-button"
                                                                    //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        let headersDefaultCopy = [...headersDefault];
                                                                        headersDefaultCopy.splice(index, 1);
                                                                        setHeadersDefault(headersDefaultCopy);
                                                                    }}
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
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
                                                                    let headersSubmitCopy = [...headersSubmit];
                                                                    headersSubmitCopy.push(["", ""]);
                                                                    setHeadersSubmit(headersSubmitCopy);
                                                                }}
                                                            />
                                                        </p>
                                                    </span>
                                                    <div>
                                                        {headersSubmit.map((header, index) => (
                                                            <span className="headerRow">
                                                                <InputText
                                                                    id="form.submitFormRequest.headers.key"
                                                                    placeholder="Key"
                                                                    className="scene-field-form-key"
                                                                    value={headersSubmit[index][0]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersSubmit];
                                                                        headersCopy[index][0] = e.target.value;
                                                                        setHeadersSubmit(headersCopy);
                                                                    }}
                                                                />
                                                                <InputText
                                                                    id="form.submitFormRequest.headers.value"
                                                                    placeholder="Value"
                                                                    className="scene-field-form-value"
                                                                    value={headersSubmit[index][1]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersSubmit];
                                                                        headersCopy[index][1] = e.target.value;
                                                                        setHeadersSubmit(headersCopy);
                                                                    }}
                                                                />
                                                                <Button
                                                                    icon="fa-sharp fa-solid fa-xmark"
                                                                    className="p-button-danger small-button"
                                                                    //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        let headersSubmitCopy = [...headersSubmit];
                                                                        headersSubmitCopy.splice(index, 1);
                                                                        setHeadersSubmit(headersSubmitCopy);
                                                                    }}
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
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
                                        <Button
                                            label="Test"
                                            icon="pi pi-exclamation-triangle"
                                            onClick={() => {
                                                //test method
                                            }}
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
