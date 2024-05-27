import LoadingStateType from "../../LoadingStateType";
import MealPrepPlanTemplate from "./MealPrepPlanTemplate";

type MealPrepPlansSliceInitialStateType = {
  // General
  templateMealPrepPlan: MealPrepPlanTemplate;
  loadingCreateMealPrepPlan: LoadingStateType;
  loadingDeleteMealPrepPlan: LoadingStateType;
  loadingUpdateMealPrepPlan: LoadingStateType;
  mealPrepPlanFormModalErrorMessage: string;

  numberOfInstanceTemplates: number;

  loadingGetUserMealPrepPlans: LoadingStateType;
  loadingGetUserMealPrepPlan: LoadingStateType;
};
export default MealPrepPlansSliceInitialStateType;
