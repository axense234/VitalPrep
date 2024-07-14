// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import MealPrepLogCreateBodyType from "@/core/types/entity/mealPrepLog/MealPrepLogCreateBodyType";
import MealPrepLogType from "@/core/types/entity/mealPrepLog/MealPrepLogType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  MealPrepLogCreateBodyType
>("mealPrepLogs/createMealPrepLog", async ({ templateMealPrepLog, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/mealPrepLogs/create",
      templateMealPrepLog,
      { params: { userId: userId } }
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getAllUserMealPrepLogs = createAsyncThunk<
  MealPrepLogType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepLogs/getAllUserMealPrepLogs",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/mealPrepLogs`, {
        params: {
          userMealPrepLogs: true,
          userId,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeInstanceTemplate: true,
          includeInstanceTemplateMacros: true,
        },
      });
      return data.mealPrepLogs as MealPrepLogType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  { userId: string; mealPrepLogId: string }
>("mealPrepLogs/getUserMealPrepLog", async ({ userId, mealPrepLogId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/mealPrepLogs/${mealPrepLogId}`,
      {
        params: {
          includeMacros: true,
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeDayTemplatesRecipes: true,
          includeMealPrepPlans: true,
          includeInstanceTemplate: true,
          includeInstanceTemplateMacros: true,
        },
      }
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  { mealPrepLogId: string; userId: string }
>("mealPrepLogs/deleteMealPrepLog", async ({ mealPrepLogId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/mealPrepLogs/delete/${mealPrepLogId}?userId=${userId}`
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  MealPrepLogCreateBodyType
>("mealPrepLogs/updateMealPrepLog", async ({ templateMealPrepLog, userId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/mealPrepLogs/update/${templateMealPrepLog.id}?userId=${userId}&updateMealPrepLogSingle=true`,
      templateMealPrepLog
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});
