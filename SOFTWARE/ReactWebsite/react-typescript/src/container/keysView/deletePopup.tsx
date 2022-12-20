import { useState } from "react";
import "./deletePopup.scss";
import { deleteKey } from "utils/axios/keysApi";
import { useNavigate } from "react-router-dom";
import { PAGE_ROUTES } from "utils/paths";

export default function Popup(props : any) {


    const navigate = useNavigate();

    const [error, setError] = useState("");

    const [confirmation, setConfirmation] = useState("");
    
    async function handleClick() {
        setError("");
        try {
            await deleteKey(props.name);
            navigate(PAGE_ROUTES.KeysView);
        }
        catch {
            setError("Greška pri brisanju ključa.")
            console.log("Error");
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

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {error && <h1 className="errorMsg">{error}</h1>}
                <h2>Jeste li sigurni da želite obrisati ključ?</h2>
                <h3>Napišite "OBRIŠI KLJUČ" za brisanje ključa.</h3>
                <div className="confirmationInput">
                    
                    <input className="confirmationText" type="text" maxLength={20} onChange={handleChange} value={confirmation} />
                    <br />
                </div>
                
                <button className="delete-btn" onClick={handleClick} disabled={confirmation !== "OBRIŠI KLJUČ"}>Obriši</button>

                <button className="close-btn" onClick={closePopup}>
                            X
                </button>
                {props.children}
            </div>
        </div>
    ) : <></>;
}