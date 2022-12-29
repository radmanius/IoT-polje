export interface IInput{
    name: string;
    title: string;
    inputType: string;
}

export interface IBooleanInput extends IInput{
    inputType: "boolean";
    description: string;
    defaultValue: boolean;
}

export interface IIntegerInput extends IInput{
    inputType: "integer";
    description: string;
    defaultValue: number;
    min: number;
    max: number;
}

export interface IDecimalInput extends IInput{
    inputType: "decimal";
    description: string;
    defaultValue: number;
    min: number;
    max: number;
}

export interface IDateInput extends IInput{
    inputType: "date";
    description: string;
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
}

export interface ISubmitButton extends IInput{
    inputType: "submit";
}

export const viewInputsOptions: any[] = [
    {
        text: "boolean",
        value: "boolean",
    },
    {
        text: "integer",
        value: "integer",
    },
    {
        text: "decimal",
        value: "decimal",
    },
    {
        text: "date",
        value: "date",
    },
    {
        text: "time",
        value: "time",
    },
    {
        text: "string",
        value: "string",
    },
    {
        text: "submit",
        value: "submit",
    }
]
