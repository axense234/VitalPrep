// Types
import RecipesSliceStateType from "@/core/types/entity/recipe/RecipesSliceStateType";
// Data
import { defaultTemplateRecipe } from "@/data";
// Adapter
import recipesAdapter from "./adapter";

const recipesSliceInitialState = recipesAdapter.getInitialState({
  templateRecipe: defaultTemplateRecipe,
  loadingCreateRecipe: "IDLE",
  loadingDeleteRecipe: "IDLE",
  loadingUpdateRecipe: "IDLE",
  recipeFormModalErrorMessage: "Something went wrong, please refresh the page!",
  showVideoTutorialContent: false,
  showWrittenTutorialContent: false,
  loadingGetUserRecipes: "IDLE",
  loadingGetUserRecipe: "IDLE",
}) as RecipesSliceStateType;

export default recipesSliceInitialState;
