"use client";

// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Types
import FormModalProps from "@/core/interfaces/modals/FormModalProps";
// React
import { FC, useRef } from "react";
// SCSS
import formModalStyles from "../../../scss/components/others/Modals.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";

const FormModal: FC<FormModalProps> = ({
  modalColor,
  modalMessage,
  showModal,
  closeModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalTransition(showModal, modalRef);

  return (
    <div
      className={formModalStyles.formModalContainer}
      style={{ backgroundColor: modalColor || "#8b0000" }}
      ref={modalRef}
    >
      <AiFillCloseSquare onClick={closeModal} />
      <p>{modalMessage || "Default Modal Message"}</p>
    </div>
  );
};

export default FormModal;
