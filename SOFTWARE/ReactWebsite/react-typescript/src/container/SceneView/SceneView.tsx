import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useCallback, useEffect, useState } from "react";
import { initScenes, IScene } from "models/scenes";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PAGE_ROUTES } from "utils/paths";
import { getAllScenes } from "utils/axios/scenes";
import "./sceneView.scss";

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

    const fetchAllScenes = useCallback(async () => {
        try {
            const res = await getAllScenes();
            setScenes(res);
        } catch (error) {
            //toast message
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
                        navigate(PAGE_ROUTES.SpecificSceneView, {
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
                        onClick={() => navigate(PAGE_ROUTES.Global)}
                        label={"Natrag na početnu stranicu"}
                    />
                </div>
            </div>
        </div>
    );
};

export default SceneView;
