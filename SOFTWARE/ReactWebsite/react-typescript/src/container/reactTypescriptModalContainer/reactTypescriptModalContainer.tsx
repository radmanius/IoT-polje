import { useSelector } from "react-redux";
import { ModalBaseProps, ShowModalPayload } from "redux/models/modalModels";
import { ModalTypeEnum } from "utils/enums";

const modalMapping: { [modalType in ModalTypeEnum]: Function } = {
    [ModalTypeEnum.None]: () => {
        <></>;
    },
};

const ReactTypescriptModalContainer = () => {
    const { modalDescriptors } = useSelector((state: any) => state.modal);

    if (modalDescriptors.length == 0) {
        return <></>;
    }

    return (
        <>
            {modalDescriptors.map((value: ShowModalPayload<ModalBaseProps>, index: any) => {
                const Modal = modalMapping[value.modalType];
                return (
                    <Modal
                        key={value.modalType}
                        {...value.actionContext}
                    />
                );
            })}
        </>
    );
};

export default ReactTypescriptModalContainer;
