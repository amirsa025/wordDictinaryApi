import * as yup from "yup";

export interface IFormValues {
    search: string;
}

export interface  IsearchProps {
    onChangeHandler:(data: React.SetStateAction<string>) => void
}

export const schema = yup.object({
    search: yup.string().required('this input not blank'),
}).required();
