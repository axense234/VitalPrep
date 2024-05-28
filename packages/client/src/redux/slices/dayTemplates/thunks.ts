// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import DayTemplateCreateBodyType from "@/core/types/entity/dayTemplate/DayTemplateCreateBodyType";
import DayTemplateType from "@/core/types/entity/dayTemplate/DayTemplateType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  DayTemplateCreateBodyType
>("dayTemplates/createDayTemplate", async ({ templateDayTemplate, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/dayTemplates/create",
      templateDayTemplate,
      { params: { userId: userId } }
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getAllUserDayTemplates = createAsyncThunk<
  DayTemplateType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "dayTemplates/getAllUserDayTemplates",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/dayTemplates`, {
        params: {
          userId,
          userDayTemplates: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
          includeIngredients: true,
          includeUtensils: true,
          includeRecipes: true,
          includeInstanceTemplates: true,
          includeMealPrepPlans: true,
        },
      });
      return data.dayTemplates as DayTemplateType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  { userId: string; dayTemplateId: string }
>("dayTemplates/getUserDayTemplate", async ({ userId, dayTemplateId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/dayTemplates/${dayTemplateId}`,
      {
        params: {
          includeMacros: true,
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeInstanceTemplates: true,
          includeMealPrepPlans: true,
        },
      }
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  { dayTemplateId: string; userId: string }
>("dayTemplates/deleteDayTemplate", async ({ dayTemplateId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/dayTemplates/delete/${dayTemplateId}?userId=${userId}`
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  DayTemplateCreateBodyType
>("dayTemplates/updateDayTemplate", async ({ templateDayTemplate, userId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/dayTemplates/update/${templateDayTemplate.id}?userId=${userId}&updateDayTemplateSingle=true`,
      templateDayTemplate
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});
