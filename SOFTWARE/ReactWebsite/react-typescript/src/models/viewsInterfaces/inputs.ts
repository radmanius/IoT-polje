export interface IInput{
    name: string;
    title: string;
}

export interface IBooleanInput extends IInput{
    inputType: "boolean";
    description: string;
    defaultValue: boolean;
}

export interface IIntegerInput extends IInput{
    inputType: "integer";
    description: string;
    defaultValue: Number; //should be int
    min: Number; //should be int
    max: Number; //should be int
}

export interface IDecimalInput extends IInput{
    inputType: "decimal";
    description: string;
    defaultValue: Number;
    min: Number;
    max: Number;
}

export interface IDateInput extends IInput{
    inputType: "date";
    description: string;
    //defaultValue: Date;
    defaultValue: string;
}

export interface ITimeInput extends IInput{
    inputType: "time";
    description: string;
    defaultValue: string;
}

export interface IStringInput extends IInput{
    inputType: "string";
    description: string;
    defaultValue: boolean;
    pattern: string;
    //enum ??
}

export interface ISubmitButton extends IInput{
    inputType: "submit";
    //ovaj nema description
}
