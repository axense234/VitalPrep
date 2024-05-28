// Types
import { SectionValueType } from "@/core/types/GettingStartedContentMapContentType";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import GeneralSliceInitialStateType from "@/core/types/entity/general/GeneralSliceInitialStateType";
import UpdateAccountQueryType from "@/core/types/entity/general/UpdateAccountQueryType";
import EntityType from "@/core/types/entity/users/EntityType";
import UserType from "@/core/types/entity/users/UserType";
import { PayloadAction } from "@reduxjs/toolkit";

const generalSliceReducers = {
  updateWarningOverlay(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<{
      overlayMessage: string;
      showOverlay: boolean;
      onConfirmFunction: any;
      countdownSeconds: number;
    }>
  ) {
    state.warningOverlay = action.payload;
  },

  resetTemplateImageUrl(state: GeneralSliceInitialStateType) {
    state.templateImageUrl = "";
  },
  changeCurrentGuideSection(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<SectionValueType>
  ) {
    state.currentGuideSection = action.payload;
  },
  setTypeOfUpdateAccountQuery(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<UpdateAccountQueryType>
  ) {
    state.typeOfUpdateAccountQuery = action.payload;
  },
  changeVerifiedPassword(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<string>
  ) {
    state.verifiedPassword = action.payload;
  },
  changeShowProfileEmail(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.showProfileEmail = action.payload;
  },
  changeSelectedViewOption(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<"grid" | "list">
  ) {
    state.selectedViewOption = action.payload;
  },
  setTemplateModalMessage(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<string>
  ) {
    state.templateModalMessage = action.payload;
  },
  changeInvalidJWT(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.invalidJWT = action.payload;
  },
  setSelectedEntityOption(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<EntityType>
  ) {
    state.selectedEntityOption = action.payload;
  },
  changeIsUserABot(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.isUserABot = action.payload;
  },
  changeIsSidebarOpened(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.isSidebarOpened = action.payload;
  },
  updateTemplateProfile(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateProfile = {
      ...state.templateProfile,
      [action.payload.key]: action.payload.value,
    };
  },
  updateTemplateProfileNotificationSettings(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    (state.templateProfile as UserType).notificationSettings = {
      ...(state.templateProfile as UserType).notificationSettings,
      [action.payload.key]: action.payload.value,
    };
  },
  setTemplateProfile(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<UserType>
  ) {
    state.templateProfile = action.payload;
  },
  updateEntityQueryValues(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.entityQueryValues = {
      ...state.entityQueryValues,
      [action.payload.key]: action.payload.value,
    };
  },
  manipulateLoadingCreateProfile(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateProfile = action.payload;
  },
  manipulateLoadingLoginProfile(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingLoginProfile = action.payload;
  },
  changeShowFormModal(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.showFormModal = action.payload;
  },
  changeShowGeneralModal(
    state: GeneralSliceInitialStateType,
    action: PayloadAction<boolean>
  ) {
    state.showGeneralModal = action.payload;
  },
};

export default generalSliceReducers;
