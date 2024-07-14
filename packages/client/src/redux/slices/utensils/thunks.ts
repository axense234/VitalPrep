// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import UtensilCreateBodyType from "@/core/types/entity/utensil/UtensilCreateBodyType";
import UtensilType from "@/core/types/entity/utensil/UtensilType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createUtensil = createAsyncThunk<
  UtensilType | AxiosError,
  UtensilCreateBodyType
>("utensils/createUtensil", async ({ templateUtensil, userId }) => {
  try {
    console.log(templateUtensil);
    const { data } = await axiosInstance.post(
      "/utensils/create",
      templateUtensil,
      { params: { userId: userId } }
    );
    return data.utensil as UtensilType;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getAllUserUtensils = createAsyncThunk<
  UtensilType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>("utensils/getAllUserUtensils", async ({ userId, entityQueryValues }) => {
  try {
    const { searchByKey, searchByValue, sortByKey, sortByOrder } =
      entityQueryValues;
    const { data } = await axiosInstance.get(`/utensils`, {
      params: {
        userUtensils: true,
        userId,
        userIngredients: true,
        searchByKey,
        searchByValue,
        sortByKey,
        sortByOrder,
      },
    });
    return data.utensils as UtensilType[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getUserUtensil = createAsyncThunk<
  UtensilType | AxiosError,
  { userId: string; utensilId: string }
>("utensils/getUserUtensil", async ({ userId, utensilId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/utensils/${utensilId}`,
      {
        params: {
          includeUser: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeDayTemplatesRecipes: true,
          includeInstanceTemplates: true,
          includeInstanceTemplatesDayTemplates: true,
          includeMealPrepPlans: true,
          includeMealPrepPlansInstanceTemplates: true,
        },
      }
    );
    return data.utensil as UtensilType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteUtensil = createAsyncThunk<
  UtensilType | AxiosError,
  { utensilId: string; userId: string }
>("utensils/deleteUtensil", async ({ utensilId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/utensils/delete/${utensilId}?userId=${userId}`
    );
    return data.utensil as UtensilType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateUtensil = createAsyncThunk<
  UtensilType | AxiosError,
  UtensilCreateBodyType
>("utensils/updateUtensil", async ({ templateUtensil, userId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/utensils/update/${templateUtensil.id}?userId=${userId}&updateUtensilSingle=true`,
      templateUtensil
    );
    return data.utensil as UtensilType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});
