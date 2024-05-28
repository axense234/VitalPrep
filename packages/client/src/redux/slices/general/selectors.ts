// State Type
import { State } from "@/redux/api/store";

export const selectIsSidebarOpened = (state: State) =>
  state.general.isSidebarOpened;

export const selectProfile = (state: State) => state.general.profile;

export const selectTemplateProfile = (state: State) =>
  state.general.templateProfile;

export const selectLoadingCloudinaryImage = (state: State) =>
  state.general.loadingCloudinaryImage;

export const selectTemplateImageUrl = (state: State) =>
  state.general.templateImageUrl;

export const selectTemplateNotificationsImageUrl = (state: State) =>
  state.general.templateNotificationsImageUrl;

export const selectTemplateModalMessage = (state: State) =>
  state.general.templateModalMessage;

export const selectLoadingCreateProfile = (state: State) =>
  state.general.loadingCreateProfile;

export const selectLoadingLoginProfile = (state: State) =>
  state.general.loadingLoginProfile;

export const selectShowFormModal = (state: State) =>
  state.general.showFormModal;

export const selectShowGeneralModal = (state: State) =>
  state.general.showGeneralModal;

export const selectLoadingGetProfile = (state: State) =>
  state.general.loadingGetProfile;

export const selectLoadingLoginOAuthProfile = (state: State) =>
  state.general.loadingLoginOAuthProfile;

export const selectLoadingCreateOAuthProfile = (state: State) =>
  state.general.loadingCreateOAuthProfile;

export const selectLoadingGetOAuthProfile = (state: State) =>
  state.general.loadingGetOAuthProfile;

export const selectIsModalUsedWhenLoading = (state: State) =>
  state.general.isModalUsedWhenLoading;

export const selectIsUserABot = (state: State) => state.general.isUserABot;

export const selectSelectedEntityOption = (state: State) =>
  state.general.selectedEntityOption;

export const selectInvalidJWT = (state: State) => state.general.invalidJWT;

export const selectSelectedViewOption = (state: State) =>
  state.general.selectedViewOption;

export const selectEntityQueryValues = (state: State) =>
  state.general.entityQueryValues;

export const selectShowProfileEmail = (state: State) =>
  state.general.showProfileEmail;

export const selectVerifiedPassword = (state: State) =>
  state.general.verifiedPassword;

export const selectLoadingUpdateProfile = (state: State) =>
  state.general.loadingUpdateProfile;

export const selectTypeOfUpdateAccountQuery = (state: State) =>
  state.general.typeOfUpdateAccountQuery;

export const selectCurrentGuideSection = (state: State) =>
  state.general.currentGuideSection;

export const selectWarningOverlay = (state: State) =>
  state.general.warningOverlay;

export const selectLoadingSigninProfile = (state: State) =>
  state.general.loadingSigninProfile;
