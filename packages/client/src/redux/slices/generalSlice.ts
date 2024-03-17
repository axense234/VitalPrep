// Redux Toolkit
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "../api/store";
// Types
import UserType from "@/core/types/entity/UserType";
import UserTemplate from "@/core/types/entity/mutation/UserTemplate";
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
import { defaultProfile, defaultTemplateProfile } from "@/data";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type LoadingStateType = "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";

type InitialStateType = {
  // General
  isSidebarOpened: boolean;
  loadingCloudinaryImage: LoadingStateType;
  templateImageUrl: string;
  templateModalMessage: string;
  showFormModal: boolean;
  showGeneralModal: boolean;
  isModalUsedWhenLoading: boolean;

  // Auth
  profile: UserType;
  templateProfile: UserTemplate;
  isUserABot: boolean;

  loadingProfile: LoadingStateType;
  loadingCreateProfile: LoadingStateType;
  loadingCreateOAuthProfile: LoadingStateType;
  loadingLoginProfile: LoadingStateType;
  loadingLoginOAuthProfile: LoadingStateType;
  loadingGetProfile: LoadingStateType;
  loadingGetOAuthProfile: LoadingStateType;
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
    | "mealPrepPlans";
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

  // Auth
  profile: defaultProfile,
  templateProfile: defaultTemplateProfile,
  isUserABot: true,
  loadingProfile: "IDLE",
  loadingCreateProfile: "IDLE",
  loadingLoginProfile: "IDLE",
  loadingGetProfile: "IDLE",
  loadingCreateOAuthProfile: "IDLE",
  loadingLoginOAuthProfile: "IDLE",
  loadingGetOAuthProfile: "IDLE",
};

export const logoutUser = createAsyncThunk("general/logoutUser", async () => {
  try {
    const userId = localStorage.getItem("userId");
    await axiosInstance.post(`/users/signout/${userId}`);
    localStorage.removeItem("userId");
    signOut({ redirect: true, callbackUrl: "http://localhost:3000/" });
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
      return session?.user;
    } catch (error) {
      console.log(error);
      throw new Error("Something is wrong with the user's session.");
    }
  }
);

export const getProfileJWT = createAsyncThunk(
  "general/getProfileJWT",
  async () => {
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axiosInstance.get(`/users/${userId}`);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const signupUserOAuth = createAsyncThunk(
  "general/signupUserOAuth",
  async () => {
    const waitForSignIn = async () => {
      const newSession = await getSession();
      if (newSession && newSession.user) {
        const userTemplate = { ...defaultTemplateProfile } as UserTemplate;
        userTemplate.username = (newSession?.user?.name as string) || "User";
        userTemplate.email =
          (newSession?.user?.email as string) || "email@provider.com";
        userTemplate.imageUrl =
          (newSession?.user?.image as string) || userTemplate.imageUrl;
        try {
          const { data } = await axiosInstance.post(
            "/users/signup",
            userTemplate,
            {
              params: { throughOAuth: true },
            }
          );
          return data.user as User;
        } catch (error) {
          console.log(error);
          return error;
        }
      } else {
        setTimeout(waitForSignIn, 10);
      }
    };
    return await waitForSignIn();
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
    return pageType as "login" | "signup";
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const signupUser = createAsyncThunk<User | AxiosError, UserTemplate>(
  "general/signupUser",
  async (userTemplate) => {
    try {
      const { data } = await axiosInstance.post("/users/signup", userTemplate);
      return data.user as User;
    } catch (error) {
      return error as AxiosError;
    }
  }
);

export const loginUser = createAsyncThunk<User | AxiosError, UserTemplate>(
  "general/loginUser",
  async (userTemplate) => {
    try {
      const { data } = await axiosInstance.post("/users/login", userTemplate);
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
        const user = action.payload;
        if (user) {
          if (user.name) {
            state.profile.username = user.name;
          }
          if (user.email) {
            state.profile.email = user.email;
          }
          if (user.image) {
            state.profile.imageUrl = user.image;
          }
          state.loadingGetOAuthProfile = "SUCCEDED";
          state.showGeneralModal = true;
          state.templateModalMessage = `Found existing account`;
        } else if (!user) {
          state.loadingGetOAuthProfile = "FAILED";
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
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError?.response) {
          state.profile = user;
          state.loadingGetProfile = "SUCCEDED";
          state.showGeneralModal = true;
          state.templateModalMessage = `Found existing account`;
        } else {
          localStorage.removeItem("userId");
          state.loadingGetProfile = "FAILED";
          state.showGeneralModal = true;
          state.templateModalMessage = "Failed to get account";
        }
      })
      .addCase(signupUserOAuth.pending, (state, action) => {
        state.loadingCreateOAuthProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = "Trying to signup";
      })
      .addCase(signupUserOAuth.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingCreateOAuthProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully signed up user: ${user.username}`;
          setTimeout(() => {
            window.location.href = `${baseSiteUrl}/home`;
          }, 1500);
          state.showGeneralModal = false;
        } else {
          state.loadingCreateOAuthProfile = "FAILED";
          state.showGeneralModal = false;
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
      .addCase(signinUserThroughOAuth.pending, (state, action) => {
        state.loadingLoginOAuthProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = `Trying to create / sign in account`;
        state.isModalUsedWhenLoading = true;
      })
      .addCase(signinUserThroughOAuth.fulfilled, (state, action) => {
        const pageType = action.payload as "login" | "signup";
        state.isModalUsedWhenLoading = false;
        state.loadingLoginOAuthProfile = "SUCCEDED";
        state.showGeneralModal = true;
        if (pageType === "login") {
          state.templateModalMessage = `Successfully logged in account`;
        } else if (pageType === "signup") {
          state.templateModalMessage = `Successfully created account`;
        }
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadingLoginProfile = "PENDING";
        state.showGeneralModal = true;
        state.templateModalMessage = "Trying to log in";
        state.isModalUsedWhenLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isModalUsedWhenLoading = false;
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError?.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingLoginProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully logged in as user: ${user.username}`;
          state.showGeneralModal = false;
          setTimeout(() => {
            window.location.href = `${baseSiteUrl}/home`;
          }, 1500);
        } else {
          const errorData = axiosError.response.data as { message: string };
          state.showGeneralModal = false;
          state.loadingLoginProfile = "FAILED";
          state.showFormModal = true;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.showGeneralModal = true;
        state.templateModalMessage = "Logging out";
        state.isModalUsedWhenLoading = true;
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

export const {
  changeIsSidebarOpened,
  updateTemplateProfile,
  changeShowFormModal,
  changeShowGeneralModal,
  manipulateLoadingCreateProfile,
  manipulateLoadingLoginProfile,
  changeIsUserABot,
} = generalSlice.actions;

export default generalSlice.reducer;
