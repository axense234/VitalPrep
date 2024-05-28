// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
import MealPrepLogsSliceStateType from "@/core/types/entity/mealPrepLog/MealPrepLogsSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const mealPrepLogsSliceReducers = {
  setTemplateMealPrepLog(
    state: MealPrepLogsSliceStateType,
    action: PayloadAction<MealPrepLogTemplate>
  ) {
    state.templateMealPrepLog = action.payload;
  },
  updateLoadingGetUserMealPrepLogs(
    state: MealPrepLogsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserMealPrepLogs = action.payload;
  },
  updateLoadingCreateMealPrepLog(
    state: MealPrepLogsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateMealPrepLog = action.payload;
  },
  updateLoadingUpdateMealPrepLog(
    state: MealPrepLogsSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateMealPrepLog = action.payload;
  },
  updateTemplateMealPrepLog(
    state: MealPrepLogsSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateMealPrepLog = {
      ...state.templateMealPrepLog,
      [action.payload.key]: action.payload.value,
    };
  },
};

export default mealPrepLogsSliceReducers;
