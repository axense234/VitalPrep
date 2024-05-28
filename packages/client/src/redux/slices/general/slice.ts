// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import generalSliceInitialState from "./initialState";
// Reducers
import generalSliceReducers from "./reducers";
// Extra Reducers
import generalSliceExtraReducers from "./extraReducers";

const generalSlice = createSlice({
  name: "general",
  initialState: generalSliceInitialState,
  reducers: generalSliceReducers,
  extraReducers: generalSliceExtraReducers,
});

export const {
  changeIsSidebarOpened,
  updateTemplateProfile,
  changeShowFormModal,
  changeShowGeneralModal,
  manipulateLoadingCreateProfile,
  manipulateLoadingLoginProfile,
  changeIsUserABot,
  setSelectedEntityOption,
  changeInvalidJWT,
  setTemplateModalMessage,
  changeSelectedViewOption,
  updateTemplateProfileNotificationSettings,
  updateEntityQueryValues,
  changeShowProfileEmail,
  setTemplateProfile,
  changeVerifiedPassword,
  setTypeOfUpdateAccountQuery,
  changeCurrentGuideSection,
  resetTemplateImageUrl,

  updateWarningOverlay,
} = generalSlice.actions;

export default generalSlice.reducer;
