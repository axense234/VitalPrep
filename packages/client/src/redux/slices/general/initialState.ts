// Types
import GeneralSliceInitialStateType from "@/core/types/entity/general/GeneralSliceInitialStateType";
// Data
import {
  defaultEntityQueryValues,
  defaultProfile,
  defaultTemplateProfile,
} from "@/data";

const generalSliceInitialState: GeneralSliceInitialStateType = {
  // General
  isSidebarOpened: false,
  loadingCloudinaryImage: "IDLE",
  templateImageUrl: "",
  templateNotificationsImageUrl: "",
  templateModalMessage: "",
  showFormModal: false,
  showGeneralModal: false,
  isModalUsedWhenLoading: false,

  currentGuideSection: "basics",

  selectedEntityOption: "ingredient",
  selectedViewOption: "grid",

  showProfileEmail: false,

  // Overlay
  warningOverlay: {
    overlayMessage: "Default Overlay Message",
    showOverlay: false,
    onConfirmFunction: () => {},
    countdownSeconds: 5,
  },

  // Query
  entityQueryValues: defaultEntityQueryValues,
  typeOfUpdateAccountQuery: "account",

  // Auth
  profile: defaultProfile,
  templateProfile: defaultTemplateProfile,
  isUserABot: true,
  invalidJWT: false,
  loadingProfile: "IDLE",
  loadingCreateProfile: "IDLE",
  loadingLoginProfile: "IDLE",
  loadingGetProfile: "IDLE",
  loadingSigninProfile: "IDLE",
  loadingCreateOAuthProfile: "IDLE",
  loadingLoginOAuthProfile: "IDLE",
  loadingGetOAuthProfile: "IDLE",
  loadingUpdateProfile: "IDLE",

  verifiedPassword: "",
};

export default generalSliceInitialState;
