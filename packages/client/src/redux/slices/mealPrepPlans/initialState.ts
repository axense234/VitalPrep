// Types
import MealPrepPlansSliceStateType from "@/core/types/entity/mealPrepPlan/MealPrepPlansSliceStateType";
// Data
import { defaultTemplateMealPrepPlan } from "@/data";
// Adapter
import mealPrepPlansAdapter from "./adapter";

const mealPrepPlansSliceInitialState = mealPrepPlansAdapter.getInitialState({
  templateMealPrepPlan: defaultTemplateMealPrepPlan,
  loadingCreateMealPrepPlan: "IDLE",
  loadingDeleteMealPrepPlan: "IDLE",
  loadingUpdateMealPrepPlan: "IDLE",
  mealPrepPlanFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  numberOfInstanceTemplates: 0,
  loadingGetUserMealPrepPlans: "IDLE",
  loadingGetUserMealPrepPlan: "IDLE",
}) as MealPrepPlansSliceStateType;

export default mealPrepPlansSliceInitialState;
