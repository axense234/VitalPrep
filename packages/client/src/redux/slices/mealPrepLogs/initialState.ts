// Types
import MealPrepLogsSliceStateType from "@/core/types/entity/mealPrepLog/MealPrepLogsSliceStateType";
// Data
import { defaultTemplateMealPrepLog } from "@/data";
// Adapter
import mealPrepLogsAdapter from "./adapter";

const mealPrepLogsSliceInitialState = mealPrepLogsAdapter.getInitialState({
  templateMealPrepLog: defaultTemplateMealPrepLog,
  loadingCreateMealPrepLog: "IDLE",
  loadingDeleteMealPrepLog: "IDLE",
  loadingUpdateMealPrepLog: "IDLE",
  mealPrepLogFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserMealPrepLogs: "IDLE",
  loadingGetUserMealPrepLog: "IDLE",
}) as MealPrepLogsSliceStateType;

export default mealPrepLogsSliceInitialState;
