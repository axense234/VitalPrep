import { MouseEventHandler } from "react";

export default interface PrimaryButtonProps {
  content: string;
  onHoverContent?: string;
  type: "functional" | "link";
  onClickFunction?: MouseEventHandler<HTMLButtonElement> | undefined;
  linkDest?: string;
  fontSize: number;
  backgroundColor: string;
  textColor?: string;
  height: number;
  width: number;
  disabled: boolean;
}
