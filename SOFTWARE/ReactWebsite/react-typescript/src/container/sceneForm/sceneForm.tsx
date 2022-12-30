import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { initScenes, sceneLayoutOptions } from "models/scenes";
import "./sceneForm.scss";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import { createNewScene } from "utils/axios/scenesApi";
import { Multiselect } from "multiselect-react-dropdown";
//import { tagsTypeOptions } from "models/tags";
import { roleTypeOptions } from "models/role";
//import { keysTypeOptions } from "models/keys";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { getAllTags } from "utils/axios/tagsApi";
import { getAllKeys } from "utils/axios/keysApi";
import { useKeycloak } from "@react-keycloak/web";
import { Dropdown } from "primereact/dropdown";

const SceneForm = () => {
    const navigate = useNavigate();

    const [tags, setTags] = useState<any>([]);
    const [keys, setKeys] = useState<any>([]);
    const [roles, setRoles] = useState<any>([]);

    const multiselectRefTags = useRef<any>();
    const multiselectRefRoles = useRef<any>();
    const multiselectRefKeys = useRef<any>();

    const { keycloak } = useKeycloak();

    const getTags = async () => {
        try {
            const response = await getAllTags(keycloak.token ?? "");
            setTags(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getKeys = async () => {
        try {
            const response = await getAllKeys(keycloak.token ?? "");
            setKeys(response.map((key: any) => key.name));
        }catch (error) {
            console.log(error);
        }
    };

    const getRoles = () => {
        setRoles(roleTypeOptions.map((role: any) => role.name));
    }


    const handleAddNewScene = async (data: any) => {
        data.tags = multiselectRefTags.current.getSelectedItems();
        data.roles = multiselectRefRoles.current.getSelectedItems();
        data.keys = multiselectRefKeys.current.getSelectedItems();
        if (data.roles.length === 0) {
            console.log("Need to select at least one role");
        }else {
            try {
                await createNewScene(data, keycloak.token ?? "");
                navigate(PAGE_ROUTES.ShortSceneView);
            } catch (error) {
                console.log("error while adding new scene");
            }
        }
    };

    useEffect(() => {
        getTags();
        getKeys();
        getRoles();
    }, []);

    return (
        <div className="scene-form-container">
            <div>
                <h1>Dodaj novu scenu</h1>
                <div className="form-fields-container">
                    <Form
                        onSubmit={data => handleAddNewScene(data)}
                        initialValues={initScenes}
                        render={({ handleSubmit }) => (
                            <form
                                id="new-scene"
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
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
                                    name="subtitle"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Podnaslov scene:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="subtitle"
                                                    className="scene-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="pictureLink"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Link slike scene:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="pictureLink"
                                                    className="scene-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="layout"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Layout:</p>
                                            </span>
                                            <span>
                                                <Dropdown
                                                    {...input}
                                                    className="scene-field-form dropdown-design2"
                                                    options={sceneLayoutOptions}
                                                    optionLabel="text"
                                                    optionValue="value"
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="tags"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Tagovi:</p>
                                            </span>
                                            <div className="multiSelectWrapper">
                                                <Multiselect
                                                    id="tags"
                                                    className="scene-field-form"
                                                    showArrow
                                                    options={tags}
                                                    isObject={false}
                                                    ref={multiselectRefTags}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="roles"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Rolovi:</p>
                                            </span>
                                            <div className="multiSelectWrapper">
                                                <Multiselect
                                                    id="roles"
                                                    className="scene-field-form"
                                                    showArrow
                                                    options={roles}
                                                    isObject={false}
                                                    ref={multiselectRefRoles}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="keys"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="scene-label">Keys:</p>
                                            </span>
                                            <div className="multiSelectWrapper">
                                                <Multiselect
                                                    id="keys"
                                                    className="scene-field-form"
                                                    showArrow
                                                    options={keys}
                                                    isObject={false}
                                                    ref={multiselectRefKeys}
                                                />
                                            </div>
                                        </div>
                                    )}
                                />

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
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default SceneForm;
