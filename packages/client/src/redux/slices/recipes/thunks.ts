// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import RecipeCreateBodyType from "@/core/types/entity/recipe/RecipeCreateBodyType";
import RecipeType from "@/core/types/entity/recipe/RecipeType";
// Redux
import { createAsyncThunk } from "@reduxjs/toolkit";
// Axios
import axiosInstance from "@/utils/axios";
import { AxiosError } from "axios";

export const createRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  RecipeCreateBodyType
>(
  "recipes/createRecipe",
  async ({
    templateRecipe,
    userId,
    showWrittenTutorialContent,
    showVideoTutorialContent,
  }) => {
    try {
      if (!showWrittenTutorialContent) {
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            writtenTutorial: "",
          },
        };
      }

      if (!showVideoTutorialContent) {
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            videoTutorial: "",
          },
        };
      }

      const { data } = await axiosInstance.post(
        "/recipes/create",
        templateRecipe,
        { params: { userId: userId } }
      );
      return data.recipe as RecipeType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserRecipes = createAsyncThunk<
  RecipeType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>("recipes/getAllUserRecipes", async ({ userId, entityQueryValues }) => {
  try {
    const { searchByKey, searchByValue, sortByKey, sortByOrder } =
      entityQueryValues;
    const { data } = await axiosInstance.get(`/recipes`, {
      params: {
        userRecipes: true,
        userId,
        includeIngredients: true,
        includeUtensils: true,
        searchByKey,
        searchByValue,
        sortByKey,
        sortByOrder,
        includeMacros: true,
        includeRecipeTutorial: true,
      },
    });
    return data.recipes as RecipeType[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getUserRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  { userId: string; recipeId: string }
>("recipes/getUserRecipe", async ({ userId, recipeId }) => {
  try {
    const { data } = await axiosInstance.get(`/${userId}/recipes/${recipeId}`, {
      params: {
        includeRecipeTutorial: true,
        includeMacros: true,
        includeIngredients: true,
        includeIngredientsMacros: true,
        includeUtensils: true,
        includeDayTemplates: true,
        includeInstanceTemplates: true,
        includeMealPrepPlans: true,
      },
    });
    return data.recipe as RecipeType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  { recipeId: string; userId: string }
>("recipes/deleteRecipe", async ({ recipeId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/recipes/delete/${recipeId}?userId=${userId}`
    );
    return data.recipe as RecipeType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  RecipeCreateBodyType
>(
  "recipes/updateRecipe",
  async ({
    templateRecipe,
    userId,
    showVideoTutorialContent,
    showWrittenTutorialContent,
  }) => {
    try {
      if (!showWrittenTutorialContent) {
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            writtenTutorial: "",
          },
        };
      }

      if (!showVideoTutorialContent) {
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            videoTutorial: "",
          },
        };
      }

      const { data } = await axiosInstance.patch(
        `/recipes/update/${templateRecipe.id}?userId=${userId}&updateRecipeSingle=true`,
        templateRecipe
      );
      return data.recipe as RecipeType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);
