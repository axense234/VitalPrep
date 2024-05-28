// Types
import IngredientsSliceStateType from "@/core/types/entity/ingredient/IngredientsSliceStateType";
// Data
import { defaultTemplateIngredient } from "@/data";
// Adapter
import ingredientsAdapter from "./adapter";

const ingredientsSliceInitialState = ingredientsAdapter.getInitialState({
  templateIngredient: defaultTemplateIngredient,
  loadingCreateIngredient: "IDLE",
  loadingDeleteIngredient: "IDLE",
  loadingUpdateIngredient: "IDLE",
  ingredientFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserIngredients: "IDLE",
  loadingGetUserIngredient: "IDLE",
}) as IngredientsSliceStateType;

export default ingredientsSliceInitialState;
