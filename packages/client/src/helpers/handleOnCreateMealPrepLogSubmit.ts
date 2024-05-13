// Types
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Redux
import { State } from "@/redux/api/store";
import { createMealPrepLog } from "@/redux/slices/mealPrepLogsSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const handleOnCreateMealPrepLogSubmit = (
  e: React.SyntheticEvent,
  templateMealPrepLog: MealPrepLogTemplate,
  profileId: string,
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  e.preventDefault();
  dispatch(
    createMealPrepLog({
      templateMealPrepLog: {
        ...templateMealPrepLog,
        date:
          (new Date(
            templateMealPrepLog.date as Date
          ).toISOString() as unknown as Date) || new Date().toISOString(),
      },
      userId: profileId,
    })
  );
};

export default handleOnCreateMealPrepLogSubmit;
