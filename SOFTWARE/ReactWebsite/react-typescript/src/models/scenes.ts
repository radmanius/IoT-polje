//import { IView } from "./viewsInterfaces/views";

import { IView } from "./viewsInterfaces/views";



export interface IShortScene{
    id: number;
    title: string;
    subtitle: string;
    tags?: IShortTag[];
    views?: IView[];
}

export interface IShortTag{
    name: string;
}

export interface IScene{
    id?: number;
    title: string;
    subtitle: string;
    pictureLink: string;
    layout: string;
    tags: any[];
    views: any[];
    roles: any[];
    keys: any[];
}

// export interface IScene{
//     id: number;
//     title: string;
//     subtitle: string;
//     pictureLink: string;
//     layout: "list"|"grid";
//     tags: string[];
//     views: IView[];
//     roles: string[];
//     keys: string[];
// }




export const initScenes = {
    id: -1,
    title: "",
    subtitle: "",
    pictureLink: "",
    layout: "",
    tags: [],
    views: [],
    roles: [],
    keys: []
};

/*
{
    "id": -1,
    title: "FER fer",
    "subtitle": "zid wall 00",
    "pictureLink": "http://example.com/some.png",
    "layout": "list",
    "tags": [
        "fer",
        "ferit"
    ],
    "views": [
        {
            "title": "view title",
            "viewType": "single",
            "measurementUnit": "C",
            "selectForm": {
                "id": 123,
                "submitSelectionRequest": {
                    "URI": "http://localhost:80/some/path/{{var1}}",
                    "method": "GET",
                    "headers": {
                        "Authorization": "{{accessToken}} {{token1}} ...",
                        "Content-Type": "application/csv",
                        "...": null
                    },
                    "payload": "template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}"
                },
                "inputs": {
                    "inputType": "boolean",
                    "name": "string",
                    "title": "string",
                    "description": "string",
                    "defaultValue": true
                }
            },
            "query": {
                "URI": "http://localhost:80/some/path/{{var1}}",
                "method": "GET",
                "headers": {
                    "Authorization": "{{accessToken}} {{token1}} ...",
                    "Content-Type": "application/csv",
                    "...": null
                },
                "payload": "template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}"
            },
            "responseExtracting": {
                "dataFormat": "csv",
                "timeColumn": "_time",
                "valueColumn": "_value"
            }
        },
        {
            "title": "view title",
            "viewType": "actuation",
            "form": {
                "defaultValuesRequest": {
                    "URI": "http://localhost:80/some/path/{{var1}}",
                    "method": "GET",
                    "headers": {
                        "Authorization": "{{accessToken}} {{token1}} ...",
                        "Content-Type": "application/csv",
                        "...": null
                    },
                    "payload": "template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}"
                },
                "submitFormRequest": {
                    "URI": "http://localhost:80/some/path/{{var1}}",
                    "method": "GET",
                    "headers": {
                        "Authorization": "{{accessToken}} {{token1}} ...",
                        "Content-Type": "application/csv",
                        "...": null
                    },
                    "payload": "template {{var1}} ... {{aggregationRange, period, startTimeUTC, startTimeISO, startTimeDuration}}"
                },
                "inputs": {
                    "inputType": "boolean",
                    "name": "string",
                    "title": "string",
                    "description": "string",
                    "defaultValue": true
                }
            }
        }
    ],
    "roles": [
        "string"
    ],
    "keys": [
        "string"
    ]
}
*/ 