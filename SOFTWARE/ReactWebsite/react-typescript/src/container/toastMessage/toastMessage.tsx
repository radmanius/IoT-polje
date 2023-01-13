import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { RootState } from "redux/store/store";

export const ToastMessage = () => {
    const toast = useRef<Toast>(null);
    const { text, life, severity, timestamp } = useSelector((state: RootState) => state.toastMessageReducer);

    useEffect(() => {
        if (toast.current && timestamp !== 0) {
            toast.current.show({ closable: true, life, severity, detail: text });
        }
    }, [text, life, severity, timestamp]);

    return (
        <Toast
            position="bottom-right"
            ref={toast}
        />
    );
};
