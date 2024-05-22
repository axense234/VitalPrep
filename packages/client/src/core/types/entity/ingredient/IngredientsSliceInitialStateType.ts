import LoadingStateType from "../../LoadingStateType";
import IngredientTemplate from "./IngredientTemplate";

type IngredientsSliceInitialStateType = {
  // General
  templateIngredient: IngredientTemplate;
  loadingCreateIngredient: LoadingStateType;
  loadingDeleteIngredient: LoadingStateType;
  ingredientFormModalErrorMessage: string;

  loadingGetUserIngredients: LoadingStateType;
  loadingGetUserIngredient: LoadingStateType;
};

export default IngredientsSliceInitialStateType;
