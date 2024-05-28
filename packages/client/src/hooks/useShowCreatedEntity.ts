// Types
import LoadingStateType from "@/core/types/LoadingStateType";
// React
import { useEffect } from "react";
// Redux
import { useAppDispatch } from "./redux";
import { UnknownAction } from "@reduxjs/toolkit";
import {
  changeShowGeneralModal,
  setTemplateModalMessage,
  changeShowFormModal,
} from "@/redux/slices/general/slice";

const useShowCreatedEntity = (
  loadingCreateEntity: LoadingStateType,
  modalSuccessMessage: string,
  modalErrorMessage: string,
  updateLoadingCreateEntityReducer: (
    loadingState: LoadingStateType
  ) => UnknownAction
) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loadingCreateEntity === "SUCCEDED") {
      dispatch(changeShowGeneralModal(true));
      dispatch(setTemplateModalMessage(modalSuccessMessage));
    } else if (loadingCreateEntity === "FAILED") {
      dispatch(changeShowGeneralModal(false));
      dispatch(changeShowFormModal(true));
      dispatch(setTemplateModalMessage(modalErrorMessage));
    }
    const timeout = setTimeout(() => {
      dispatch(updateLoadingCreateEntityReducer("IDLE"));
    }, 10);
    return () => {
      clearTimeout(timeout);
    };
  }, [loadingCreateEntity]);
};

export default useShowCreatedEntity;
