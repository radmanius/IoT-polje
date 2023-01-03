import { useState } from "react";
import "./deletePopup.scss";
import { deleteScene } from "utils/axios/scenesApi";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import { useKeycloak } from "@react-keycloak/web";
import { showToastMessage } from "redux/actions/toastMessageActions";
import { useDispatch } from "react-redux";

export default function Popup(props: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const { keycloak } = useKeycloak();

    async function handleClick() {
        setError("");
        try {
            await deleteScene(props.id, keycloak.token ?? "");
            dispatch(showToastMessage("Scene successfully deleted", "success"));
            closePopup();
            if (props.fetchScenes) {
                props.fetchScenes();
            } else {
                navigate(PAGE_ROUTES.ShortSceneView);
            }
        } catch {
            dispatch(showToastMessage("Error while deleting scene.", "error"));
            setError("Greška pri brisanju scene.");
        }
    }

    function handleChange(e: any) {
        setConfirmation(e.target.value);
    }

    function closePopup() {
        setConfirmation("");
        setError("");
        props.setTrigger(false);
    }

    return props.trigger ? (
        <div className="popup">
            <div className="popup-inner">
                {error && <h1 className="errorMsg">{error}</h1>}
                <h2>Jeste li sigurni da želite obrisati scenu?</h2>
                <h3>Napišite "OBRIŠI SCENU" za brisanje scene.</h3>
                <div className="confirmationInput">
                    <input
                        className="confirmationText"
                        type="text"
                        maxLength={20}
                        onChange={handleChange}
                        value={confirmation}
                    />
                    <br />
                </div>

                <button
                    className="delete-btn"
                    onClick={handleClick}
                    disabled={confirmation !== "OBRIŠI SCENU"}
                >
                    Obriši
                </button>

                <button
                    className="close-btn"
                    onClick={closePopup}
                >
                    X
                </button>
                {props.children}
            </div>
        </div>
    ) : (
        <></>
    );
}
