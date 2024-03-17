import { ChangeEventHandler } from "react";

export default interface TextFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;

  inputHeight?: number;

  direction: "row" | "column";
  type: "email" | "text" | "password" | "number";
  required: boolean;

  entityProperty: string | number | undefined;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement> | undefined;
}
