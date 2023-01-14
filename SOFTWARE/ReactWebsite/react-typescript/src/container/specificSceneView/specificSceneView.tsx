import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./specificSceneView.scss";
import { useCallback, useEffect, useState } from "react";
import { IScene, IShortScene } from "models/scenes";
import { PAGE_ROUTES } from "utils/paths";
import { getSceneById } from "utils/axios/scenesApi";
import Popup from "./deletePopup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ActuationView, IView, MeasurementsView } from "models/viewsInterfaces/views";
import { useKeycloak } from "@react-keycloak/web";
import PopupView from "./deleteViewPopup";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";

interface ILocationState {
    shortScene: IScene;
}

const SpecificSceneView = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const shortScene = (location.state as ILocationState)?.shortScene as IShortScene;
    const [scene, setScene] = useState<IScene>();
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const [popup, setPopup] = useState<Boolean>(false);
    const [popupView, setPopupView] = useState<Boolean>(false);
    const [deleteView, setDeleteView] = useState<IView>();
    const [searchInput, setSearchInput] = useState("");

    const fetchScene = useCallback(async () => {
        try {
            const res = await getSceneById(shortScene.id, keycloak.token ?? "");
            setScene(res);
        } catch (error) {
            dispatch(showToastMessage("Error while fetching specific scene.", "error"));
        }
    }, []);

    function handleClickEdit() {
        navigate(PAGE_ROUTES.EditScene, { state: { scene } });
    }

    async function handleClickDelete() {
        setPopup(true);
        // try {
        //     await deleteScene(shortScene.id);
        //     navigate(PAGE_ROUTES.ShortSceneView);
        // }
        // catch {
        //     console.log("Error");
        // }
    }

    useEffect(() => {
        fetchScene();
    }, [fetchScene]);

    const actionColumnEdit = (rowData: any) => {
        return (
            <Button
                icon="fa fa-pen-to-square"
                className="p-button-outlined"
                onClick={() => {
                    if (rowData.viewType === "actuation") {
                        navigate(PAGE_ROUTES.EditActuationView, {
                            state: {
                                shortScene: scene,
                                view: rowData as ActuationView,
                            },
                        });
                    } else {
                        navigate(PAGE_ROUTES.EditMeasurementView, {
                            state: {
                                shortScene: scene,
                                view: rowData as MeasurementsView,
                            },
                        });
                    }
                }}
            />
        );
    };

    const actionColumnDelete = (rowData: IView) => {
        return (
            <Button
                icon="fa fa-trash"
                className="p-button-danger p-button-outlined"
                onClick={() => {
                    setDeleteView(rowData);
                    setPopupView(true);
                }}
            />
        );
    };

    const viewFilter = (view: IView) => {
        if (view.title.toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
        }
        return false;
    };

    return (
        <div className="scene-page">
            {scene && (
                <div>
                    <div className="specific-scene-buttons-top">
                        <div className="align-left-button">
                            <Button
                                onClick={() => navigate(PAGE_ROUTES.ShortSceneView)}
                                label={"Natrag na prikaz kratkih scena"}
                            />
                        </div>
                        <div className="edit-and-delete-scene-btn">
                            <Button
                                className="edit-button"
                                onClick={handleClickEdit}
                                label={"Uredi scenu"}
                            />
                            <Button
                                className="delete-button"
                                onClick={handleClickDelete}
                                label={"Obriši scenu"}
                            />
                        </div>
                    </div>
                    <Popup
                        trigger={popup}
                        setTrigger={setPopup}
                        id={shortScene.id}
                    />
                    <PopupView
                        trigger={popupView}
                        setTrigger={setPopupView}
                        view={deleteView}
                        scene={scene}
                        fetchScene={fetchScene}
                    />
                    <h1>{scene.title}</h1>
                    <h3>{scene.subtitle}</h3>
                    <img
                        src={scene.pictureLink}
                        className="iot-img"
                        alt="iot slika"
                    />
                </div>
            )}
            <div className="view-form-create-buttons">
                <Button
                    label="Add actuation view"
                    onClick={() =>
                        navigate(PAGE_ROUTES.AddActuationView, {
                            state: {
                                shortScene: scene,
                            },
                        })
                    }
                />
                <Button
                    label="Add measurement view"
                    onClick={() =>
                        navigate(PAGE_ROUTES.AddMeasurementView, {
                            state: {
                                shortScene: scene,
                            },
                        })
                    }
                />
            </div>
            <div className="scene-view-table">
                <div>
                    <h2>POPIS VIEW-a za pripadnu scenu</h2>
                    <div className="short-scene-search-wrap">
                    <input
                        className="short-scene-searchBar"
                        type="search"
                        placeholder="Pretraži..."
                        onChange={(e: any) => {
                                    e.preventDefault();
                                    setSearchInput(e.target.value);
                                }}
                        value={searchInput}
                    />
            </div>
                    <DataTable
                        resizableColumns
                        showGridlines
                        value={scene?.views.filter(view => viewFilter(view))}
                        emptyMessage={"Trenutno nema rezultata"}
                        responsiveLayout="stack"
                    >
                        <Column
                            key={"title"}
                            field={"title"}
                            header={"Naslov"}
                            sortable={true}
                        />
                        <Column
                            key={"viewType"}
                            field={"viewType"}
                            header={"Tip"}
                            sortable={true}
                        />
                        <Column
                            key={"Edit"}
                            field={"id"}
                            header={"Uredi"}
                            body={actionColumnEdit}
                        />
                        <Column
                            key={"delete"}
                            field={"id"}
                            header={"Obriši"}
                            body={actionColumnDelete}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default SpecificSceneView;
