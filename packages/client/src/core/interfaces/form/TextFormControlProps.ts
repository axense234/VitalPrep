import { ChangeEventHandler } from "react";

export default interface TextFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  maxInputLength?: number;

  inputHeight?: number;

  backgroundColor?: string;
  border?: string;
  padding?: number;

  direction: "row" | "column";
  type:
    | "email"
    | "text"
    | "password"
    | "number"
    | "url"
    | "datetime-local"
    | "date";
  required: boolean;

  entityProperty: string | number | undefined | Date;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement>;
}
