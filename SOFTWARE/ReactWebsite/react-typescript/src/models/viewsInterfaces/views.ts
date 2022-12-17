import { IDataExtractor } from "./dataExtractors";
import { IActuationForm, IMeasurementSelectForm } from "./forms";
import { IRequest } from "./requests";




export interface IView{
    title: string;
    viewType: string;
}

export interface MeasurementsView extends IView{
    measurementUnit: string;
    viewType: "single"|"series";
    selectForm: IMeasurementSelectForm;
    query: IRequest;
    responseExtracting: IDataExtractor;

}

export interface ActuationView extends IView{
    viewType: "actuation";
    form: IActuationForm;
}