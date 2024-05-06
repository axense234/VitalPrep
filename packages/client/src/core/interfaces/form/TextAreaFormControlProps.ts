import { ChangeEventHandler } from "react";

export default interface TextAreaFormControlProps {
  labelContent: string;

  maxInputLength?: number;

  entityProperty: string | number | undefined;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLTextAreaElement>;
}
