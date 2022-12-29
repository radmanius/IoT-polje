import { IBooleanInput, IDateInput, IDecimalInput, IIntegerInput, IStringInput, ISubmitButton, ITimeInput } from "./inputs";
import { IRequest } from "./requests";

export interface IMeasurementSelectForm {
    submitSelectionRequest?: IRequest;
    inputs?: IBooleanInput | IIntegerInput | IDecimalInput | 
             IDateInput | ITimeInput | IStringInput | ISubmitButton;
}

export interface IActuationForm {
    defaultValuesRequest?: IRequest;
    submitFormRequest?: IRequest;
    inputs?: IBooleanInput | IIntegerInput | IDecimalInput | 
             IDateInput | ITimeInput | IStringInput | ISubmitButton;
}
