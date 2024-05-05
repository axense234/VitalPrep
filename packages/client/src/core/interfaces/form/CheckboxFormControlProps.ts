import { ChangeEventHandler } from "react";

export default interface CheckboxFormControlProps {
  labelContent: string;

  entityProperty: string | undefined;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement> | undefined;
}
