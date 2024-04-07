import { ChangeEventHandler } from "react";

export default interface TextFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  maxInputLength?: number;

  inputHeight?: number;

  direction: "row" | "column";
  type: "email" | "text" | "password" | "number" | "url" | "datetime-local";
  required: boolean;

  entityProperty: string | number | undefined | Date;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement>;
}
