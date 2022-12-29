import { IDataExtractor } from "./dataExtractors";
import { IActuationForm, IMeasurementSelectForm } from "./forms";
import { IRequest } from "./requests";

export interface IView{
    title: string;
}

export const initActuatinoView : ActuationView= {
    title:"",
    viewType: "actuation",
};

export const initMeasurementView : MeasurementsView= {
    title:"",
};

export interface MeasurementsView extends IView{
    measurementUnit?: string;
    viewType?: "single"|"series";
    selectForm?: IMeasurementSelectForm;
    query?: IRequest;
    responseExtracting?: IDataExtractor;

}

export interface ActuationView extends IView{
    viewType: "actuation";
    form?: IActuationForm;
}