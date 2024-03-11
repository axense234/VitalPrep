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
import { baseSiteUrl } from "@/config";

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
  loadingLoginProfile: "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";
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
  profile: {
    id: "",
    username: "",
    email: "",
    password: "",
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg",
    age: 8,
    ingredients: [],
    utensils: [],
    recipes: [],
    dayTemplates: [],
    instanceTemplates: [],
    mealPrepPlans: [],
    mealPrepLogs: [],
    notificationSettings: {
      id: "",
      allowedNotifications: true,
      notificationImageUrl: "",
      notificationStyle: "default",
    },
    notificationSettingsId: "",
  },
  templateProfile: {
    username: "",
    email: "",
    password: "",
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg",
    age: 8,
  },
  loadingCreateProfile: "IDLE",
  loadingLoginProfile: "IDLE",
};

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
    changeShowFormModal(state, action: PayloadAction<boolean>) {
      state.showFormModal = action.payload;
    },
    changeShowGeneralModal(state, action: PayloadAction<boolean>) {
      state.showGeneralModal = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state, action) => {
        state.loadingCreateProfile = "PENDING";
        state.templateModalMessage = `Trying to create an account`;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
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
      .addCase(loginUser.pending, (state, action) => {
        state.loadingLoginProfile = "PENDING";
        state.templateModalMessage = "Trying to log in";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload as UserType;
        const axiosError = action.payload as AxiosError;

        if (!axiosError.response) {
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

export const {
  changeIsSidebarOpened,
  updateTemplateProfile,
  changeShowFormModal,
  changeShowGeneralModal,
} = generalSlice.actions;

export default generalSlice.reducer;
