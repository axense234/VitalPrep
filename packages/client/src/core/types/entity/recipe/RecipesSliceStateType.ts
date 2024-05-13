import { EntityState } from "@reduxjs/toolkit";
import RecipesSliceInititalStateType from "./RecipesSliceInitialStateType";
import RecipeType from "./RecipeType";

type RecipesSliceStateType = EntityState<RecipeType, string> &
  RecipesSliceInititalStateType;
export default RecipesSliceStateType;
