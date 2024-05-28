// State Type
import { State } from "@/redux/api/store";
// Adapter
import ingredientsAdapter from "./adapter";

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
  selectIds: selectAllIngredientsIds,
} = ingredientsAdapter.getSelectors<State>((state) => state.ingredients);

export const selectTemplateIngredient = (state: State) =>
  state.ingredients.templateIngredient;

export const selectLoadingCreateIngredient = (state: State) =>
  state.ingredients.loadingCreateIngredient;

export const selectIngredientFormModalErrorMessage = (state: State) =>
  state.ingredients.ingredientFormModalErrorMessage;

export const selectLoadingGetUserIngredients = (state: State) =>
  state.ingredients.loadingGetUserIngredients;

export const selectLoadingGetUserIngredient = (state: State) =>
  state.ingredients.loadingGetUserIngredient;

export const selectLoadingUpdateIngredient = (state: State) =>
  state.ingredients.loadingUpdateIngredient;

export const selectLoadingDeleteIngredient = (state: State) =>
  state.ingredients.loadingDeleteIngredient;
