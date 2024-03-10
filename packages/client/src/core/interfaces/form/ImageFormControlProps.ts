import { ChangeEventHandler } from "react";

export default interface ImageFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  direction: "row" | "column";
  defaultImageUsedUrl: string;
  entityPropertyLoadingStatus: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  entityProperty: string;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement> | undefined;
}
