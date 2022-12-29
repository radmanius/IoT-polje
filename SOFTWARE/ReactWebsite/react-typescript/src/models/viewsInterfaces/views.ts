import {  IDataExtractorCsv, IDataExtractorJson  } from "./dataExtractors";
import { IActuationForm, IMeasurementSelectForm } from "./forms";
import { IRequest } from "./requests";

export interface IView{
    title: string;
}

export const initActuationView : ActuationView = {
    title:"",
    viewType: "actuation",
};

export const initMeasurementView: MeasurementsView = {
    title: "",
    viewType: "single",
    query: {},
    selectForm: {
        submitSelectionRequest: {},
    },
    responseExtracting: {},
};

export interface MeasurementsView extends IView{
    measurementUnit?: string;
    viewType: "single"|"series";
    selectForm: IMeasurementSelectForm;
    query: IRequest;
    responseExtracting: IDataExtractorCsv | IDataExtractorJson;
}

export interface ActuationView extends IView {
    viewType: "actuation";
    form?: IActuationForm;
}