export default interface PopupModalProps {
  showModal: boolean;
  modalColor?: string;
  textColor?: string;
  hasBorder?: boolean;
  closeModal: any;
  modalType: "form" | "general";
  modalMessage: string;
  isModalUsedWhenLoading: boolean;
}
