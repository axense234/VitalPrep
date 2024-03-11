import { MouseEventHandler } from "react";

export default interface PopupMOdalProps {
  modalMessage: string;
  modalColor?: string;
  textColor?: string;
  showModal: boolean;
  hasBorder?: boolean;
  usedForLoading?: boolean;
  closeModal?: MouseEventHandler<SVGElement> | undefined;
}
