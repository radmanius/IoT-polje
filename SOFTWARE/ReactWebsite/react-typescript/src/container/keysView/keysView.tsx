import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "./keysView.scss";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import Popup from "./deletePopup";
import { getAllKeys } from "utils/axios/keysApi";
import { IKey } from "models/keys";



const KeysView = () => {
    //const dispatch = useDispatch();
    const navigate = useNavigate();
    const [keys, setKeys] = useState<IKey[]>();
    const [popup, setPopup] = useState<Boolean>(false);
    const [popupName, setPopupName] = useState<string>();
    const [searchInput, setSearchInput] = useState("");

    const fetchKeys = useCallback(async () => {
        try {
            const res = await getAllKeys();
            setKeys(res);
        } catch (error) {
            //toast message
            console.log("error while fetching keys");
        }
    }, []);

    useEffect(() => {
        fetchKeys();
    }, [fetchKeys]);

    const handleDeleteKey = async (key: IKey) => {
        setPopupName(key.name);
        setPopup(true);
    };

    const handleEditKey = async (key: IKey) => {
        try {
            navigate(PAGE_ROUTES.EditKey, {
                state: {
                    key: key,
                    from: PAGE_ROUTES.KeysView
                }
            });
        }
        catch {
            console.log("Error");
        }
    };

    const handleChange = (e:any) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    
    const actionColumnEdit = (rowData: IKey) => {
        return (
            <Button
                icon="fa fa-pen-to-square"
                className="p-button-outlined"
                //tooltip={"Uredi"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {
                    handleEditKey(rowData);
                }}
            />
        );
    };

    const keyFilter = (key: IKey) => {
        if (key.name?.toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
        }
        if (key.value?.toLowerCase().includes(searchInput.toLowerCase())) {
            return true;
        }
        return false;
    }

    const actionColumnDelete = (rowData: IKey) => {
        return (
            <Button
                icon="fa fa-trash"
                className="p-button-danger p-button-outlined"
                //tooltip={"Obriši"} POKAZUJE SE ISPOD FOOTERA IZ NEKOG RAZLOGA
                onClick={() => {
                    handleDeleteKey(rowData);
                }}
            />
        );
    };

    return (
        <div className="keys-page">
            <div className="keys-header">
                <div>
                    <Button
                        onClick={() => navigate(PAGE_ROUTES.Global)}
                        label={"Natrag na početnu stranicu"}
                    />
                </div>
                <div>
                    <h1>Popis ključeva</h1>
                </div>
                <div>
                    <Button
                        label="Dodaj novi ključ"
                        onClick={() => navigate(PAGE_ROUTES.AddNewKey)}
                    />
                </div>
            </div>
            <Popup
                trigger={popup}
                setTrigger={setPopup}
                name={popupName}
                fetchKeys={fetchKeys}
            />
            <div className="keys-search-wrap">
                <input className="keys-searchBar" type="search" placeholder="Pretraži..." onChange={handleChange} value={searchInput} />
            </div>
            <div className="keys-table">
                <DataTable
                    resizableColumns
                    showGridlines
                    value={keys?.filter((key:IKey) =>  keyFilter(key) )}
                    emptyMessage={"Trenutno nema rezultata"}
                    responsiveLayout="stack"
                >
                    <Column
                        key={"name"}
                        field={"name"}
                        header={"Naziv ključa"}
                        sortable={false}
                    />
                    <Column
                        key={"value"}
                        field={"value"}
                        header={"Vrijednost ključa"}
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

export default KeysView;