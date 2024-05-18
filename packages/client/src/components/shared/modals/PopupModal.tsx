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
// React Spinners
import { BeatLoader } from "react-spinners";
// Redux
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  changeShowFormModal,
  changeShowGeneralModal,
  selectIsModalUsedWhenLoading,
  selectShowFormModal,
  selectShowGeneralModal,
  selectTemplateModalMessage,
} from "@/redux/slices/generalSlice";
// Helpers and Hooks
import closePopupModal from "@/helpers/closePopupModal";
import useClosePopupModal from "@/hooks/useClosePopupModal";
import useScrollPopupModalIntoView from "@/hooks/useScrollPopupModalIntoView";

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

  useModalTransition(showModal, modalRef);
  useClosePopupModal(modalType, showModal, dispatch);
  useScrollPopupModalIntoView(modalRef, showModal, modalType);

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
      <AiFillCloseSquare
        onClick={() =>
          closePopupModal(
            dispatch,
            modalType,
            modalType === "general"
              ? changeShowGeneralModal
              : changeShowFormModal
          )
        }
      />
      <p style={{ color: textColor || "#ddd9d5" }}>
        <span>
          {modalMessage || "Something went wrong, please refresh the page!"}
        </span>
        {isModalUsedWhenLoading && (
          <BeatLoader size={16} color="#120a06" margin={4} />
        )}
      </p>
    </div>
  );
};

export default PopupModal;
