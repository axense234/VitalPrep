import { EntityState } from "@reduxjs/toolkit";
import IngredientsSliceInitialStateType from "./IngredientsSliceInitialStateType";
import IngredientType from "./IngredientType";

type IngredientsSliceStateType = EntityState<IngredientType, string> &
  IngredientsSliceInitialStateType;
export default IngredientsSliceStateType;
