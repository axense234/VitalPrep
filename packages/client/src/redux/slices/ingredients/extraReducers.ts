// Type
import IngredientType from "@/core/types/entity/ingredient/IngredientType";
import IngredientsSliceStateType from "@/core/types/entity/ingredient/IngredientsSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axios Error Type
import { AxiosError } from "axios";
// Adapter
import ingredientsAdapter from "./adapter";
// Thunks
import {
  getUserIngredient,
  getAllUserIngredients,
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from "./thunks";

const ingredientsSliceExtraReducers: (
  builder: ActionReducerMapBuilder<IngredientsSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserIngredient.pending, (state, action) => {
      state.loadingGetUserIngredient = "PENDING";
    })
    .addCase(getUserIngredient.fulfilled, (state, action) => {
      const ingredient = action.payload as IngredientType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        ingredientsAdapter.upsertOne(state, ingredient);
        state.loadingGetUserIngredient = "SUCCEDED";
      } else {
        state.loadingGetUserIngredient = "FAILED";
      }
    })
    .addCase(getAllUserIngredients.pending, (state, action) => {
      state.loadingGetUserIngredients = "PENDING";
    })
    .addCase(getAllUserIngredients.fulfilled, (state, action) => {
      const ingredients = action.payload as IngredientType[];

      if (ingredients.length >= 1) {
        state.loadingGetUserIngredients = "SUCCEDED";
        ingredientsAdapter.removeAll(state);
        ingredientsAdapter.addMany(state, ingredients);
      } else {
        state.loadingGetUserIngredients = "FAILED";
      }
    })
    .addCase(createIngredient.pending, (state, action) => {
      state.loadingCreateIngredient = "PENDING";
    })
    .addCase(createIngredient.fulfilled, (state, action) => {
      const ingredient = action.payload as IngredientType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        ingredientsAdapter.addOne(state, ingredient);
        state.loadingCreateIngredient = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.ingredientFormModalErrorMessage = error.message;
        }
        state.loadingCreateIngredient = "FAILED";
      }
    })
    .addCase(deleteIngredient.pending, (state, action) => {
      state.loadingDeleteIngredient = "PENDING";
    })
    .addCase(deleteIngredient.fulfilled, (state, action) => {
      const ingredient = action.payload as IngredientType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        ingredientsAdapter.removeOne(state, ingredient.id);
        state.loadingDeleteIngredient = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.ingredientFormModalErrorMessage = error.message;
        }
        state.loadingDeleteIngredient = "FAILED";
      }
    })
    .addCase(updateIngredient.fulfilled, (state, action) => {
      const ingredient = action.payload as IngredientType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        ingredientsAdapter.updateOne(state, {
          changes: { ...ingredient },
          id: ingredient.id,
        });
        state.loadingUpdateIngredient = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.ingredientFormModalErrorMessage = error.message;
        }
        state.loadingUpdateIngredient = "FAILED";
      }
    });
};

export default ingredientsSliceExtraReducers;
