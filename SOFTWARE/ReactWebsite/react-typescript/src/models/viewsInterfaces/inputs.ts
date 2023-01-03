export interface IInput{
    name?: string;
    title?: string;
    description?: string;
    defaultValue?: boolean | string | number;
    min?: number;
    max?: number;
    pattern?: string;
    inputType?: string;
}

export const viewInputsOptions: any[] = [
    {
        text: "BOOLEAN",
        value: "BOOLEAN",
    },
    {
        text: "INTEGER",
        value: "INTEGER",
    },
    {
        text: "DECIMAL",
        value: "DECIMAL",
    },
    {
        text: "DATE",
        value: "DATE",
    },
    {
        text: "TIME",
        value: "TIME",
    },
    {
        text: "STRING",
        value: "STRING",
    },
    {
        text: "SUBMIT",
        value: "SUBMIT",
    }
]
