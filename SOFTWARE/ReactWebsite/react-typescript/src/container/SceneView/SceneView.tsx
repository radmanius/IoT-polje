//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import "./sceneView.scss";
import { useCallback, useEffect, useState } from "react";
import { initScenes, IScene } from "models/scenes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const cols = [
    { field: "sceneId", header: "ID kratke scene", sortable: false },
    { field: "pictureLink", header: "Link slike", sortable: false },
    { field: "sceneTitle", header: "Naslov scene", sortable: false },
    { field: "sceneSubtitle", header: "Podnaslov scene", sortable: false },
    { field: "layoutId", header: "ID scene", sortable: false },
];

const SceneView = () => {
    const [scenes, setScenes] = useState<IScene[]>(initScenes);
    const navigate = useNavigate();
    //const dispatch = useDispatch();

    const fetchAllScenes = useCallback(async () => {
        try {
            //const res = await getScenes();
            //return all scenes
            //setScene(res)
            setScenes(initScenes);
        } catch (error) {
            //toast message
            console.log("error");
        }
    }, []);

    useEffect(() => {
        fetchAllScenes();
    }, [fetchAllScenes]);

    return (
        <div className="short-scene-page">
            <div>
                <h1>Scene</h1>
            </div>
            <div className="short-scene-table">
                <DataTable
                    resizableColumns
                    showGridlines
                    value={scenes}
                    emptyMessage={"Trenutno nema rezultata"}
                    responsiveLayout="stack"
                    onRowClick={rowData => {
                        navigate("/specific-scene-view", {
                            state: {
                                shortScene: scenes.find(x => x.sceneId === rowData.data.sceneId),
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

export default SceneView;
