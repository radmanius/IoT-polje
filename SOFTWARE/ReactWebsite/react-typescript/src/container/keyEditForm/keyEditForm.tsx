import { useNavigate, useLocation } from "react-router-dom";
import { Field, Form } from "react-final-form";
import { InputText } from "primereact/inputtext";
import "./keyEditForm.scss";
import { Button } from "primereact/button";
import { PAGE_ROUTES } from "utils/paths";
import { useState } from "react";
import { editKey } from "utils/axios/keysApi";
import { IKey } from "models/keys";


interface ILocationState {
    key: IKey;
}

const KeyEditForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [key, setKey] = useState<IKey>((location.state as ILocationState)?.key as IKey);


    const handleEditKey = async (data: IKey) => {
        try {
            await editKey(data);
        } catch (error) {
            console.log(error);
        } finally {
            navigate(PAGE_ROUTES.KeysView);
        }
    };

    const handleChange = (e: any) => {

        if (e.target.id === "name") {
            setKey({
                ...key,
                name: e.target.value,
            });
        } else if (e.target.id === "value") {
            setKey({
                ...key,
                value: e.target.value,
            });
        }
    };

    const handleClick = async (e: any) => {
        e.preventDefault();
        await handleEditKey(key);
    };

    const handleOdustani = async (e: any) => {
        navigate(PAGE_ROUTES.KeysView);
    };

    return (
        <div className="key-form-container">
            {key && (
                <div>
                    <h1>Uredi ključ</h1>
                    <div className="form-fields-container">
                        <Form
                            initialValues={key}
                            onSubmit={handleClick}
                            render={() => (
                                <form
                                    id="new-key"
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
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
                                                        value={key.name}
                                                        disabled
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
                                                        onChange={e => handleChange(e)}
                                                        onKeyPress={e => {
                                                            e.key === "Enter" && handleClick(e);
                                                        }}
                                                        value={key.value}
                                                    />
                                                </span>
                                            </div>
                                        )}
                                    />
                                    <div className="key-form-buttons">
                                        <Button
                                            label="Dodaj"
                                            icon="pi pi-check"
                                            type="button"
                                            onClick={e => handleClick(e)}
                                        />
                                        <Button
                                            label="Odustani"
                                            type="button"
                                            onClick={e => handleOdustani(e)}
                                        />
                                    </div>
                                </form>
                            )}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default KeyEditForm;
