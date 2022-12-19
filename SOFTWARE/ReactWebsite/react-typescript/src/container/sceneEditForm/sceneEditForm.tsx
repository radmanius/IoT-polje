import { useNavigate, useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { IScene } from "models/scenes";
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

interface ILocationState {
    scene: IScene;
}

const SceneEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scene, setScene] = useState<IScene>((location.state as ILocationState)?.scene as IScene);

    const [tags, setTags] = useState<any>([]);
    const [keys, setKeys] = useState<any>([]);
    
    const multiselectRefTags = useRef<any>();
    const multiselectRefRoles = useRef<any>();
    const multiselectRefKeys = useRef<any>();

    const getTags = async () => {
        try {
            const response = await getAllTags();
            setTags(response);
        } catch (error) {
            console.log(error);
        }
    };

    const getKeys = async () => {
        try {
            const response = await getAllKeys();
            setKeys(response);
        }catch (error) {
            console.log(error);
        }
    };

    const navigateToPreviousPage = async () => {
        try {
            const res = await getAllScenes();
            navigate(PAGE_ROUTES.SpecificSceneView, {
                state: {
                    shortScene: res?.find(x => x.id === scene.id),
                },
            }); //vrati se nazad na scenu koju si editirao
        } catch (error) {
            //toast message
            console.log("error");
            navigate(PAGE_ROUTES.ShortSceneView);
        }
    };

    const handleEditScene = async (data: IScene) => {
        try {

            data.tags = multiselectRefTags.current.getSelectedItems().map((item: any) => item.name);
            data.roles = multiselectRefRoles.current.getSelectedItems().map((item: any) => item.name);
            data.keys = multiselectRefKeys.current.getSelectedItems().map((item: any) => item.name);

            data.layout = data.layout.name;
            data.views.map(view => {
                delete view.id;

                if (view.selectForm) {
                    if (view.selectForm.submitSelectionRequest) {
                        delete view.selectForm.submitSelectionRequest.id;
                    } else {
                        view.selectForm.submitSelectionRequest = {};
                    }
                } else if (view.form) {
                    if (view.form.submitFormRequest) {
                        delete view.form.submitFormRequest.id;
                    } else {
                        view.form.submitFormRequest = {};
                    }
                }
            });
            await editScene(data);
        } catch (error) {
            console.log(error);
        } finally {
            await navigateToPreviousPage();
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
                layout: {...scene.layout, name: e.target.value},
            });
        }
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        await handleEditScene(scene);
    };

    const handleOdustani = async (e: any) => {
        if (location.state.from) {
            navigate(location.state.from);
        }
        else {
            await navigateToPreviousPage();
        }
    };

    useEffect(() => {
        getTags();
        getKeys();
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
                                                    <InputText
                                                        id="layout"
                                                        className="scene-field-form"
                                                        {...input}
                                                        value={scene.layout.name}
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
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
                                                        displayValue="name"
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
                                                        options={roleTypeOptions}
                                                        displayValue="name"
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
                                                        displayValue="name"
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
