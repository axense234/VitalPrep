// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import InstanceTemplateCreateBodyType from "@/core/types/entity/instanceTemplate/InstanceTemplateCreateBodyType";
import InstanceTemplateType from "@/core/types/entity/instanceTemplate/InstanceTemplateType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  InstanceTemplateCreateBodyType
>(
  "instanceTemplates/createInstanceTemplate",
  async ({ templateInstanceTemplate, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/instanceTemplates/create",
        templateInstanceTemplate,
        { params: { userId: userId } }
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserInstanceTemplates = createAsyncThunk<
  InstanceTemplateType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "instanceTemplates/getAllUserInstanceTemplates",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/instanceTemplates`, {
        params: {
          userId,
          userInstanceTemplates: true,
          includeMacros: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeIngredients: true,
          includeUtensils: true,
          includeRecipes: true,
          includeDayTemplates: true,
          includeMealPrepPlans: true,
        },
      });
      return data.instanceTemplates as InstanceTemplateType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  { userId: string; instanceTemplateId: string }
>(
  "instanceTemplates/getUserInstanceTemplate",
  async ({ userId, instanceTemplateId }) => {
    try {
      const { data } = await axiosInstance.get(
        `/${userId}/instanceTemplates/${instanceTemplateId}`,
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
            includeMealPrepPlans: true,
          },
        }
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const deleteInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  { instanceTemplateId: string; userId: string }
>(
  "instanceTemplates/deleteInstanceTemplate",
  async ({ instanceTemplateId, userId }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/instanceTemplates/delete/${instanceTemplateId}?userId=${userId}`
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const updateInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  InstanceTemplateCreateBodyType
>(
  "instanceTemplates/updateInstanceTemplate",
  async ({ templateInstanceTemplate, userId }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/instanceTemplates/update/${templateInstanceTemplate.id}?userId=${userId}&updateInstanceTemplateSingle=true`,
        templateInstanceTemplate
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);
