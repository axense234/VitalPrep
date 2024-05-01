// Redux Toolkit
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "../api/store";
// Types
import UserType from "@/core/types/entity/UserType";
import UserTemplate from "@/core/types/entity/mutation/UserTemplate";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import { User } from "@prisma/client";
// Axios
import axiosInstance from "@/utils/axios";
// Axios
import axios, { AxiosError } from "axios";
// Config
import { baseSiteUrl } from "@/config";
// Next Auth
import { getSession, signIn, signOut } from "next-auth/react";
// Data
import {
  defaultEntityQueryValues,
  defaultProfile,
  defaultTemplateProfile,
} from "@/data";
// One Signal
import { logoutOneSignal } from "@/helpers/initializeOneSignal";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type LoadingStateType = "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
type TypeOfUpdateAccountQuery = "account" | "notification" | "mealPrepPlanUsed";

type InitialStateType = {
  // General
  isSidebarOpened: boolean;
  loadingCloudinaryImage: LoadingStateType;
  templateImageUrl: string;
  templateModalMessage: string;
  showFormModal: boolean;
  showGeneralModal: boolean;
  isModalUsedWhenLoading: boolean;

  selectedEntityOption: string;
  selectedViewOption: "grid" | "list";

  showProfileEmail: boolean;

  // Query
  entityQueryValues: EntityQueryValues;
  typeOfUpdateAccountQuery: TypeOfUpdateAccountQuery;

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
  loadingGetProfile: LoadingStateType;
  loadingGetOAuthProfile: LoadingStateType;
  loadingUpdateProfile: LoadingStateType;

  verifiedPassword: string;
};

type CreateCloudinaryImageTemplate = {
  imageFile: File;
  entity:
    | "users"
    | "utensils"
    | "ingredients"
    | "recipes"
    | "dayTemplates"
    | "instanceTemplates"
    | "mealPrepPlans"
    | "mealPrepLogs";
};

type SigninUserThroughOAuth = {
  providerName: "google" | "github";
  pageType: "login" | "signup";
};

const initialState: InitialStateType = {
  // General
  isSidebarOpened: false,
  loadingCloudinaryImage: "IDLE",
  templateImageUrl: "",
  templateModalMessage: "",
  showFormModal: false,
  showGeneralModal: false,
  isModalUsedWhenLoading: false,

  selectedEntityOption: "ingredient",
  selectedViewOption: "grid",

  showProfileEmail: false,

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
  loadingCreateOAuthProfile: "IDLE",
  loadingLoginOAuthProfile: "IDLE",
  loadingGetOAuthProfile: "IDLE",
  loadingUpdateProfile: "IDLE",

  verifiedPassword: "",
};

export const logoutUser = createAsyncThunk("general/logoutUser", async () => {
  try {
    const userId = localStorage.getItem("userId");
    await axiosInstance.post(`/users/signout/${userId}`).then(() => {
      localStorage.removeItem("userId");
    });
    await logoutOneSignal();
    await signOut({ redirect: true, callbackUrl: "http://localhost:3000/" });
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getProfileOAuth = createAsyncThunk(
  "general/getProfileOAuth",
  async () => {
    try {
      const session = await getSession();
      const { data } = await axiosInstance.get(
        `/users/null?userEmail=${session?.user?.email}`
      );
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getProfileJWT = createAsyncThunk(
  "general/getProfileJWT",
  async () => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axiosInstance.get(`/users/${userId}`);
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const signupUserOAuth = createAsyncThunk<User | AxiosError>(
  "general/signupUserOAuth",
  async () => {
    try {
      const session = await getSession();
      const userTemplate = { ...defaultTemplateProfile } as UserTemplate;

      userTemplate.username = session?.user?.name as string;
      userTemplate.email = session?.user?.email as string;
      userTemplate.imageUrl =
        (session?.user?.image as string) || userTemplate.imageUrl;

      const { data } = await axiosInstance.post("/users/signup", userTemplate, {
        params: { throughOAuth: true },
      });
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const signinUserThroughOAuth = createAsyncThunk<
  "login" | "signup" | unknown,
  SigninUserThroughOAuth
>("general/signinUserThroughOAuth", async ({ providerName, pageType }) => {
  try {
    await signIn(providerName, {
      redirect: true,
      callbackUrl: `${baseSiteUrl}/home`,
    });
    return pageType;
  } catch (error) {
    return error;
  }
});

export const signupUser = createAsyncThunk<User | AxiosError, UserTemplate>(
  "general/signupUser",
  async (userTemplate) => {
    try {
      const { data } = await axiosInstance.post("/users/signup", userTemplate);
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const updateUser = createAsyncThunk<
  User | AxiosError,
  { userTemplate: UserTemplate; typeOfUpdate: TypeOfUpdateAccountQuery }
>("general/updateUser", async ({ userTemplate, typeOfUpdate }) => {
  try {
    let requestParams: {
      accountProfileModifications?: boolean;
      accountNotificationModifications?: boolean;
      accountMealPrepPlanInUseIdModifications?: boolean;
    } = {};
    if (typeOfUpdate === "account") {
      requestParams.accountProfileModifications = true;
    } else if (typeOfUpdate === "notification") {
      requestParams.accountNotificationModifications = true;
    } else if (typeOfUpdate === "mealPrepPlanUsed") {
      requestParams.accountMealPrepPlanInUseIdModifications = true;
    }
    // @ts-ignore
    console.log(userTemplate.notificationSettings);

    const { data } = await axiosInstance.patch(
      `/users/update/${userTemplate.id}`,
      userTemplate,
      { params: requestParams }
    );
    return data.user as User;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const loginUser = createAsyncThunk<User | AxiosError, UserTemplate>(
  "general/loginUser",
  async (userTemplate) => {
    try {
      const { data } = await axiosInstance.post("/users/login", userTemplate);
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const createCloudinaryImage = createAsyncThunk<
  any,
  CreateCloudinaryImageTemplate
>("general/createCloudinaryImage", async ({ imageFile, entity }) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", `vitalprep-${entity}`);
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_URL as string,
      formData
    );
    return data.secure_url;
  } catch (error) {
    return error;
  }
});

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setTypeOfUpdateAccountQuery(
      state,
      action: PayloadAction<TypeOfUpdateAccountQuery>
    ) {
      state.typeOfUpdateAccountQuery = action.payload;
    },
    changeVerifiedPassword(state, action: PayloadAction<string>) {
      state.verifiedPassword = action.payload;
    },
    changeShowProfileEmail(state, action: PayloadAction<boolean>) {
      state.showProfileEmail = action.payload;
    },
    changeSelectedViewOption(state, action: PayloadAction<"grid" | "list">) {
      state.selectedViewOption = action.payload;
    },
    setTemplateModalMessage(state, action: PayloadAction<string>) {
      state.templateModalMessage = action.payload;
    },
    changeInvalidJWT(state, action: PayloadAction<boolean>) {
      state.invalidJWT = action.payload;
    },
    setSelectedEntityOption(state, action: PayloadAction<string>) {
      state.selectedEntityOption = action.payload;
    },
    changeIsUserABot(state, action: PayloadAction<boolean>) {
      state.isUserABot = action.payload;
    },
    changeIsSidebarOpened(state, action: PayloadAction<boolean>) {
      state.isSidebarOpened = action.payload;
    },
    updateTemplateProfile(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateProfile = {
        ...state.templateProfile,
        [action.payload.key]: action.payload.value,
      };
    },
    updateTemplateProfileNotificationSettings(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      (state.templateProfile as UserType).notificationSettings = {
        ...(state.templateProfile as UserType).notificationSettings,
        [action.payload.key]: action.payload.value,
      };
    },
    setTemplateProfile(state, action: PayloadAction<UserType>) {
      state.templateProfile = action.payload;
    },
    updateEntityQueryValues(state, action: PayloadAction<ObjectKeyValueType>) {
      state.entityQueryValues = {
        ...state.entityQueryValues,
        [action.payload.key]: action.payload.value,
      };
    },
    manipulateLoadingCreateProfile(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateProfile = action.payload;
    },
    manipulateLoadingLoginProfile(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingLoginProfile = action.payload;
    },
    changeShowFormModal(state, action: PayloadAction<boolean>) {
      state.showFormModal = action.payload;
    },
    changeShowGeneralModal(state, action: PayloadAction<boolean>) {
      state.showGeneralModal = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProfileOAuth.pending, (state, action) => {
        state.loadingGetOAuthProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = `Trying to find your account`;
        state.isModalUsedWhenLoading = true;
      })
      .addCase(getProfileOAuth.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError?.response) {
          state.profile = user;
          state.loadingGetOAuthProfile = "SUCCEDED";
          state.templateModalMessage = `Found existing account`;
        } else {
          state.loadingGetOAuthProfile = "FAILED";
          state.templateModalMessage = "Failed to get account";
        }
      })
      .addCase(getProfileJWT.pending, (state, action) => {
        state.loadingGetProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = `Trying to find your account`;
        state.isModalUsedWhenLoading = true;
      })
      .addCase(getProfileJWT.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError?.response) {
          state.profile = user;
          state.loadingGetProfile = "SUCCEDED";
          state.showGeneralModal = true;
          state.templateModalMessage = `Found existing account`;
        } else {
          const errorData = axiosError?.response?.data as {
            message: string;
            type?: string;
          };
          if (errorData.type && errorData.type === "jwt") {
            state.invalidJWT = true;
          }
          state.loadingGetProfile = "FAILED";
          state.showGeneralModal = true;
          state.templateModalMessage = "Failed to get account";
        }
      })
      .addCase(signupUserOAuth.pending, (state, action) => {
        state.loadingCreateOAuthProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = "Trying to signup";
        state.isModalUsedWhenLoading = true;
      })
      .addCase(signupUserOAuth.fulfilled, (state, action) => {
        localStorage.removeItem("createVitalPrepAccount");
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingCreateOAuthProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully signed up user: ${user.username}`;
        } else {
          const errorData = axiosError?.response?.data as {
            message: string;
            type: "email" | "normal";
          };
          if (errorData.type === "email") {
            state.loadingCreateOAuthProfile = "FAILED";
            state.templateModalMessage = `Successfully signed in your account!`;
          } else {
            state.loadingCreateOAuthProfile = "FAILED";
            state.templateModalMessage = errorData.message;
          }
        }
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loadingCreateProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = `Trying to create your account`;
        state.isModalUsedWhenLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.showGeneralModal = true;
          state.loadingCreateProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully signed up user: ${user.username}`;
        } else {
          const errorData = axiosError?.response?.data as { message: string };
          state.loadingCreateProfile = "FAILED";
          state.showGeneralModal = false;
          state.showFormModal = true;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loadingUpdateProfile = "PENDING";
        state.showGeneralModal = true;
        if (state.typeOfUpdateAccountQuery === "account") {
          state.templateModalMessage = `Trying to update your account details settings`;
        } else if (state.typeOfUpdateAccountQuery === "mealPrepPlanUsed") {
          state.templateModalMessage = `Trying to update your used Meal Prep Plan`;
        } else if (state.typeOfUpdateAccountQuery === "notification") {
          state.templateModalMessage = `Trying to update your account notification settings`;
        }
        state.isModalUsedWhenLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;
        console.log(user);

        if (axiosError !== undefined && !axiosError.response) {
          state.profile = user;
          state.showGeneralModal = true;
          state.loadingUpdateProfile = "SUCCEDED";
          if (state.typeOfUpdateAccountQuery === "account") {
            state.templateModalMessage = `Successfully updated user ${user.username}'s account settings.`;
          } else if (state.typeOfUpdateAccountQuery === "mealPrepPlanUsed") {
            state.templateModalMessage = `Updated user ${user.username}'s used Meal Prep Plan successfully.`;
          } else if (state.typeOfUpdateAccountQuery === "notification") {
            state.templateModalMessage = `Successfully updated user ${user.username}'s account notification settings.`;
          }
        } else {
          const errorData = axiosError?.response?.data as { message: string };
          state.loadingUpdateProfile = "FAILED";
          state.showGeneralModal = false;
          state.showFormModal = true;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(signinUserThroughOAuth.pending, (state, action) => {
        state.isModalUsedWhenLoading = true;
        state.loadingLoginOAuthProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = `Trying to create / sign in account`;
      })
      .addCase(signinUserThroughOAuth.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = true;
        state.invalidJWT = false;
        const pageType = action.payload as "signup" | "login";

        state.isModalUsedWhenLoading = false;
        state.loadingLoginOAuthProfile = "SUCCEDED";
        state.showGeneralModal = true;
        if (pageType === "login") {
          state.templateModalMessage = "Logging in";
        } else if (pageType === "signup") {
          localStorage.setItem("createVitalPrepAccount", "create");
        }
      })
      .addCase(signinUserThroughOAuth.rejected, (state, action) => {
        state.loadingLoginOAuthProfile = "FAILED";
        localStorage.removeItem("createVitalPrepAccount");
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadingLoginProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = "Trying to log in";
        state.isModalUsedWhenLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        state.invalidJWT = false;

        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError?.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingLoginProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully logged in as user: ${user.username}`;
          state.showGeneralModal = false;
        } else {
          const errorData = axiosError.response.data as { message: string };
          state.loadingLoginProfile = "FAILED";
          state.showGeneralModal = false;
          state.showFormModal = true;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.showGeneralModal = true;
        state.templateModalMessage = "Logging out";
        state.isModalUsedWhenLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.invalidJWT = false;
      })
      .addCase(createCloudinaryImage.pending, (state, action) => {
        state.loadingCloudinaryImage = "PENDING";
      })
      .addCase(createCloudinaryImage.fulfilled, (state, action) => {
        state.templateImageUrl = action.payload as string;
        state.loadingCloudinaryImage = "SUCCEDED";
      });
  },
});

export const selectIsSidebarOpened = (state: State) =>
  state.general.isSidebarOpened;

export const selectProfile = (state: State) => state.general.profile;

export const selectTemplateProfile = (state: State) =>
  state.general.templateProfile;

export const selectLoadingCloudinaryImage = (state: State) =>
  state.general.loadingCloudinaryImage;

export const selectTemplateImageUrl = (state: State) =>
  state.general.templateImageUrl;

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
} = generalSlice.actions;

export default generalSlice.reducer;
