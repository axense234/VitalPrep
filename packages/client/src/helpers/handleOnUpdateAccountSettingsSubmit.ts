// Types
import UserTemplate from "@/core/types/entity/mutation/UserTemplate";
// Redux
import { State } from "@/redux/api/store";
import {
  changeShowGeneralModal,
  changeShowFormModal,
  setTemplateModalMessage,
  setTypeOfUpdateAccountQuery,
} from "@/redux/slices/general/slice";
import { updateUser } from "@/redux/slices/general/thunks";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleOnUpdateAccountSettingsSubmit = (
  dispatch: ThunkDispatch<State, {}, UnknownAction>,
  templateProfile: UserTemplate,
  verifiedPassword: string
) => {
  if (templateProfile.password !== verifiedPassword) {
    dispatch(changeShowGeneralModal(false));
    dispatch(changeShowFormModal(true));
    dispatch(setTemplateModalMessage("Passwords must match!"));
  } else if (templateProfile.password === verifiedPassword) {
    dispatch(setTypeOfUpdateAccountQuery("account"));
    dispatch(
      updateUser({ userTemplate: templateProfile, typeOfUpdate: "account" })
    );
  }
};

export default handleOnUpdateAccountSettingsSubmit;
