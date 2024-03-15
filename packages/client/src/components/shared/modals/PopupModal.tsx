"use client";

// React Icons
import { AiFillCloseSquare } from "react-icons/ai";
// Types
import PopupModalProps from "@/core/interfaces/modals/PopupModalProps";
// React
import { FC, useEffect, useRef } from "react";
// SCSS
import popupModalStyles from "../../../scss/components/others/Modals.module.scss";
// Hooks
import useModalTransition from "@/hooks/useModalTransition";
// React Spinners
import { BeatLoader } from "react-spinners";
// Redux
import { useAppSelector } from "@/hooks/redux";
import {
  selectIsModalUsedWhenLoading,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";

const PopupModal: FC<PopupModalProps> = ({
  modalColor,
  hasBorder,
  textColor,
  closeModal,
  modalType,
  showModal,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalMessage = useAppSelector(selectTemplateModalMessage);
  const isModalUsedWhenLoading = useAppSelector(selectIsModalUsedWhenLoading);

  console.log(`${showModal}, ${modalType}`);

  useModalTransition(showModal, modalRef);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        closeModal();
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showModal, closeModal]);

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
        {isModalUsedWhenLoading && (
          <BeatLoader size={16} color="#120a06" margin={4} />
        )}
      </p>
    </div>
  );
};

export default PopupModal;
