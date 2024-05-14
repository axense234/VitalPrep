// Redux
import { State } from "@/redux/api/store";
import {
  changeShowGeneralModal,
  changeShowFormModal,
} from "@/redux/slices/generalSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
// Helpers
import closePopupModal from "@/helpers/closePopupModal";
// React
import { useEffect } from "react";

const useClosePopupModal = (
  modalType: "general" | "form",
  showModal: boolean,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        closePopupModal(
          dispatch,
          modalType,
          modalType === "general" ? changeShowGeneralModal : changeShowFormModal
        );
      }, 5000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [showModal]);
};

export default useClosePopupModal;
