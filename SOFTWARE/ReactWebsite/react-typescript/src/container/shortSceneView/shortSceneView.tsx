//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IShortScene } from "models/scenes";
import { useCallback, useEffect, useState } from "react";
import "./shortSceneView.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import { getAllScenes } from "utils/axios/scenesApi";

const ShortSceneView = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shortScene, setShortScene] = useState<IShortScene[]>();

    const fetchShortScenes = useCallback(async () => {
        try {
            const res = await getAllScenes();
            setShortScene(res);
        } catch (error) {
            //toast message
            console.log("error while fetching scenes");
        }
    }, []);

    useEffect(() => {
        fetchShortScenes();
    }, [fetchShortScenes]);

    const handleDeleteScene = async (vehicle: IShortScene) => {
        try {
            console.log("Faza brisanja scene");
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditScene = async (scene: IShortScene) => {
        navigate(PAGE_ROUTES.EditScene, { state: { scene } });
    };

    const actionColumnEdit = (rowData: IShortScene) => {
        return (
            <Button
                icon="fa fa-pen-to-square"
                className="p-button-outlined"
                tooltip={"Uredi"}
                onClick={() => {
                    handleEditScene(rowData);
                }}
            />
        );
    };

    const actionColumnDelete = (rowData: IShortScene) => {
        return (
            <Button
                icon="fa fa-trash"
                className="p-button-danger p-button-outlined"
                tooltip={"Obriši"}
                onClick={() => {
                    handleDeleteScene(rowData);
                }}
            />
        );
    };

    return (
        <div className="short-scene-page">
            <div className="short-scene-header">
                <div>
                    <Button
                        onClick={() => navigate(PAGE_ROUTES.Global)}
                        label={"Natrag na početnu stranicu"}
                    />
                </div>
                <div>
                    <h1>Popis scena</h1>
                </div>
                <div>
                    <Button
                        label="Dodaj novu scenu"
                        onClick={() => navigate(PAGE_ROUTES.AddNewScene)}
                    />
                </div>
            </div>
            <div className="short-scene-table">
                <DataTable
                    resizableColumns
                    showGridlines
                    value={shortScene}
                    emptyMessage={"Trenutno nema rezultata"}
                    responsiveLayout="stack"
                    onRowClick={rowData => {
                        navigate(PAGE_ROUTES.SpecificSceneView, {
                            state: {
                                shortScene: shortScene?.find(x => x.id === rowData.data.id),
                            },
                        });
                    }}
                >
                    <Column
                        key={"id"}
                        field={"id"}
                        header={"ID scene"}
                        sortable={false}
                    />
                    <Column
                        key={"title"}
                        field={"title"}
                        header={"Naslov scene"}
                        sortable={true}
                    />
                    <Column
                        key={"subtitle"}
                        field={"subtitle"}
                        header={"Podnaslov scene"}
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
    );
};

export default ShortSceneView;
