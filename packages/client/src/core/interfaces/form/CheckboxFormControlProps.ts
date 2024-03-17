import { ChangeEventHandler } from "react";

export default interface CheckboxFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  direction: "row" | "column";
  entityProperty?: string | undefined;
  onEntityPropertyValueChange?:
    | ChangeEventHandler<HTMLInputElement>
    | undefined;
}
