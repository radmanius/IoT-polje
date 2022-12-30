import { useState } from "react";
import "./deletePopup.scss";
import { editScene } from "utils/axios/scenesApi";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";

export default function PopupView(props: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const { keycloak } = useKeycloak();

    async function handleClick() {
        setError("");
        try {
            let views = [...props.scene.views];
            const index = views.indexOf(props.view);
            views.splice(index, 1);

            views.map(view => {
                if (view.selectForm) {
                    if (!view.selectForm.submitSelectionRequest) {
                        view.selectForm.submitSelectionRequest = {};
                    }
                } else if (view.form) {
                    if (!view.form.submitFormRequest) {
                        view.form.submitFormRequest = {};
                    }
                }
            });
            await editScene({ ...props.scene, views: views }, keycloak.token ?? "");
            closePopup();

            if (props.fetchScene) {
                props.fetchScene();
            } else {
                navigate(PAGE_ROUTES.ShortSceneView);
            }
        } catch {
            dispatch(showToastMessage("Error while deleting view.", "error"));
            setError("Greška pri brisanju view-a.");
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
                <h2>Jeste li sigurni da želite obrisati view?</h2>
                <h3>Napišite "OBRIŠI VIEW" za brisanje view-a.</h3>
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
                    disabled={confirmation !== "OBRIŠI VIEW"}
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
