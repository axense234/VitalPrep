// Types
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
// Redux
import { State } from "@/redux/api/store";
import {
  changeShowGeneralModal,
  changeShowFormModal,
  setTemplateModalMessage,
} from "@/redux/slices/generalSlice";
import { createMealPrepPlan } from "@/redux/slices/mealPrepPlansSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleOnCreateMealPrepPlanSubmit = (
  e: React.SyntheticEvent,
  templateMealPrepPlan: MealPrepPlanTemplate,
  numberOfInstanceTemplates: number,
  profileId: string,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  e.preventDefault();
  if (
    numberOfInstanceTemplates !==
    templateMealPrepPlan.instanceTemplatesTimings.length
  ) {
    dispatch(changeShowGeneralModal(false));
    dispatch(changeShowFormModal(true));
    dispatch(
      setTemplateModalMessage("Please verify the Meal Prep Plan Timings!")
    );
  } else if (
    numberOfInstanceTemplates ===
    templateMealPrepPlan.instanceTemplatesTimings.length
  ) {
    dispatch(
      createMealPrepPlan({
        templateMealPrepPlan: templateMealPrepPlan,
        userId: profileId,
      })
    );
  }
};

export default handleOnCreateMealPrepPlanSubmit;