import LoadingStateType from "../../LoadingStateType";
import RecipeTemplate from "./RecipeTemplate";

type RecipesSliceInititalStateType = {
  // General
  templateRecipe: RecipeTemplate;
  loadingCreateRecipe: LoadingStateType;
  loadingDeleteRecipe: LoadingStateType;
  loadingUpdateRecipe: LoadingStateType;
  recipeFormModalErrorMessage: string;
  showVideoTutorialContent: boolean;
  showWrittenTutorialContent: boolean;

  loadingGetUserRecipes: LoadingStateType;
  loadingGetUserRecipe: LoadingStateType;
};

export default RecipesSliceInititalStateType;
