import { IScene } from "models/scenes";
import { MeasurementsView, viewMethodOptions, viewTypeOptions } from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editScene, testScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { Dropdown } from "primereact/dropdown";
import "./measurementViewEditForm.scss";
import { InputSwitch } from "primereact/inputswitch";
import { viewInputsOptions } from "models/viewsInterfaces/inputs";
import keycloak from "keycloak";
import { showToastMessage } from "redux/actions/toastMessageActions";
import { useDispatch } from "react-redux";
import { InputTextarea } from 'primereact/inputtextarea';
import Popup from "container/testViewPopup/testViewPopup";

interface ILocationState {
    shortScene: IScene;
    view: MeasurementsView;
}

const MeasurementViewEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const scene = (location.state as ILocationState)?.shortScene as IScene;
    const view = (location.state as ILocationState)?.view as MeasurementsView;
    const [dataFormat, setDataFormat] = useState(view.responseExtracting.dataFormat);
    const [timeColumn, setTimeColumn] = useState(view.responseExtracting.timeColumn ?? "");
    const [valueColumn, setValueColumn] = useState(view.responseExtracting.valueColumn ?? "");
    //const [timeJsonPath, setTimeJsonPath] = useState(view.responseExtracting.timeJsonPath??"");
    //const [valueJsonPath, setValueJsonPath] = useState(view.responseExtracting.valueJsonPath??"");

    const [headersQuery, setHeadersQuery] = useState<Array<Array<string>>>([["", ""]]);
    const [headersSubmit, setHeadersSubmit] = useState<Array<Array<string>>>([["", ""]]);

    const [popup, setPopup] = useState<Boolean>(false);
    const [option, setOption] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [spremnaScena, setSpremnaScena] = useState<IScene>(scene);

    const fillHeadersQuery = () => {
        let newHeadersQuery = view.query.headers;
        let headersArray: any = [];
        if (newHeadersQuery) {
            headersArray = Object.entries(newHeadersQuery);
        }
        if (headersArray.length === 0) {
            headersArray = [["", ""]];
        }
        setHeadersQuery(headersArray);
    };

    const fillHeadersSubmit = () => {
        let newHeadersSubmit = view?.selectForm?.submitSelectionRequest?.headers;
        let headersArray: any = [];
        if (newHeadersSubmit) {
            headersArray = Object.entries(newHeadersSubmit);
        }
        if (headersArray.length === 0) {
            headersArray = [["", ""]];
        }
        setHeadersSubmit(headersArray);
    };

    const assembleViews = (data: MeasurementsView) => {
        let newData = { ...data };
        if (dataFormat === "csv") {
            newData = {
                ...newData,
                responseExtracting: { dataFormat: dataFormat, timeColumn: timeColumn, valueColumn: valueColumn },
            };
        } else if (dataFormat === "json") {
            newData = {
                ...newData,
                responseExtracting: {
                    dataFormat: dataFormat,
                    //timeJsonPath: timeJsonPath,
                    //valueJsonPath: valueJsonPath,
                    timeColumn: timeColumn,
                    valueColumn: valueColumn,
                },
            };
        }
        data = newData;
        switch (data.selectForm.inputs?.inputType) {
            case "BOOLEAN": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue,
                            inputType: "BOOLEAN",
                        },
                    },
                };
                break;
            }
            case "INTEGER": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue ?? -1,
                            min: data.selectForm.inputs.min,
                            max: data.selectForm.inputs.max,
                            inputType: "INTEGER",
                        },
                    },
                };
                break;
            }
            case "DECIMAL": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue ?? -1,
                            min: data.selectForm.inputs.min,
                            max: data.selectForm.inputs.max,
                            inputType: "DECIMAL",
                        },
                    },
                };
                break;
            }
            case "DATE": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue ?? "",
                            inputType: "DATE",
                        },
                    },
                };
                break;
            }
            case "TIME": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue ?? "",
                            inputType: "TIME",
                        },
                    },
                };
                break;
            }
            case "STRING": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
                            description: data.selectForm.inputs.description,
                            defaultValue: data.selectForm.inputs.defaultValue ?? false,
                            pattern: data.selectForm.inputs.pattern,
                            inputType: "STRING",
                        },
                    },
                };
                break;
            }
            case "SUBMIT": {
                newData = {
                    ...data,
                    selectForm: {
                        ...data.selectForm,
                        inputs: {
                            name: data.selectForm.inputs.name ?? "",
                            title: data.selectForm.inputs.title ?? "",
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

        let headersQueryMap = {} as { [key: string]: string };

        headersQuery.forEach(pair => {
            if (pair[0] !== "") headersQueryMap[pair[0]] = pair[1];
        });

        newData = {
            ...newData,
            selectForm: {
                ...newData.selectForm,
                submitSelectionRequest: {
                    ...newData.selectForm.submitSelectionRequest,
                    headers: headersSubmitMap,
                },
            },
            query: {
                ...newData.query,
                headers: headersQueryMap,
            },
        };

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
        return views;
    };

    const handleAddNewMeasurementView = async (data: MeasurementsView) => {
        const assembledViews = assembleViews(data);
        setSpremnaScena({ ...scene, views: assembledViews })
        try {
            await testScene(spremnaScena, keycloak.token ?? "");
        } catch (error) {
            console.log(error);
            setOption("submit");
            setMessage("Scene is not valid.");
            setPopup(true);
            dispatch(showToastMessage("Scene is not valid.", "error"));
            return;
        }

        try {
            await editScene({ ...scene, views: assembledViews }, keycloak.token ?? "");
            dispatch(showToastMessage("Measurement view successfully edited", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Unable to edit current measurement view.", "error"));
        }
    };

    const addNewMeasurementView = async () => {
        try {
            await editScene(spremnaScena, keycloak.token ?? "");
            dispatch(showToastMessage("Measurement view successfully edited", "success"));
            navigate(-1);
        } catch (error) {
            dispatch(showToastMessage("Unable to edit current measurement view.", "error"));
        }
    };

    const handleTest = async (data: MeasurementsView) => {
        let assembledViews = assembleViews(data);
        try {
            await testScene({ ...scene, views: assembledViews }, keycloak.token ?? "");
            dispatch(showToastMessage("Scene is valid", "success"));
        } catch (error) {
            setPopup(true);
            setOption("test");
            setMessage("Scene is not valid.");
            
            dispatch(showToastMessage("Scene is not valid.", "error"));
        }
    };

    useEffect(() => {
        fillHeadersQuery();
        fillHeadersSubmit();
    }, []);

    return (
        <>
            <Popup
                trigger={popup}
                setTrigger={setPopup}
                option={option}
                message={message}
                submit={addNewMeasurementView}
            />
            <Button
                label="Natrag"
                className="measurement-view-back-button"
                onClick={() =>
                    navigate(PAGE_ROUTES.SpecificSceneView, {
                        state: {
                            shortScene: scene,
                        },
                    })
                }
            />

            <div className="measurement-view-form-container">
                <div>
                    <h3>Measurement view form for: {scene.title}</h3>
                    <div className="form-fields-container">
                        <Form
                            onSubmit={(data: MeasurementsView) => handleAddNewMeasurementView(data)}
                            initialValues={view}
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
                                                        <Dropdown
                                                            {...input}
                                                            className="scene-field-form dropdown-design"
                                                            options={viewTypeOptions}
                                                            optionLabel="text"
                                                            optionValue="value"
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
                                            name="selectForm.submitSelectionRequest.headers.{{accessToken}} {{token1}}"
                                            render={({ input }) => (
                                                <div>
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
                                                    <div>
                                                        {headersSubmit.map((header, index) => (
                                                            <span className="headerRow">
                                                                <InputText
                                                                    id="selectForm.submitSelectionRequest.headers.key"
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
                                                                    id="selectForm.submitSelectionRequest.headers.value"
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
                                            name="selectForm.submitSelectionRequest.payload"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p className="payload">Payload:</p>
                                                    </span>
                                                    <span>
                                                        <InputTextarea
                                                            rows={6}
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
                                                        <p>Input name:</p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="selectForm.inputs.name"
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
                                                        <p>Input title:</p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="selectForm.inputs.title"
                                                            className="scene-field-form"
                                                            {...input}
                                                        />
                                                    </span>
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="selectForm.inputs.inputType"
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
                                        {values.selectForm.inputs?.inputType !== "SUBMIT" && (
                                            <Field
                                                name="selectForm.inputs.description"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Description:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="selectForm.inputs.description"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {values.selectForm.inputs?.inputType !== "SUBMIT" && (
                                            <Field
                                                name="selectForm.inputs.defaultValue"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Default value:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="selectForm.inputs.defaultValue"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {values.selectForm.inputs?.inputType === "STRING" && (
                                            <Field
                                                name="selectForm.inputs.pattern"
                                                render={({ input }) => (
                                                    <div>
                                                        <span>
                                                            <p>Pattern:</p>
                                                        </span>
                                                        <span>
                                                            <InputText
                                                                {...input}
                                                                id="selectForm.inputs.pattern"
                                                                className="scene-field-form"
                                                            />
                                                        </span>
                                                    </div>
                                                )}
                                            />
                                        )}
                                        {(values.selectForm.inputs?.inputType === "INTEGER" ||
                                            values.selectForm.inputs?.inputType === "DECIMAL") && (
                                            <>
                                                <Field
                                                    name="selectForm.inputs.min"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Minimum:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    {...input}
                                                                    id="selectForm.inputs.min"
                                                                    className="scene-field-form"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                                <Field
                                                    name="selectForm.inputs.max"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Maximum:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    {...input}
                                                                    id="selectForm.inputs.max"
                                                                    className="scene-field-form"
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            </>
                                        )}
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
                                            name="query.headers.{{accessToken}} {{token1}}"
                                            render={({ input }) => (
                                                <div>
                                                    <p className="headers">
                                                        Headers:
                                                        <Button
                                                            icon="fa fa-plus"
                                                            className="p-button-success"
                                                            onClick={e => {
                                                                e.preventDefault();
                                                                let headersQueryCopy = [...headersQuery];
                                                                headersQueryCopy.push(["", ""]);
                                                                setHeadersQuery(headersQueryCopy);
                                                            }}
                                                        />
                                                    </p>
                                                    <div>
                                                        {headersQuery.map((header, index) => (
                                                            <span className="headerRow">
                                                                <InputText
                                                                    id="selectForm.query.headers.key"
                                                                    placeholder="Key"
                                                                    className="scene-field-form-key"
                                                                    value={headersQuery[index][0]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersQuery];
                                                                        headersCopy[index][0] = e.target.value;
                                                                        setHeadersQuery(headersCopy);
                                                                    }}
                                                                />
                                                                <InputText
                                                                    id="selectForm.query.headers.value"
                                                                    placeholder="Value"
                                                                    className="scene-field-form-value"
                                                                    value={headersQuery[index][1]}
                                                                    onChange={e => {
                                                                        let headersCopy = [...headersQuery];
                                                                        headersCopy[index][1] = e.target.value;
                                                                        setHeadersQuery(headersCopy);
                                                                    }}
                                                                />
                                                                <Button
                                                                    icon="fa-sharp fa-solid fa-xmark"
                                                                    className="p-button-danger small-button"
                                                                    //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                                                                    onClick={e => {
                                                                        e.preventDefault();
                                                                        let headersQueryCopy = [...headersQuery];
                                                                        headersQueryCopy.splice(index, 1);
                                                                        setHeadersQuery(headersQueryCopy);
                                                                    }}
                                                                />
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        <Field
                                            name="query.payload"
                                            render={({ input }) => (
                                                <div>
                                                    <span>
                                                        <p className="payload">Payload:</p>
                                                    </span>
                                                    <span>
                                                        <InputTextarea
                                                            rows={6}
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
                                            render={() => (
                                                <div>
                                                    <span>
                                                        <p>Data format:</p>
                                                    </span>
                                                    <div className="data-format-switch-options">
                                                        <div>
                                                            <span>csv</span>
                                                            <span>
                                                                <InputSwitch
                                                                    checked={dataFormat === "json"}
                                                                    onChange={() => {
                                                                        dataFormat === "csv"
                                                                            ? setDataFormat("json")
                                                                            : setDataFormat("csv");
                                                                    }}
                                                                />
                                                            </span>
                                                            <span>json</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        />
                                        {dataFormat === "json" && (
                                            <>
                                                <Field
                                                    //name="responseExtracting.timeJsonPath"
                                                    name="responseExtracting.timeColumn"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Time json path:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    //id="responseExtracting.timeJsonPath"
                                                                    id="responseExtracting.timeColumn"
                                                                    className="scene-field-form"
                                                                    //value = {timeJsonPath}
                                                                    //onChange={e => setTimeJsonPath(e.target.value)}
                                                                    value={timeColumn}
                                                                    onChange={e => setTimeColumn(e.target.value)}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                                <Field
                                                    //name="responseExtracting.valueJsonPath"
                                                    name="responseExtracting.valueColumn"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Value json path:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    //id="responseExtracting.valueJsonPath"
                                                                    id="responseExtracting.valueColumn"
                                                                    className="scene-field-form"
                                                                    //value = {valueJsonPath}
                                                                    //onChange={e => setValueJsonPath(e.target.value)}
                                                                    value={valueColumn}
                                                                    onChange={e => setValueColumn(e.target.value)}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                            </>
                                        )}

                                        {dataFormat === "csv" && (
                                            <>
                                                <Field
                                                    name="responseExtracting.timeColumn"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Time column:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    id="responseExtracting.timeColumn"
                                                                    className="scene-field-form"
                                                                    value={timeColumn}
                                                                    onChange={e => setTimeColumn(e.target.value)}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                                <Field
                                                    name="responseExtracting.valueColumn"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Value column:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    id="responseExtracting.valueColumn"
                                                                    className="scene-field-form"
                                                                    value={valueColumn}
                                                                    onChange={e => setValueColumn(e.target.value)}
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

export default MeasurementViewEditForm;
