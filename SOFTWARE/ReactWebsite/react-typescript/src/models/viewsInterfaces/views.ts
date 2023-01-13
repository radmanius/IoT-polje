import {  IDataExtractorCsv, IDataExtractorJson } from "./dataExtractors";
import { IActuationForm, IMeasurementSelectForm } from "./forms";
import { IRequest } from "./requests";

export interface IView{
    title: string;
}

export const initActuationView : ActuationView = {
    title:"",
    viewType: "actuation",
    form: {
        defaultValuesRequest: {
            method: "GET",
            headers: {
            "Authorization": "",
            "Content-Type": "",
            },
        },
        submitFormRequest: {
            method: "POST",
            headers: {
            "Authorization": "",
            "Content-Type": "",
            },
        },
        inputs: {
            inputType: "BOOLEAN",
        }
    }
};

export const initMeasurementView: MeasurementsView = {
    title: "",
    viewType: "single",
    query: {
        method: "GET",
        headers: {
            "Authorization": "",
            "Content-Type": "",
        },
    },
    selectForm: {
        inputs: {
            inputType: "BOOLEAN",
        },
        submitSelectionRequest: {
            method: "GET",
            headers: {
            "Authorization": "",
            "Content-Type": "",
            },
        },
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

export const dataFormatOptions: any[] = [
    {
        text: "csv",
        value: "csv",
    },
    {
        text: "json",
        value: "json",
    }
]