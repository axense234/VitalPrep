// State
import { State } from "@/redux/api/store";
// Adapter
import mealPrepLogsAdapter from "./adapter";

export const {
  selectAll: selectAllMealPrepLogs,
  selectById: selectMealPrepLogById,
  selectIds: selectAllMealPrepLogsIds,
} = mealPrepLogsAdapter.getSelectors<State>((state) => state.mealPrepLogs);

export const selectTemplateMealPrepLog = (state: State) =>
  state.mealPrepLogs.templateMealPrepLog;

export const selectLoadingCreateMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingCreateMealPrepLog;

export const selectMealPrepLogFormModalErrorMessage = (state: State) =>
  state.mealPrepLogs.mealPrepLogFormModalErrorMessage;

export const selectLoadingGetUserMealPrepLogs = (state: State) =>
  state.mealPrepLogs.loadingGetUserMealPrepLogs;

export const selectLoadingGetUserMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingGetUserMealPrepLog;

export const selectLoadingUpdateMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingUpdateMealPrepLog;

export const selectLoadingDeleteMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingDeleteMealPrepLog;
