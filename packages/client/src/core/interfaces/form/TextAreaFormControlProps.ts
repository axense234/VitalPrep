import { ChangeEventHandler } from "react";

export default interface TextAreaFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  maxInputLength?: number;

  backgroundColor?: string;

  inputHeight?: number;

  direction: "row" | "column";

  entityProperty: string | number | undefined;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLTextAreaElement>;
}
