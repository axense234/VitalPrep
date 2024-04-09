import { ImageOption } from "@/core/types/ImageOption";
import { ChangeEventHandler } from "react";

export default interface ImageFormControlProps {
  labelColor: "#DDD9D5" | "#120A06";
  labelContent: string;
  labelFontSize?: number;

  direction: "row" | "column";
  defaultImageUsedUrl: string;

  backgroundColor?: string;
  border?: string;
  padding?: number;

  imageUrlOptions?: ImageOption[];
  onEntityPropertyOptionSelected?: (specifier: string) => undefined;

  entityPropertyLoadingStatus: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  entityProperty: string;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement>;
}
