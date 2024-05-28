// Types
import RecipeType from "@/core/types/entity/recipe/RecipeType";
import RecipesSliceStateType from "@/core/types/entity/recipe/RecipesSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axiox Error Type
import { AxiosError } from "axios";
// Adapter
import recipesAdapter from "./adapter";
// Thunks
import {
  getUserRecipe,
  getAllUserRecipes,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} from "./thunks";

const recipesSliceExtraReducers: (
  builder: ActionReducerMapBuilder<RecipesSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserRecipe.pending, (state, action) => {
      state.loadingGetUserRecipe = "PENDING";
    })
    .addCase(getUserRecipe.fulfilled, (state, action) => {
      const recipe = action.payload as RecipeType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        recipesAdapter.upsertOne(state, recipe as RecipeType);
        state.loadingGetUserRecipe = "SUCCEDED";
      } else {
        state.loadingGetUserRecipe = "FAILED";
      }
    })
    .addCase(getAllUserRecipes.pending, (state, action) => {
      state.loadingGetUserRecipes = "PENDING";
    })
    .addCase(getAllUserRecipes.fulfilled, (state, action) => {
      const recipes = action.payload as RecipeType[];

      if (recipes.length >= 1) {
        state.loadingGetUserRecipes = "SUCCEDED";
        recipesAdapter.removeAll(state);
        recipesAdapter.addMany(state, recipes);
      } else {
        state.loadingGetUserRecipes = "FAILED";
      }
    })
    .addCase(createRecipe.pending, (state, action) => {
      state.loadingCreateRecipe = "PENDING";
    })
    .addCase(createRecipe.fulfilled, (state, action) => {
      const recipe = action.payload as RecipeType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        recipesAdapter.addOne(state, recipe);
        state.loadingCreateRecipe = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.recipeFormModalErrorMessage = error.message;
        }
        state.loadingCreateRecipe = "FAILED";
      }
    })
    .addCase(deleteRecipe.pending, (state, action) => {
      state.loadingDeleteRecipe = "PENDING";
    })
    .addCase(deleteRecipe.fulfilled, (state, action) => {
      const recipe = action.payload as RecipeType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        recipesAdapter.removeOne(state, recipe.id);
        state.loadingDeleteRecipe = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.recipeFormModalErrorMessage = error.message;
        }
        state.loadingDeleteRecipe = "FAILED";
      }
    })
    .addCase(updateRecipe.fulfilled, (state, action) => {
      const recipe = action.payload as RecipeType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        recipesAdapter.updateOne(state, {
          changes: { ...recipe },
          id: recipe.id,
        });
        state.loadingUpdateRecipe = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.recipeFormModalErrorMessage = error.message;
        }
        state.loadingUpdateRecipe = "FAILED";
      }
    });
};

export default recipesSliceExtraReducers;
