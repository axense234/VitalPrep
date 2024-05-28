// State Type
import { State } from "@/redux/api/store";
// Adapter
import mealPrepPlansAdapter from "./adapter";

export const {
  selectAll: selectAllMealPrepPlans,
  selectById: selectMealPrepPlanById,
  selectIds: selectAllMealPrepPlansIds,
} = mealPrepPlansAdapter.getSelectors<State>((state) => state.mealPrepPlans);

export const selectMealPrepPlanTemplate = (state: State) =>
  state.mealPrepPlans.templateMealPrepPlan;

export const selectLoadingCreateMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingCreateMealPrepPlan;

export const selectMealPrepPlanFormModalErrorMessage = (state: State) =>
  state.mealPrepPlans.mealPrepPlanFormModalErrorMessage;

export const selectNumberOfInstanceTemplates = (state: State) =>
  state.mealPrepPlans.numberOfInstanceTemplates;

export const selectLoadingGetUserMealPrepPlans = (state: State) =>
  state.mealPrepPlans.loadingGetUserMealPrepPlans;

export const selectLoadingGetUserMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingGetUserMealPrepPlan;

export const selectLoadingUpdateMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingUpdateMealPrepPlan;

export const selectLoadingDeleteMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingDeleteMealPrepPlan;
