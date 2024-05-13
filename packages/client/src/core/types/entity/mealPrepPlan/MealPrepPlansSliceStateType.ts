import { EntityState } from "@reduxjs/toolkit";
import MealPrepPlanType from "./MealPrepPlanType";
import MealPrepPlansSliceInitialStateType from "./MealPrepPlansSliceInitialStateType";

type MealPrepPlansSliceStateType = EntityState<MealPrepPlanType, string> &
  MealPrepPlansSliceInitialStateType;
export default MealPrepPlansSliceStateType;
