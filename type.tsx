export interface IFormField {
  name: string;
  placeholder?: string;
  className?: string;
  type: "text" | "tel" | "number" | "email" | "textarea" | "file";
}

export interface IFormData {
  [key: string]: string;
}

export interface IContactFormProps {
  title: string;
  fields: IFormField[];
  btnText: string;
  className?: string;
}

export type ICustomError = {
  message: string;
  [key: string]: any;
};

export type Category =
  | "furniture"
  | "mattress"
  | "headboard"
  | "rug cleaning"
  | "chair";
export type CleaningOptions = Record<string, number>;
export type PriceMap = Record<Category, Record<string, CleaningOptions>>;
