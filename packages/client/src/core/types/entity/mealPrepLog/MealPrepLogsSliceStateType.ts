import { EntityState } from "@reduxjs/toolkit";
import MealPrepLogType from "./MealPrepLogType";
import MealPrepLogsSliceInitialStateType from "./MealPrepLogsSliceInitialStateType";

type MealPrepLogsSliceStateType = EntityState<MealPrepLogType, string> &
  MealPrepLogsSliceInitialStateType;
export default MealPrepLogsSliceStateType;
