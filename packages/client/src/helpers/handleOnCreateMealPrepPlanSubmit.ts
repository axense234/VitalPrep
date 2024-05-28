// Types
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
// Redux
import { State } from "@/redux/api/store";
import {
  changeShowGeneralModal,
  changeShowFormModal,
  setTemplateModalMessage,
} from "@/redux/slices/general/slice";
import { createMealPrepPlan } from "@/redux/slices/mealPrepPlans/thunks";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleOnCreateMealPrepPlanSubmit = ({
  e,
  templateMealPrepPlan,
  numberOfInstanceTemplates,
  profileId,
  dispatch,
}: {
  e: React.SyntheticEvent;
  templateMealPrepPlan: MealPrepPlanTemplate;
  numberOfInstanceTemplates: number;
  profileId: string;
  dispatch: ThunkDispatch<State, {}, UnknownAction>;
}) => {
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
    const updatedInstanceTemplatesTimings =
      templateMealPrepPlan.instanceTemplatesTimings.map((timing) => {
        return {
          ...timing,
          timezoneOffsetInHours: new Date().getTimezoneOffset() / 60,
        };
      });
    dispatch(
      createMealPrepPlan({
        templateMealPrepPlan: {
          ...templateMealPrepPlan,
          instanceTemplatesTimings: updatedInstanceTemplatesTimings,
        },
        userId: profileId,
      })
    );
  }
};

export default handleOnCreateMealPrepPlanSubmit;
