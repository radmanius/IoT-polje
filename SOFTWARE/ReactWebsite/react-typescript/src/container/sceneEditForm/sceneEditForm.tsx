import { useNavigate, useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { IScene, sceneLayoutOptions } from "models/scenes";
import "./sceneEditForm.scss";
import { Button } from "primereact/button";
import { editScene } from "utils/axios/scenesApi";
import { PAGE_ROUTES } from "utils/paths";
import { useRef, useState } from "react";
import { getAllScenes } from "utils/axios/scenesApi";
import Multiselect from "multiselect-react-dropdown";
//import { tagsTypeOptions } from "models/tags";
import { roleTypeOptions } from "models/role";
//import { keysTypeOptions } from "models/keys";
import { getAllTags } from "utils/axios/tagsApi";
import { getAllKeys } from "utils/axios/keysApi";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { Dropdown } from "primereact/dropdown";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";

interface ILocationState {
    scene: IScene;
}

const SceneEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [scene, setScene] = useState<IScene>((location.state as ILocationState)?.scene as IScene);

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
            dispatch(showToastMessage("Error while fetching tags.", "error"));
        }
    };

    const getKeys = async () => {
        try {
            const response = await getAllKeys(keycloak.token ?? "");
            setKeys(response.map((key: any) => key.name));
        } catch (error) {
            dispatch(showToastMessage("Error while fetching all keys.", "error"));
        }
    };

    const getRoles = () => {
        setRoles(roleTypeOptions.map((role: any) => role.name));
    };

    const navigateToPreviousPage = async () => {
        try {
            const res = await getAllScenes(keycloak.token ?? "");
            navigate(PAGE_ROUTES.SpecificSceneView, {
                state: {
                    shortScene: res?.find(x => x.id === scene.id),
                },
            });
        } catch (error) {
            dispatch(showToastMessage("Error while fetching all scenes.", "error"));
            navigate(PAGE_ROUTES.ShortSceneView);
        }
    };

    const handleEditScene = async (data: IScene) => {
        try {
            data.tags = multiselectRefTags.current.getSelectedItems();
            data.roles = multiselectRefRoles.current.getSelectedItems();
            data.keys = multiselectRefKeys.current.getSelectedItems();
            if (data.roles.length === 0) {
                dispatch(showToastMessage("Need to select at least one role", "warn"));
            } else {
                data.views.map(view => {
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
                await editScene(data, keycloak.token ?? "");
                dispatch(showToastMessage("Scene successfully edited", "success"));
                await navigateToPreviousPage();
            }
        } catch (error) {
            dispatch(showToastMessage("Unable to edit current scene.", "error"));
        }
    };

    const handleChange = (e: any) => {
        if (e.target.id === "title") {
            setScene({
                ...scene,
                title: e.target.value,
            });
        } else if (e.target.id === "subtitle") {
            setScene({
                ...scene,
                subtitle: e.target.value,
            });
        } else if (e.target.id === "pictureLink") {
            setScene({
                ...scene,
                pictureLink: e.target.value,
            });
        } else if (e.target.id === "layout") {
            setScene({
                ...scene,
                layout: e.target.value,
            });
        }
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        handleEditScene(scene);
    };

    const handleOdustani = async (e: any) => {
        if (location.state.from) {
            navigate(location.state.from);
        } else {
            navigateToPreviousPage();
        }
    };

    useEffect(() => {
        getTags();
        getKeys();
        getRoles();
    }, []);

    return (
        <div className="scene-form-container">
            {scene && (
                <div>
                    <h1>Uredi scenu {scene.id}</h1>
                    <div className="form-fields-container">
                        <Form
                            initialValues={scene}
                            onSubmit={handleClick}
                            render={() => (
                                <form
                                    id="new-scene"
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
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
                                                        value={scene.title}
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
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
                                                        value={scene.subtitle}
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
                                                    <p className="scene-label">Link slike scene: </p>
                                                </span>
                                                <span>
                                                    <InputText
                                                        id="pictureLink"
                                                        className="scene-field-form"
                                                        {...input}
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
                                                        value={scene.pictureLink}
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
                                                        id="layout"
                                                        value={scene.layout}
                                                        onChange={e => handleChange(e)}
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
                                                        selectedValues={scene.tags}
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
                                                        selectedValues={scene.roles}
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
                                                        selectedValues={scene.keys}
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
                                            type="button"
                                            onClick={e => handleClick(e)}
                                        />
                                        <Button
                                            label="Odustani"
                                            type="button"
                                            onClick={e => handleOdustani(e)}
                                        />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SceneEditForm;
