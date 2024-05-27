import LoadingStateType from "../../LoadingStateType";
import MealPrepLogTemplate from "./MealPrepLogTemplate";

type MealPrepLogsSliceInitialStateType = {
  // General
  templateMealPrepLog: MealPrepLogTemplate;
  loadingCreateMealPrepLog: LoadingStateType;
  loadingDeleteMealPrepLog: LoadingStateType;
  loadingUpdateMealPrepLog: LoadingStateType;
  mealPrepLogFormModalErrorMessage: string;

  loadingGetUserMealPrepLogs: LoadingStateType;
  loadingGetUserMealPrepLog: LoadingStateType;
};

export default MealPrepLogsSliceInitialStateType;
