import { State } from "@/redux/api/store";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const closePopupModal = (
  dispatch: ThunkDispatch<State, {}, UnknownAction>,
  modalType: "general" | "form",
  closeModalTypeFunction: (payload: boolean) => UnknownAction
) => {
  if (modalType === "form") {
    dispatch(closeModalTypeFunction(false));
  } else if (modalType === "general") {
    dispatch(closeModalTypeFunction(false));
  }
};

export default closePopupModal;
