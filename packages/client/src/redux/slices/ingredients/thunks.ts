// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import IngredientCreateBodyType from "@/core/types/entity/ingredient/IngredientCreateBodyType";
import IngredientType from "@/core/types/entity/ingredient/IngredientType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const createIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  IngredientCreateBodyType
>("ingredients/createIngredient", async ({ templateIngredient, userId }) => {
  try {
    console.log(templateIngredient);
    const { data } = await axiosInstance.post(
      "/ingredients/create",
      templateIngredient,
      { params: { userId: userId } }
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getAllUserIngredients = createAsyncThunk<
  IngredientType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "ingredients/getAllUserIngredients",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/ingredients`, {
        params: {
          userId,
          userIngredients: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
        },
      });
      return data.ingredients as IngredientType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  { userId: string; ingredientId: string }
>("ingredients/getUserIngredient", async ({ userId, ingredientId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/ingredients/${ingredientId}`,
      {
        params: {
          includeMacros: true,
          includeUser: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeDayTemplatesRecipes: true,
          includeInstanceTemplates: true,
          includeInstanceTemplatesMacros: true,
          includeInstanceTemplatesDayTemplates: true,
          includeMealPrepPlans: true,
          includeMealPrepPlansMacros: true,
          includeMealPrepPlansInstanceTemplates: true,
        },
      }
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  { ingredientId: string; userId: string }
>("ingredients/deleteIngredient", async ({ ingredientId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/ingredients/delete/${ingredientId}?userId=${userId}`
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  IngredientCreateBodyType
>("ingredients/updateIngredient", async ({ templateIngredient, userId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/ingredients/update/${templateIngredient.id}?userId=${userId}&updateIngredientSingle=true`,
      templateIngredient
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});
