// Config
import { baseSiteUrl } from "@/config";
// Types
import { User } from "@prisma/client";
import CreateCloudinaryImageTemplateType from "@/core/types/entity/general/CreateCloudinaryImageTemplateType";
import SigninUserThroughOAuthTemplateType from "@/core/types/entity/general/SigninUserThroughOAuthTemplateType";
import UpdateAccountQueryType from "@/core/types/entity/general/UpdateAccountQueryType";
import UserTemplate from "@/core/types/entity/mutation/UserTemplate";
// Data
import { defaultTemplateProfile } from "@/data";
// Helpers
import { logoutOneSignal } from "@/helpers/initializeOneSignal";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axios, { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
// Next Auth
import { getSession, signIn, signOut } from "next-auth/react";

export const logoutUser = createAsyncThunk("general/logoutUser", async () => {
  try {
    const userId = localStorage.getItem("userId");
    await axiosInstance.post(`/users/signout/${userId}`).then(() => {
      localStorage.removeItem("userId");
    });
    logoutOneSignal();
    await signOut({
      redirect: true,
      callbackUrl: `${process.env.NEXT_PUBLIC_PRODUCTION_CLIENT_SITE_URL}/`,
    });
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
        `/users/null?userEmail=${session?.user?.email}`,
        {
          params: {
            includeIngredients: true,
            includeIngredientsMacros: true,
            includeUtensils: true,
            includeRecipes: true,
            includeRecipesMacros: true,
            includeDayTemplates: true,
            includeDayTemplatesMacros: true,
            includeInstanceTemplates: true,
            includeInstanceTemplatesMacros: true,
            includeMealPrepPlans: true,
            includeMealPrepPlansMacros: true,
            includeMealPrepLogs: true,
            includeNotificationSettings: true,
          },
        }
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
    console.log(`${baseSiteUrl}/home`);
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await axiosInstance.get(`/users/${userId}`, {
        params: {
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeInstanceTemplates: true,
          includeInstanceTemplatesMacros: true,
          includeMealPrepPlans: true,
          includeMealPrepPlansMacros: true,
          includeMealPrepLogs: true,
          includeNotificationSettings: true,
        },
      });
      localStorage.setItem("userId", data.user.id);
      return data.user as User;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const signupUserOAuth = createAsyncThunk<User | AxiosError, string>(
  "general/signupUserOAuth",
  async (locale: string) => {
    try {
      const session = await getSession();
      const userTemplate = { ...defaultTemplateProfile } as UserTemplate;

      userTemplate.username = session?.user?.name as string;
      userTemplate.email = session?.user?.email as string;
      userTemplate.imageUrl =
        (session?.user?.image as string) || userTemplate.imageUrl;

      const { data } = await axiosInstance.post("/users/signup", userTemplate, {
        params: { throughOAuth: true, locale },
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
  SigninUserThroughOAuthTemplateType
>(
  "general/signinUserThroughOAuth",
  async ({ providerName, pageType, locale }) => {
    try {
      await signIn(providerName, {
        redirect: true,
        callbackUrl: `${baseSiteUrl}/${locale}/home`,
      });
      return pageType;
    } catch (error) {
      return error;
    }
  }
);

export const signupUser = createAsyncThunk<
  User | AxiosError,
  { userTemplate: UserTemplate; locale: string }
>("general/signupUser", async ({ userTemplate, locale }) => {
  try {
    const { data } = await axiosInstance.post("/users/signup", userTemplate, {
      params: { locale },
    });
    localStorage.setItem("userId", data.user.id);
    return data.user as User;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateUser = createAsyncThunk<
  User | AxiosError,
  { userTemplate: UserTemplate; typeOfUpdate: UpdateAccountQueryType }
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
  { type: "general" | "notifications"; imageUrl: string } | any,
  CreateCloudinaryImageTemplateType
>(
  "general/createCloudinaryImage",
  async ({ imageFile, entity, type = "general" }) => {
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", `vitalprep-${entity}`);
      const { data } = await axios.post(
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_IMAGE_URL as string,
        formData
      );
      return { imageUrl: data.secure_url, type: type };
    } catch (error) {
      return error;
    }
  }
);
