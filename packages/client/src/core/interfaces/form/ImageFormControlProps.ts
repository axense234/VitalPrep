import { ImageOption } from "@/core/types/ImageOption";
import { ChangeEventHandler } from "react";

export default interface ImageFormControlProps {
  labelColor?: "#DDD9D5" | "#120A06";
  labelFontSize?: number;

  defaultImageUsedUrl: string;

  imageUrlOptions?: ImageOption[];
  onEntityPropertyOptionSelected?: (specifier: string) => undefined;

  labelContent: string;
  entityPropertyLoadingStatus: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  entityProperty: string;
  onEntityPropertyValueChange: ChangeEventHandler<HTMLInputElement>;
}
