// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import MealPrepPlanCreateBodyType from "@/core/types/entity/mealPrepPlan/MealPrepPlanCreateBodyType";
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
// Reducer
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  MealPrepPlanCreateBodyType
>(
  "mealPrepPlans/createMealPrepPlan",
  async ({ templateMealPrepPlan, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/mealPrepPlans/create",
        templateMealPrepPlan,
        { params: { userId: userId } }
      );
      return data.mealPrepPlan as MealPrepPlanType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserMealPrepPlans = createAsyncThunk<
  MealPrepPlanType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepPlans/getAllUserMealPrepPlans",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/mealPrepPlans`, {
        params: {
          userId,
          userMealPrepPlans: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
          includeUtensils: true,
          includeIngredients: true,
          includeRecipes: true,
          includeDayTemplates: true,
          includeInstanceTemplates: true,
        },
      });
      return data.mealPrepPlans as MealPrepPlanType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  { userId: string; mealPrepPlanId: string }
>("mealPrepPlans/getUserMealPrepPlan", async ({ userId, mealPrepPlanId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/mealPrepPlans/${mealPrepPlanId}`,
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
          includeInstanceTemplates: true,
          includeInstanceTemplatesMacros: true,
          includeInstanceTemplatesTimings: true,
        },
      }
    );
    return data.mealPrepPlan as MealPrepPlanType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  { mealPrepPlanId: string; userId: string }
>("mealPrepPlans/deleteMealPrepPlan", async ({ mealPrepPlanId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/mealPrepPlans/delete/${mealPrepPlanId}?userId=${userId}`
    );
    return data.mealPrepPlan as MealPrepPlanType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  MealPrepPlanCreateBodyType
>(
  "mealPrepPlans/updateMealPrepPlan",
  async ({ templateMealPrepPlan, userId }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/mealPrepPlans/update/${templateMealPrepPlan.id}?userId=${userId}&updateMealPrepPlanSingle=true`,
        templateMealPrepPlan
      );
      return data.mealPrepPlan as MealPrepPlanType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);
