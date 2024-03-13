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
import { SignInResponse, getSession, signIn, signOut } from "next-auth/react";
// Data
import { defaultProfile, defaultTemplateProfile } from "@/data";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type InitialStateType = {
  // General
  isSidebarOpened: boolean;
  loadingCloudinaryImage: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  templateImageUrl: string;
  templateModalMessage: string;
  showFormModal: boolean;
  showGeneralModal: boolean;

  // Auth
  loadingProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  profile: UserType;
  templateProfile: UserTemplate;
  loadingCreateProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingCreateOAuthProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingLoginProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingLoginOAuthProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingGetProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
  loadingGetOAuthProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
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
  usedOnlyForSignin: boolean;
};

const initialState: InitialStateType = {
  // General
  isSidebarOpened: false,
  loadingCloudinaryImage: "IDLE",
  templateImageUrl: "",
  templateModalMessage: "",
  showFormModal: false,
  showGeneralModal: false,

  // Auth
  loadingProfile: "IDLE",
  profile: defaultProfile,
  templateProfile: defaultTemplateProfile,
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

export const signupUserOAuth = createAsyncThunk<User | AxiosError | null>(
  "general/signupUserOAuth",
  async () => {
    try {
      const session = await getSession();
      const userTemplate = { ...defaultTemplateProfile } as UserTemplate;
      userTemplate.username = (session?.user?.name as string) || "User";
      userTemplate.email =
        (session?.user?.email as string) || "email@provider.com";
      userTemplate.imageUrl =
        (session?.user?.image as string) || userTemplate.imageUrl;

      const { data } = await axiosInstance.post("/users/signup", userTemplate, {
        params: { throughOAuth: true },
      });
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const signinUserThroughOAuth = createAsyncThunk<
  boolean,
  SigninUserThroughOAuth
>(
  "general/signinUserThroughOAuth",
  async ({ providerName, usedOnlyForSignin }) => {
    try {
      await signIn(providerName, { redirect: false });
      return usedOnlyForSignin;
    } catch (error) {
      console.log(error);
      throw new Error("Invalid signup user oauth function call.");
    }
  }
);

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
      "https://api.cloudinary.com/v1_1/birthdayreminder/image/upload",
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
      action: PayloadAction<"IDLE" | "SUCCEDED" | "FAILED" | "PENDING">
    ) {
      state.loadingCreateProfile = action.payload;
    },
    manipulateLoadingLoginProfile(
      state,
      action: PayloadAction<"IDLE" | "SUCCEDED" | "FAILED" | "PENDING">
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
        state.templateModalMessage = `Trying to find your account`;
      })
      .addCase(getProfileOAuth.fulfilled, (state, action) => {
        const user = action.payload;
        console.log(user);
        console.log("oauth");
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
          state.templateModalMessage = `Found your account, redirecting`;
        } else if (!user) {
          state.loadingGetOAuthProfile = "FAILED";
          state.templateModalMessage = "Failed to get account";
        }
      })
      .addCase(getProfileJWT.pending, (state, action) => {
        state.loadingGetProfile = "PENDING";
        state.templateModalMessage = `Trying to find your account`;
      })
      .addCase(getProfileJWT.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;
        console.log("jwt");

        if (!axiosError.response) {
          state.profile = user;
          state.loadingGetProfile = "SUCCEDED";
          state.templateModalMessage = `Found your account, redirecting`;
        } else {
          localStorage.removeItem("userId");
          state.loadingGetProfile = "FAILED";
          state.templateModalMessage = "Failed to get account";
        }
      })
      .addCase(signupUserOAuth.pending, (state, action) => {
        state.loadingCreateOAuthProfile = "PENDING";
      })
      .addCase(signupUserOAuth.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;
        console.log(axiosError);

        if (!axiosError?.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingCreateOAuthProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully signed up user: ${user.username}`;
          state.showGeneralModal = false;
          setTimeout(() => {
            window.location.href = `${baseSiteUrl}/home`;
          }, 1500);
        } else {
          const errorData = axiosError.response.data as { message: string };
          state.loadingCreateOAuthProfile = "FAILED";
          state.showGeneralModal = false;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(signupUserOAuth.rejected, (state, action) => {
        console.log(action.payload);
        console.log("cal");
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loadingCreateProfile = "PENDING";
        state.templateModalMessage = `Trying to create your account`;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
          localStorage.setItem("userId", user.id);
          state.profile = user;
          state.loadingCreateProfile = "SUCCEDED";
          state.templateModalMessage = `Successfully signed up user: ${user.username}`;
          state.showGeneralModal = false;
          setTimeout(() => {
            window.location.href = `${baseSiteUrl}/home`;
          }, 1500);
        } else {
          const errorData = axiosError.response.data as { message: string };
          state.loadingCreateProfile = "FAILED";
          state.showGeneralModal = false;
          state.templateModalMessage = errorData.message;
        }
      })
      .addCase(signinUserThroughOAuth.pending, (state, action) => {
        state.loadingLoginOAuthProfile = "PENDING";
        state.templateModalMessage = `Trying to create your account`;
      })
      .addCase(signinUserThroughOAuth.fulfilled, (state, action) => {
        state.loadingLoginOAuthProfile = "SUCCEDED";
        state.templateModalMessage = `Successfully logged in`;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loadingLoginProfile = "PENDING";
        state.templateModalMessage = "Trying to log in";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
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
          state.templateModalMessage = errorData.message;
        }
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

export const {
  changeIsSidebarOpened,
  updateTemplateProfile,
  changeShowFormModal,
  changeShowGeneralModal,
  manipulateLoadingCreateProfile,
  manipulateLoadingLoginProfile,
} = generalSlice.actions;

export default generalSlice.reducer;
