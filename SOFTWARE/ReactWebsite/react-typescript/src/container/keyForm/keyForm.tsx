import { useNavigate } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import "./keyForm.scss";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import { addKey } from "utils/axios/keysApi";
import { IKey } from "models/keys";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { showToastMessage } from "redux/actions/toastMessageActions";

const KeyForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();

    const handleAddNewKey = async (key: IKey) => {
        try {
            await addKey(key, keycloak.token ?? "");
            dispatch(showToastMessage("Key successfully created", "success"));
        } catch (error) {
            dispatch(showToastMessage("Error while adding new key.", "error"));
        } finally {
            navigate(PAGE_ROUTES.KeysView);
        }
    };

    return (
        <div className="key-form-container">
            <div>
                <h1>Dodaj novi ključ</h1>
                <div className="form-fields-container">
                    <Form
                        onSubmit={(data: IKey) => handleAddNewKey(data)}
                        //initialValues={initkeys}
                        render={({ handleSubmit }) => (
                            <form
                                id="new-key"
                                onSubmit={handleSubmit}
                                className="form-container"
                                autoComplete="off"
                            >
                                <Field
                                    name="name"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="key-label">Naziv ključa:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="name"
                                                    className="key-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <Field
                                    name="value"
                                    render={({ input }) => (
                                        <div>
                                            <span>
                                                <p className="key-label">Vrijednost ključa:</p>
                                            </span>
                                            <span>
                                                <InputText
                                                    id="value"
                                                    className="key-field-form"
                                                    {...input}
                                                />
                                            </span>
                                        </div>
                                    )}
                                />
                                <div className="key-form-buttons">
                                    <Button
                                        label="Dodaj"
                                        icon="pi pi-check"
                                        type="submit"
                                    />
                                    <Button
                                        label="Odustani"
                                        onClick={() => navigate(PAGE_ROUTES.KeysView)}
                                    />
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default KeyForm;
