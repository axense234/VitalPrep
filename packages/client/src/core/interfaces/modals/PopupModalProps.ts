import { MouseEventHandler } from "react";

export default interface PopupMOdalProps {
  showModal: boolean;
  modalColor?: string;
  textColor?: string;
  hasBorder?: boolean;
  closeModal: any;
  modalType: "form" | "general";
}
