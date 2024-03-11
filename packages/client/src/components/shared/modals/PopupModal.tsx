"use client";

// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Types
import PopupModalProps from "@/core/interfaces/modals/PopupModalProps";
// React
import { FC, useRef } from "react";
// SCSS
import popupModalStyles from "../../../scss/components/others/Modals.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
import { BeatLoader, ClipLoader } from "react-spinners";

const PopupModal: FC<PopupModalProps> = ({
  modalColor,
  modalMessage,
  showModal,
  closeModal,
  hasBorder,
  textColor,
  usedForLoading,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useModalTransition(showModal, modalRef);

  return (
    <div
      className={popupModalStyles.popupModalContainer}
      style={{
        backgroundColor: modalColor || "#8b0000",
        border: hasBorder ? "1.5px solid #120a06" : "none",
        borderTop: "none",
      }}
      ref={modalRef}
    >
      <AiFillCloseSquare onClick={closeModal} />
      <p style={{ color: textColor || "#ddd9d5" }}>
        {modalMessage || "Default Modal Message"}
        {usedForLoading && <BeatLoader size={16} color="#120a06" margin={4} />}
      </p>
    </div>
  );
};

export default PopupModal;
