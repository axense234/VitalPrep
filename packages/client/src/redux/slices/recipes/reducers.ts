// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import RecipesSliceStateType from "@/core/types/entity/recipe/RecipesSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const recipesSliceReducers = {
  setTemplateRecipe(
    state: RecipesSliceStateType,
    action: PayloadAction<RecipeTemplate>
  ) {
    state.templateRecipe = action.payload;
  },
  updateLoadingGetUserRecipes(
    state: RecipesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserRecipes = action.payload;
  },
  updateLoadingGetUserRecipe(
    state: RecipesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserRecipe = action.payload;
  },
  updateLoadingUpdateRecipe(
    state: RecipesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateRecipe = action.payload;
  },
  updateLoadingCreateRecipe(
    state: RecipesSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateRecipe = action.payload;
  },
  changeShowVideoTutorialContent(
    state: RecipesSliceStateType,
    action: PayloadAction<boolean>
  ) {
    state.showVideoTutorialContent = action.payload;
  },
  changeShowWrittenTutorialContent(
    state: RecipesSliceStateType,
    action: PayloadAction<boolean>
  ) {
    state.showWrittenTutorialContent = action.payload;
  },
  updateTemplateRecipe(
    state: RecipesSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateRecipe = {
      ...state.templateRecipe,
      [action.payload.key]: action.payload.value,
    };
  },
  updateTemplateRecipeTutorial(
    state: RecipesSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateRecipe.recipeTutorial = {
      ...state.templateRecipe.recipeTutorial,
      [action.payload.key]: action.payload.value,
    };
  },
};

export default recipesSliceReducers;
