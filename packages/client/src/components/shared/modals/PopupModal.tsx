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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  selectIsModalUsedWhenLoading,
  selectShowFormModal,
  selectShowGeneralModal,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";

const PopupModal: FC<PopupModalProps> = ({
  modalColor,
  hasBorder,
  textColor,
  modalType,
}) => {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const showGeneralModal = useAppSelector(selectShowGeneralModal);
  const showFormModal = useAppSelector(selectShowFormModal);

  const modalMessage = useAppSelector(selectTemplateModalMessage);
  const isModalUsedWhenLoading = useAppSelector(selectIsModalUsedWhenLoading);

  const showModal = modalType === "general" ? showGeneralModal : showFormModal;

  const closeModal = () => {
    if (modalType === "form") {
      dispatch(changeShowFormModal(false));
    } else if (modalType === "general") {
      dispatch(changeShowGeneralModal(false));
    }
  };

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
  }, [showModal, changeShowFormModal, changeShowGeneralModal]);

  useEffect(() => {
    if (modalType === "form" && modalRef.current && showModal) {
      modalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showModal, modalRef.current, modalType]);

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
