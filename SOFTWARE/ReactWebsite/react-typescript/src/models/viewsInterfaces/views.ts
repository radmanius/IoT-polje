import {  IDataExtractorCsv, IDataExtractorJson  } from "./dataExtractors";
import { IActuationForm, IMeasurementSelectForm } from "./forms";
import { IRequest } from "./requests";

export interface IView{
    title: string;
}

export const initActuationView : ActuationView = {
    title:"",
    viewType: "actuation",
    form: {
        defaultValuesRequest: {},
        submitFormRequest: {}
    }

};

export const initMeasurementView: MeasurementsView = {
    title: "",
    viewType: "",
    query: {},
    selectForm: {
        submitSelectionRequest: {},
    },
    responseExtracting: {},
};

export interface MeasurementsView extends IView{
    measurementUnit?: string;
    viewType: string;
    selectForm: IMeasurementSelectForm;
    query: IRequest;
    responseExtracting: IDataExtractorCsv | IDataExtractorJson;
}

export interface ActuationView extends IView {
    viewType: "actuation";
    form: IActuationForm;
}

export const viewTypeOptions: any[] = [
    {
        text: "single",
        value: "single",
    },
    {
        text: "series",
        value: "series",
    }
]

export const viewMethodOptions: any[] = [
    {
        text: "GET",
        value: "GET",
    },
    {
        text: "POST",
        value: "POST",
    }
]