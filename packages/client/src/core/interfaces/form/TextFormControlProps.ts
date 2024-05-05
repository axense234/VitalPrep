import { ChangeEventHandler } from "react";

export default interface TextFormControlProps {
  labelColor?: "#DDD9D5" | "#120A06";
  labelFontSize?: number;
  maxInputLength?: number;
  inputHeight?: number;

  labelContent: string;
  type:
    | "email"
    | "text"
    | "password"
    | "number"
    | "url"
    | "datetime-local"
    | "date"
    | "time";

  entityProperty: string | number | undefined | Date;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement>;
}
