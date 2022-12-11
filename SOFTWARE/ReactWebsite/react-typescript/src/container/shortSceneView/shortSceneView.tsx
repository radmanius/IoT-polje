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

const cols = [
    { field: "id", header: "ID kratke scene", sortable: false },
    { field: "title", header: "Naslov scene", sortable: false },
    { field: "subtitle", header: "Podnaslov scene", sortable: false },
];

const ShortSceneView = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shortScene, setShortScene] = useState<IShortScene[]>();

    const fetchShortScenes = useCallback(async () => {
        try {
            const res = await getAllScenes();
            console.log(res);
            //const res = await getShortScenes();
            setShortScene(res);
        } catch (error) {
            //toast message
            console.log("error");
        }
    }, []);

    useEffect(() => {
        fetchShortScenes();
    }, [fetchShortScenes]);

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
                    {cols.map(col => {
                        return (
                            <Column
                                key={col.field}
                                field={col.field}
                                header={col.header}
                                sortable={col.sortable}
                            />
                        );
                    })}
                </DataTable>
            </div>
        </div>
    );
};

export default ShortSceneView;
