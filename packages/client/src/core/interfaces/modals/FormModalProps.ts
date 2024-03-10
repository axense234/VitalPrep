import { MouseEventHandler } from "react";

export default interface FormModalProps {
  modalMessage: string;
  modalColor?: string;
  showModal: boolean;
  closeModal?: MouseEventHandler<SVGElement> | undefined;
}
