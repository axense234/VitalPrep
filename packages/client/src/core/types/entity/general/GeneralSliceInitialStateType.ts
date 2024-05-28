import { SectionValueType } from "../../GettingStartedContentMapContentType";
import LoadingStateType from "../../LoadingStateType";
import EntityQueryValues from "../EntityQueryValues";
import UserTemplate from "../mutation/UserTemplate";
import EntityType from "../users/EntityType";
import UserType from "../users/UserType";
import UpdateAccountQueryType from "./UpdateAccountQueryType";

type GeneralSliceInitialStateType = {
  // General
  isSidebarOpened: boolean;
  loadingCloudinaryImage: LoadingStateType;
  templateImageUrl: string;
  templateNotificationsImageUrl: string;
  templateModalMessage: string;
  showFormModal: boolean;
  showGeneralModal: boolean;
  isModalUsedWhenLoading: boolean;

  selectedEntityOption: EntityType;
  selectedViewOption: "grid" | "list";

  showProfileEmail: boolean;

  currentGuideSection: SectionValueType;

  // Overlay
  warningOverlay: {
    overlayMessage: string;
    showOverlay: boolean;
    onConfirmFunction: any;
    countdownSeconds: number;
  };

  // Query
  entityQueryValues: EntityQueryValues;
  typeOfUpdateAccountQuery: UpdateAccountQueryType;

  // Auth
  profile: UserType;
  templateProfile: UserTemplate;
  isUserABot: boolean;
  invalidJWT: boolean;

  loadingProfile: LoadingStateType;
  loadingCreateProfile: LoadingStateType;
  loadingCreateOAuthProfile: LoadingStateType;
  loadingLoginProfile: LoadingStateType;
  loadingLoginOAuthProfile: LoadingStateType;
  loadingSigninProfile: LoadingStateType;
  loadingGetProfile: LoadingStateType;
  loadingGetOAuthProfile: LoadingStateType;
  loadingUpdateProfile: LoadingStateType;

  verifiedPassword: string;
};

export default GeneralSliceInitialStateType;
