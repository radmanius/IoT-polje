import { ModalTypeEnum } from "utils/enums";

export interface ModalBaseProps {}

export interface ShowModalPayload<T extends ModalBaseProps> {
    modalType: ModalTypeEnum;
    actionContext?: T;
}
