// Types
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
import MealPrepPlansSliceStateType from "@/core/types/entity/mealPrepPlan/MealPrepPlansSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
// Adapter
import mealPrepPlansAdapter from "./adapter";
// Thunks
import {
  getUserMealPrepPlan,
  getAllUserMealPrepPlans,
  createMealPrepPlan,
  deleteMealPrepPlan,
  updateMealPrepPlan,
} from "./thunks";

const mealPrepPlansSliceExtraReducers: (
  builder: ActionReducerMapBuilder<MealPrepPlansSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserMealPrepPlan.pending, (state, action) => {
      state.loadingGetUserMealPrepPlan = "PENDING";
    })
    .addCase(getUserMealPrepPlan.fulfilled, (state, action) => {
      const mealPrepPlan = action.payload as MealPrepPlanType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepPlansAdapter.upsertOne(state, mealPrepPlan as MealPrepPlanType);
        state.loadingGetUserMealPrepPlan = "SUCCEDED";
      } else {
        state.loadingGetUserMealPrepPlan = "FAILED";
      }
    })
    .addCase(getAllUserMealPrepPlans.pending, (state, action) => {
      state.loadingGetUserMealPrepPlans = "PENDING";
    })
    .addCase(getAllUserMealPrepPlans.fulfilled, (state, action) => {
      const mealPrepPlans = action.payload as MealPrepPlanType[];

      if (mealPrepPlans.length >= 1) {
        state.loadingGetUserMealPrepPlans = "SUCCEDED";
        mealPrepPlansAdapter.removeAll(state);
        mealPrepPlansAdapter.addMany(state, mealPrepPlans);
      } else {
        state.loadingGetUserMealPrepPlans = "FAILED";
      }
    })
    .addCase(createMealPrepPlan.pending, (state, action) => {
      state.loadingCreateMealPrepPlan = "PENDING";
    })
    .addCase(createMealPrepPlan.fulfilled, (state, action) => {
      const mealPrepPlan = action.payload as MealPrepPlanType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepPlansAdapter.addOne(state, mealPrepPlan);
        state.loadingCreateMealPrepPlan = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepPlanFormModalErrorMessage = error.message;
        }
        state.loadingCreateMealPrepPlan = "FAILED";
      }
    })
    .addCase(deleteMealPrepPlan.pending, (state, action) => {
      state.loadingDeleteMealPrepPlan = "PENDING";
    })
    .addCase(deleteMealPrepPlan.fulfilled, (state, action) => {
      const mealPrepPlan = action.payload as MealPrepPlanType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepPlansAdapter.removeOne(state, mealPrepPlan.id);
        state.loadingDeleteMealPrepPlan = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepPlanFormModalErrorMessage = error.message;
        }
        state.loadingDeleteMealPrepPlan = "FAILED";
      }
    })
    .addCase(updateMealPrepPlan.fulfilled, (state, action) => {
      const mealPrepPlan = action.payload as MealPrepPlanType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepPlansAdapter.updateOne(state, {
          changes: { ...mealPrepPlan },
          id: mealPrepPlan.id,
        });
        state.loadingUpdateMealPrepPlan = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepPlanFormModalErrorMessage = error.message;
        }
        state.loadingUpdateMealPrepPlan = "FAILED";
      }
    });
};

export default mealPrepPlansSliceExtraReducers;
