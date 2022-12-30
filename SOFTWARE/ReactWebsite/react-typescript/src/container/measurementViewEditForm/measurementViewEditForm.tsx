import { IScene } from "models/scenes";
import {
    MeasurementsView,
    viewMethodOptions,
    viewTypeOptions,
} from "models/viewsInterfaces/views";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useLocation, useNavigate } from "react-router-dom";
import { editScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { Dropdown } from "primereact/dropdown";
import "./measurementViewEditForm.scss";
import { InputSwitch } from "primereact/inputswitch";
import { viewInputsOptions } from "models/viewsInterfaces/inputs";
import keycloak from "keycloak";

interface ILocationState {
    shortScene: IScene;
    view: MeasurementsView;
}

const MeasurementViewEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scene = (location.state as ILocationState)?.shortScene as IScene;
    const view = (location.state as ILocationState)?.view as MeasurementsView;
    console.log(view);
    const [dataFormat, setDataFormat] = useState("csv");
    const [timeColumn, setTimeColumn] = useState("");
    const [valueColumn, setValueColumn] = useState("");
    const [timeJsonPath, setTimeJsonPath] = useState("");
    const [valueJsonPath, setValueJsonPath] = useState("");

    const handleAddNewMeasurementView = async (data: MeasurementsView) => {
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
                    timeJsonPath: timeJsonPath,
                    valueJsonPath: valueJsonPath,
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
        let views = [...scene.views];
        const index = views.indexOf(view);
        views.splice(index, 1, newData);
        //views.push(newData);
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
            console.log(newData);
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
                                                    <span>
                                                        <p>Headers:</p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="selectForm.submitSelectionRequest.headers.{{accessToken}} {{token1}}"
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
                                        {((values.selectForm.inputs?.inputType === "INTEGER" ||
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
                                            ))}
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
                                                    <span>
                                                        <p>Headers:</p>
                                                    </span>
                                                    <span>
                                                        <InputText
                                                            id="query.headers.{{accessToken}} {{token1}}"
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
                                            name="responseExtracting.timeJsonPath"
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
                                                    name="responseExtracting.timeJsonPath"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Time json path:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    id="responseExtracting.timeJsonPath"
                                                                    className="scene-field-form"
                                                                    onChange={e => setTimeJsonPath(e.target.value)}
                                                                />
                                                            </span>
                                                        </div>
                                                    )}
                                                />
                                                <Field
                                                    name="responseExtracting.valueJsonPath"
                                                    render={({ input }) => (
                                                        <div>
                                                            <span>
                                                                <p>Value json path:</p>
                                                            </span>
                                                            <span>
                                                                <InputText
                                                                    id="responseExtracting.valueJsonPath"
                                                                    className="scene-field-form"
                                                                    onChange={e => setValueJsonPath(e.target.value)}
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
                                                                    className="scene-field-form"
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

export default MeasurementViewEditForm;
