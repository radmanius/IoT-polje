//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IShortScene, shortScenes } from "models/shortScene";
import { useCallback, useEffect, useState } from "react";
import "./ShortSceneView.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const cols = [
    { field: "shortSceneId", header: "ID kratke scene", sortable: false },
    { field: "pictureLink", header: "Link slike", sortable: false },
    { field: "sceneTitle", header: "Naslov scene", sortable: false },
    { field: "sceneSubtitle", header: "Podnaslov scene", sortable: false },
    { field: "sceneId", header: "ID scene", sortable: false },
];

const ShortSceneView = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const [shortScene, setShortScene] = useState<IShortScene[]>();

    const fetchShortScenes = useCallback(async () => {
        try {
            //const res = await getShortScenes();
            setShortScene(shortScenes);
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
            <div>
                <h1>Kratke scene</h1>
            </div>
            <div className="short-scene-table">
                <DataTable
                    resizableColumns
                    showGridlines
                    value={shortScene}
                    emptyMessage={"Trenutno nema rezultata"}
                    responsiveLayout="stack"
                    onRowClick={rowData => {
                        navigate("/scene-view", {
                            state: {
                                satelite: shortScenes.find(x => x.shortSceneId === rowData.data.shortSceneId),
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
            <div>
                <div>
                    <Button
                        onClick={() => navigate("/")}
                        label={"Natrag na početnu stranicu"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShortSceneView;
