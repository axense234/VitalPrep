// State Type
import { State } from "@/redux/api/store";
// Adapter
import recipesAdapter from "./adapter";

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectAllRecipesIds,
} = recipesAdapter.getSelectors<State>((state) => state.recipes);

export const selectTemplateRecipe = (state: State) =>
  state.recipes.templateRecipe;

export const selectLoadingCreateRecipe = (state: State) =>
  state.recipes.loadingCreateRecipe;

export const selectRecipeFormModalErrorMessage = (state: State) =>
  state.recipes.recipeFormModalErrorMessage;

export const selectShowVideoTutorialContent = (state: State) =>
  state.recipes.showVideoTutorialContent;

export const selectShowWrittenTutorialContent = (state: State) =>
  state.recipes.showWrittenTutorialContent;

export const selectLoadingGetUserRecipes = (state: State) =>
  state.recipes.loadingGetUserRecipes;

export const selectLoadingGetUserRecipe = (state: State) =>
  state.recipes.loadingGetUserRecipe;

export const selectLoadingUpdateRecipe = (state: State) =>
  state.recipes.loadingUpdateRecipe;

export const selectLoadingDeleteRecipe = (state: State) =>
  state.recipes.loadingDeleteRecipe;
