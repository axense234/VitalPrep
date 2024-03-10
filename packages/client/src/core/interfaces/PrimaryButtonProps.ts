import { MouseEventHandler } from "react";

export default interface PrimaryButtonProps {
  content: string;
  type: "functional" | "link";
  onClickFunction?: MouseEventHandler<HTMLButtonElement> | undefined;
  linkDest?: string;
  fontFamily: "Cabin" | "EB Garamond";
  fontSize: number;
  backgroundColor: string;
  height: number;
  width: number;
  disabled: boolean;
}
