export interface IDataExtractorCsv {
    dataFormat?: string; 
    timeColumn?: string;
    valueColumn?: string;
}


export interface IDataExtractorJson {
    dataFormat?: string; 
    //timeJsonPath?: string;
    //valueJsonPath?: string;
    timeColumn?: string;
    valueColumn?: string;
}