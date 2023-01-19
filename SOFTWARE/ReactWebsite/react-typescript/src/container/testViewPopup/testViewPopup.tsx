import "./testViewPopup.scss";

export default function Popup(props: any) {


    function closePopup() {
        props.setTrigger(false);
    }

    return props.trigger ? (
        <div className="popupView">
            <div className="popup-inner">
                <h2 className="">View test returned:</h2>
                <h2 className="errorMsg">{props.message}</h2>

                {props.option == "submit" &&
                    <div className="buttons-container">
                        <button
                            id="nastavi"
                            className="delete-btn"
                            onClick={(e) => {
                                    props.submit()
                                    closePopup()
                                }
                            }
                            value={"Nastavi"}
                        >
                            Nastavi
                        </button>

                        <button
                            id="odustani"
                            className="delete-btn"
                            onClick={(e) => closePopup()}
                        >
                            Odustani
                        </button>
                    </div>
                }

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
