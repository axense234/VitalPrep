// Types
import GeneralSliceInitialStateType from "@/core/types/entity/general/GeneralSliceInitialStateType";
import UserType from "@/core/types/entity/users/UserType";
import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
// Thunks
import {
  getProfileOAuth,
  getProfileJWT,
  signupUserOAuth,
  signupUser,
  updateUser,
  signinUserThroughOAuth,
  loginUser,
  logoutUser,
  createCloudinaryImage,
} from "./thunks";

const generalSliceExtraReducers: (
  builder: ActionReducerMapBuilder<GeneralSliceInitialStateType>
) => void = (builder) => {
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
          state.loadingGetOAuthProfile = "IDLE";
          state.loadingGetProfile = "IDLE";
          state.loadingSigninProfile = "SUCCEDED";
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
    .addCase(
      createCloudinaryImage.fulfilled,
      (
        state,
        action: PayloadAction<{
          type: "general" | "notifications";
          imageUrl: string;
        }>
      ) => {
        if (action.payload.type === "general") {
          state.templateImageUrl = action.payload.imageUrl;
        } else if (action.payload.type === "notifications") {
          state.templateNotificationsImageUrl = action.payload.imageUrl;
        }
        state.loadingCloudinaryImage = "SUCCEDED";
      }
    );
};

export default generalSliceExtraReducers;
