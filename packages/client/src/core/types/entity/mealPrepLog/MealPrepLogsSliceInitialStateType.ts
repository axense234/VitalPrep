import LoadingStateType from "../../LoadingStateType";
import MealPrepLogTemplate from "./MealPrepLogTemplate";

type MealPrepLogsSliceInitialStateType = {
  // General
  templateMealPrepLog: MealPrepLogTemplate;
  loadingCreateMealPrepLog: LoadingStateType;
  mealPrepLogFormModalErrorMessage: string;

  loadingGetUserMealPrepLogs: LoadingStateType;
  loadingGetUserMealPrepLog: LoadingStateType;
};

export default MealPrepLogsSliceInitialStateType;
