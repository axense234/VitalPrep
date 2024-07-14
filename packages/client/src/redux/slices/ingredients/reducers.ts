// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import IngredientsSliceStateType from "@/core/types/entity/ingredient/IngredientsSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const ingredientsSliceReducers = {
  updateLoadingCreateIngredient(
    state: IngredientsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateIngredient = action.payload;
  },
  updateLoadingUpdateIngredient(
    state: IngredientsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateIngredient = action.payload;
  },
  updateLoadingGetUserIngredients(
    state: IngredientsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserIngredients = action.payload;
  },
  updateLoadingGetUserIngredient(
    state: IngredientsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserIngredient = action.payload;
  },
  updateTemplateIngredient(
    state: IngredientsSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateIngredient = {
      ...state.templateIngredient,
      [action.payload.key]: action.payload.value,
    };
  },
  updateTemplateIngredientMacros(
    state: IngredientsSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateIngredient.macros = {
      ...state.templateIngredient.macros,
      [action.payload.key]: action.payload.value,
    };
  },
  setTemplateIngredient(
    state: IngredientsSliceStateType,
    action: PayloadAction<IngredientTemplate>
  ) {
    state.templateIngredient = action.payload;
  },
};

export default ingredientsSliceReducers;
