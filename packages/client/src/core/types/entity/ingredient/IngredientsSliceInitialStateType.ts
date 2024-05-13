import LoadingStateType from "../../LoadingStateType";
import IngredientTemplate from "./IngredientTemplate";

type IngredientsSliceInitialStateType = {
  // General
  templateIngredient: IngredientTemplate;
  loadingCreateIngredient: LoadingStateType;
  ingredientFormModalErrorMessage: string;

  loadingGetUserIngredients: LoadingStateType;
  loadingGetUserIngredient: LoadingStateType;
};

export default IngredientsSliceInitialStateType;
