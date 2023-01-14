import { IScene } from "models/scenes";
import { ActuationView, initActuationView, viewMethodOptions } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editScene, testScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { Dropdown } from "primereact/dropdown";

import "./actuationViewForm.scss";
import { IInput, viewInputsOptions } from "models/viewsInterfaces/inputs";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import Popup from "container/testViewPopup/testViewPopup";

interface ILocationState {
    shortScene: IScene;
}

const ActuationViewForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    let scene = (location.state as ILocationState)?.shortScene as IScene;

    const [headersDefault, setHeadersDefault] = useState<Array<Array<string>>>([["Authorization", ""], ["Content-Type", ""]]);
    const [headersSubmit, setHeadersSubmit] = useState<Array<Array<string>>>([["Authorization", ""], ["Content-Type", ""]]);

    const [popup, setPopup] = useState<Boolean>(false);
    const [option, setOption] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [spremnaScena, setSpremnaScena] = useState<IScene>(scene);

    const [inputsNumber, setInputsNumber] = useState<IInput[]>([{ inputType: "BOOLEAN" }]);

    const assembleViews = (data: ActuationView) => {
        let newData = { ...data };

        let listaInputa: IInput[] = [];

        inputsNumber.forEach((input, index) => {
            switch (input.inputType) {
                case "BOOLEAN": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue,
                        inputType: "BOOLEAN",
                    });
                    break;
                }
                case "INTEGER": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue ?? -1,
                        min: input.min,
                        max: input.max,
                        inputType: "INTEGER",
                    });
                    break;
                }
                case "DECIMAL": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue ?? -1,
                        min: input.min,
                        max: input.max,
                        inputType: "DECIMAL",
                    });
                    break;
                }
                case "DATE": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue ?? "",
                        inputType: "DATE",
                    });
                    break;
                }
                case "TIME": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue ?? "",
                        inputType: "TIME",
                    });
                    break;
                }
                case "STRING": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        description: input.description,
                        defaultValue: input.defaultValue ?? false,
                        pattern: input.pattern,
                        inputType: "STRING",
                    });
                    break;
                }
                case "SUBMIT": {
                    listaInputa.push({
                        name: input.name ?? "",
                        title: input.title ?? "",
                        inputType: "SUBMIT",
                    });
                    break;
                }
            }
        });
        newData = {
            ...data,
            form: {
                ...data.form,
                inputs: listaInputa,
            },
        };

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
        return views;
    };


    const handleAddNewActuationView = async (data: ActuationView) => {

        const assembledViews = assembleViews(data);
        setSpremnaScena({ ...scene, views: assembledViews })

        try {
            const response = await testScene({ ...scene, views: assembledViews }, keycloak.token ?? "");
            if (response.status !== 200) {
                setOption("submit");
                setMessage("Error while testing actuation view.");
                setPopup(true);
                dispatch(showToastMessage("Error while testing actuation view.", "error"));
                return;
            }
        } catch (error:any) {
            setOption("submit");
            setMessage(error.message??error.stack);
            setPopup(true);
            dispatch(showToastMessage("Scene is not valid.", "error"));
            return;
        }

        try {
            await editScene({ ...scene, views: assembledViews }, keycloak.token ?? "");
            dispatch(showToastMessage("Actuation view successfully created", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Error while adding new actuation view.", "error"));
        }
    };

    const addNewActuationView = async () => {
        try {
            await editScene(spremnaScena, keycloak.token ?? "");
            dispatch(showToastMessage("Actuation view successfully created", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Error while adding new actuation view.", "error"));
        }
    };

    const handleTest = async (data: ActuationView) => {
        let assembledViews = assembleViews(data);
        try {
            const response = await testScene({ ...scene, views: assembledViews }, keycloak.token ?? "");
            if (response.status !== 200) {
                setOption("submit");
                setMessage("Error while testing actuation view.");
                setPopup(true);
                dispatch(showToastMessage("Error while testing actuation view.", "error"));
                return;
            } else {
                dispatch(showToastMessage("Scene is valid", "success"));
            }

        } catch (error:any) {
            setPopup(true);
            setOption("test");
            setMessage(error.message??error.stack);
            dispatch(showToastMessage("Scene is not valid.", "error"));
        }
    };

    return (
        <>
            <Popup
                trigger={popup}
                setTrigger={setPopup}
                option={option}
                message={message}
                submit={addNewActuationView}
            />
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
                                        <Field
                                            name="description"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p>Opis:</p>
                                                    </span>
                                                    <span>
                                                        <InputTextarea
                                                            id="description"
                                                            rows={3}
                                                            className="scene-field-form"
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
                                                        <InputTextarea
                                                            rows={6}
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
                                            name="form.submitFormRequest.headers"
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
                                                        <InputTextarea
                                                            rows={6}
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
                                    <p className="inputs">
                                        Inputs
                                        <Button
                                        icon="fa fa-plus"
                                        className="p-button-success"
                                        onClick={e => {
                                            e.preventDefault();
                                            let inputsNumberCopy = [...inputsNumber];
                                            inputsNumberCopy.push({ inputType: "BOOLEAN" });
                                            setInputsNumber(inputsNumberCopy);
                                            }
                                        }
                                        />
                                    </p>
                                    {inputsNumber.map((input, index) => (
                                        <div className="actuation-view-form-container-inputs multiple">
                                            <Button
                                                icon="fa-sharp fa-solid fa-xmark"
                                                className="p-button-danger small-button deleteInput"
                                                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                                                onClick={e => {
                                                    e.preventDefault();
                                                    let inputsNumberCopy = [...inputsNumber];
                                                    inputsNumberCopy.splice(index, 1);
                                                    setInputsNumber(inputsNumberCopy);
                                                }}
                                            />
                                            <Field
                                                name={"form.inputs[" + index + "].name"}
                                                render={({ }) => (
                                                    <div>
                                                        <span>
                                                            <p>Input name:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                id="form.inputs.name"
                                                                className="scene-field-form"
                                                                value={input.name}
                                                                onChange={e => {
                                                                    setInputsNumber([
                                                                        ...inputsNumber.slice(0, index),
                                                                        {
                                                                            ...inputsNumber[index],
                                                                            name: e.target.value
                                                                        },
                                                                        ...inputsNumber.slice(index + 1)
                                                                    ])
                                                                }}
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                            <Field
                                                name={"form.inputs[" + index + "].title"}
                                                render={({ }) => (
                                                    <div>
                                                        <span>
                                                            <p>Input title:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                id="form.inputs.title"
                                                                className="scene-field-form"
                                                                value={input.title}
                                                                onChange={e => {
                                                                    setInputsNumber([
                                                                        ...inputsNumber.slice(0, index),
                                                                        {
                                                                            ...inputsNumber[index],
                                                                            title: e.target.value
                                                                        },
                                                                        ...inputsNumber.slice(index + 1)
                                                                    ])
                                                                }}
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                            <Field
                                                name={"form.inputs[" + index + "].inputType"}
                                                render={({ }) => (
                                                    <div>
                                                        <span>
                                                            <p>Input type:</p>
                                                        </span>
                                                        <span>
                                                            <Dropdown
                                                                value={input.inputType}
                                                                onChange={e => {
                                                                    setInputsNumber([
                                                                        ...inputsNumber.slice(0, index),
                                                                        {
                                                                            ...inputsNumber[index],
                                                                            inputType: e.target.value
                                                                        },
                                                                        ...inputsNumber.slice(index + 1)
                                                                    ])
                                                                }}
                                                                className="scene-field-form dropdown-design"
                                                                options={viewInputsOptions}
                                                                optionLabel="text"
                                                                optionValue="value"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                            {input.inputType !== "SUBMIT" && (
                                                <Field
                                                    name={"form.inputs[" + index + "].description"}
                                                    render={({ }) => (
                                                        <div>
                                                            <span>
                                                                <p>Description:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    value={input.description}
                                                                    onChange={e => {
                                                                        setInputsNumber([
                                                                            ...inputsNumber.slice(0, index),
                                                                            {
                                                                                ...inputsNumber[index],
                                                                                description: e.target.value
                                                                            },
                                                                            ...inputsNumber.slice(index + 1)
                                                                        ])
                                                                    }}
                                                                    id="form.inputs.description"
                                                                    className="scene-field-form"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                            {input.inputType !== "SUBMIT" && (
                                                <Field
                                                    name={"form.inputs[" + index + "].defaultValue"}
                                                    render={({ }) => (
                                                        <div>
                                                            <span>
                                                                <p>Default value:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    value={input.defaultValue?.toString()}
                                                                    onChange={e => {
                                                                        setInputsNumber([
                                                                            ...inputsNumber.slice(0, index),
                                                                            {
                                                                                ...inputsNumber[index],
                                                                                defaultValue: e.target.value
                                                                            },
                                                                            ...inputsNumber.slice(index + 1)
                                                                        ])
                                                                    }}
                                                                    id="form.inputs.defaultValue"
                                                                    className="scene-field-form"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                            {input.inputType === "STRING" && (
                                                <Field
                                                    name={"form.inputs[" + index + "].pattern"}
                                                    render={({ }) => (
                                                        <div>
                                                            <span>
                                                                <p>Pattern:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    value={input.pattern}
                                                                    onChange={e => {
                                                                        setInputsNumber([
                                                                            ...inputsNumber.slice(0, index),
                                                                            {
                                                                                ...inputsNumber[index],
                                                                                pattern: e.target.value
                                                                            },
                                                                            ...inputsNumber.slice(index + 1)
                                                                        ])
                                                                    }}
                                                                    id="form.inputs.pattern"
                                                                    className="scene-field-form"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            )}
                                            {(input.inputType === "INTEGER" ||
                                                input.inputType === "DECIMAL") && (
                                                    <>
                                                        <Field
                                                            name={"form.inputs[" + index + "].min"}
                                                            render={({ }) => (
                                                                <div>
                                                                    <span>
                                                                        <p>Minimum:</p>
                                                                    </span>
                                                                    <span>
                                                                        <InputText
                                                                            value={input.min}
                                                                            onChange={e => {
                                                                                setInputsNumber([
                                                                                    ...inputsNumber.slice(0, index),
                                                                                    {
                                                                                        ...inputsNumber[index],
                                                                                        min: e.target.value.replaceAll(',', '.')
                                                                                    },
                                                                                    ...inputsNumber.slice(index + 1)
                                                                                ])
                                                                            }}
                                                                            id="form.inputs.min"
                                                                            className="scene-field-form"
                                                                        />
                                                                    </span>
                                                                </div>
                                                            )}
                                                        />
                                                        <Field
                                                            name={"form.inputs[" + index + "].max"}
                                                            render={({ }) => (
                                                                <div>
                                                                    <span>
                                                                        <p>Maximum:</p>
                                                                    </span>
                                                                    <span>
                                                                        <InputText
                                                                            value={input.max}
                                                                            onChange={e => {
                                                                                setInputsNumber([
                                                                                    ...inputsNumber.slice(0, index),
                                                                                    {
                                                                                        ...inputsNumber[index],
                                                                                        max: e.target.value.replaceAll(',', '.')
                                                                                    },
                                                                                    ...inputsNumber.slice(index + 1)
                                                                                ])
                                                                            }}
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
                                    ))}
                                    <div className="scene-form-buttons">
                                        <Button
                                            label="Dodaj"
                                            icon="pi pi-check"
                                            type="submit"
                                        />
                                        <Button
                                            label="Odustani"
                                            onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(PAGE_ROUTES.SpecificSceneView, {
                                                        state: {
                                                            shortScene: scene,
                                                        },
                                                    })
                                                }
                                            }
                                        />
                                        <Button
                                            label="Test"
                                            icon="pi pi-exclamation-triangle"
                                            type="button"
                                            onClick={e => {
                                                e.preventDefault();
                                                handleTest(values);
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

export default ActuationViewForm;
