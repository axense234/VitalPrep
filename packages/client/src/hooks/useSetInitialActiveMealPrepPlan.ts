// React
import { useEffect } from "react";
// Redux
import { setTypeOfUpdateAccountQuery } from "@/redux/slices/general/slice";
import { updateUser } from "@/redux/slices/general/thunks";
// Types
import LoadingStateType from "@/core/types/LoadingStateType";
import UserType from "@/core/types/entity/users/UserType";
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { State } from "@/redux/api/store";

const useSetInitialActiveMealPrepPlan = (
  loadingProfile: LoadingStateType,
  profile: UserType,
  mealPrepPlans: MealPrepPlanType[],
  dispatch: ThunkDispatch<State, {}, UnknownAction>
) => {
  useEffect(() => {
    if (
      loadingProfile === "SUCCEDED" &&
      profile.mealPrepPlanInUseId === "" &&
      mealPrepPlans.length === 1
    ) {
      {
        dispatch(setTypeOfUpdateAccountQuery("mealPrepPlanUsed"));
        dispatch(
          updateUser({
            typeOfUpdate: "mealPrepPlanUsed",
            userTemplate: {
              ...profile,
              mealPrepPlanInUseId: mealPrepPlans[0].id,
            },
          })
        );
      }
    }
  }, [loadingProfile, profile.mealPrepPlanInUseId, mealPrepPlans, dispatch]);
};

export default useSetInitialActiveMealPrepPlan;
