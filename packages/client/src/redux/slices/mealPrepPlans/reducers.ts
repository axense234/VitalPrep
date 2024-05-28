// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import MealPrepPlansSliceStateType from "@/core/types/entity/mealPrepPlan/MealPrepPlansSliceStateType";
// Redux
import { PayloadAction } from "@reduxjs/toolkit";

const mealPrepPlansSliceReducers = {
  setTemplateMealPrepPlan(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<MealPrepPlanTemplate>
  ) {
    state.templateMealPrepPlan = action.payload;
  },
  updateInstanceTemplatesTiming(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<{ load: ObjectKeyValueType; index: number }>
  ) {
    state.templateMealPrepPlan.instanceTemplatesTimings[action.payload.index] =
      {
        ...state.templateMealPrepPlan.instanceTemplatesTimings[
          action.payload.index
        ],
        [action.payload.load.key]: action.payload.load.value,
      };
  },
  updateLoadingGetUserMealPrepPlans(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingGetUserMealPrepPlans = action.payload;
  },
  updateLoadingUpdateMealPrepPlan(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingUpdateMealPrepPlan = action.payload;
  },
  updateNumberOfInstanceTemplates(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<number>
  ) {
    state.numberOfInstanceTemplates = action.payload as number;
  },
  updateLoadingCreateMealPrepPlan(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<LoadingStateType>
  ) {
    state.loadingCreateMealPrepPlan = action.payload;
  },
  updateTemplateMealPrepPlan(
    state: MealPrepPlansSliceStateType,
    action: PayloadAction<ObjectKeyValueType>
  ) {
    state.templateMealPrepPlan = {
      ...state.templateMealPrepPlan,
      [action.payload.key]: action.payload.value,
    };
  },
};

export default mealPrepPlansSliceReducers;
