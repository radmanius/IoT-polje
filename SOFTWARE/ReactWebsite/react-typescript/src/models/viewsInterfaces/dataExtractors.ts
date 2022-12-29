export interface IDataExtractorCsv {
    dataFormat: "csv";
    timeColumn: string;
    valueColumn: string;
}


export interface IDataExtractorJson {
    dataFormat: "json";
    timeJsonPath: string;
    valueJsonPath: string;
}