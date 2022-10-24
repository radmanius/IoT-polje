import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalTypeEnum } from "utils/enums";
import { ModalBaseProps, ShowModalPayload } from "redux/models/modalModels";

export interface ModalState {
    modalDescriptors: ShowModalPayload<ModalBaseProps>[];
}

const initialState: ModalState = {
    modalDescriptors: [],
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showModal<T extends ModalBaseProps>(state: ModalState, action: PayloadAction<ShowModalPayload<T>>): void {
            state.modalDescriptors.push({
                modalType: action.payload.modalType,
                actionContext: action.payload.actionContext,
            });
        },

        hideModal(state: ModalState) {
            state.modalDescriptors.pop();
        },
    },
});

// https://stackoverflow.com/questions/51197819/declaring-const-of-generic-type/51197906
export const showModal: <T extends ModalBaseProps = ModalBaseProps>(modalType: ModalTypeEnum, args: T) => void = (
    modalType: ModalTypeEnum,
    args: any
) =>
    modalSlice.actions.showModal({
        modalType: modalType,
        actionContext: args,
    });
export const { hideModal } = modalSlice.actions;

const { reducer } = modalSlice;

export default reducer;
