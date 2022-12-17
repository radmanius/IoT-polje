export interface IDataExtractor{
}


export interface IDataExtractorCsv extends IDataExtractor{
    dataFormat: "csv";
    timeColumn: string;
    valueColumn: string;
}


export interface IDataExtractorJson extends IDataExtractor{
    dataFormat: "json";
    timeJsonPath: string;
    valueJsonPath: string;
}