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

interface ILocationState {
    shortScene: IScene;
}

const SpecificSceneView = () => {
    const location = useLocation();
    const shortScene = (location.state as ILocationState)?.shortScene as IShortScene;
    const [scene, setScene] = useState<IScene>();
    const navigate = useNavigate();

    const [popup, setPopup] = useState<Boolean>(false);

    const fetchScene = useCallback(async () => {
        try {
            const res = await getSceneById(shortScene.id);
            setScene(res);
        } catch (error) {
            console.log("error");
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

    const actionColumnEdit = (rowData: IShortScene) => {
        return (
            <Button
                icon="fa fa-pen-to-square"
                className="p-button-outlined"
                //tooltip={"Uredi"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {}}
            />
        );
    };

    const actionColumnDelete = (rowData: IShortScene) => {
        return (
            <Button
                icon="fa fa-trash"
                className="p-button-danger p-button-outlined"
                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {}}
            />
        );
    };

    console.log(scene);

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
                    <h1>{scene.title}</h1>
                    <h3>{scene.subtitle}</h3>
                    <img
                        src={scene.pictureLink}
                        className="iot-img"
                        alt="iot slika"
                    />
                </div>
            )}
            <div>
                <Button
                    label="Add actuation view"
                    onClick={() =>
                        navigate(PAGE_ROUTES.AddActuationView, {
                            state: {
                                shortScene: scene,
                            },
                        })
                    }
                />{" "}
                <Button
                    label="Add measurement view"
                    onClick={() => navigate(PAGE_ROUTES.AddNewScene)}
                />
            </div>
            <div className="scene-view-table">
                <div>
                    <h2>POPIS VIEW-a za pripadnu scenu</h2>
                    <DataTable
                        resizableColumns
                        showGridlines
                        value={scene?.views}
                        emptyMessage={"Trenutno nema rezultata"}
                        responsiveLayout="stack"
                        onRowClick={rowData => {
                            /*
                        navigate(PAGE_ROUTES.SpecificSceneView, {
                            state: {
                                shortScene: shortScene?.find(x => x.id === rowData.data.id),
                            },
                        });*/
                        }}
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
