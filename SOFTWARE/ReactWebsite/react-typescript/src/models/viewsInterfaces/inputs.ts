export interface IInput{
    name: string;
    title: string;
    description?: string;
    defaultValue?: boolean | string | number;
    min?: number;
    max?: number;
    pattern?: string;
    inputType?: string;
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
