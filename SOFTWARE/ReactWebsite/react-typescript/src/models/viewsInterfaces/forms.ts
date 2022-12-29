import { IInput } from "./inputs";
import { IRequest } from "./requests";

export interface IMeasurementSelectForm {
    submitSelectionRequest: IRequest;
    inputs: IInput;
}

export interface IActuationForm {
    defaultValuesRequest?: IRequest;
    submitFormRequest?: IRequest;
    inputs?: IInput;
}