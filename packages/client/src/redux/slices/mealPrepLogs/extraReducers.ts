// Types
import MealPrepLogsSliceStateType from "@/core/types/entity/mealPrepLog/MealPrepLogsSliceStateType";
import MealPrepLogType from "@/core/types/entity/mealPrepLog/MealPrepLogType";
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axios Error Type
import { AxiosError } from "axios";
// Adapter
import mealPrepLogsAdapter from "./adapter";
// Thunks
import {
  getUserMealPrepLog,
  getAllUserMealPrepLogs,
  createMealPrepLog,
  deleteMealPrepLog,
  updateMealPrepLog,
} from "./thunks";

const mealPrepLogsSliceExtraReducers: (
  builder: ActionReducerMapBuilder<MealPrepLogsSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserMealPrepLog.pending, (state, action) => {
      state.loadingGetUserMealPrepLog = "PENDING";
    })
    .addCase(getUserMealPrepLog.fulfilled, (state, action) => {
      const mealPrepLog = action.payload as MealPrepLogType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepLogsAdapter.upsertOne(state, mealPrepLog as MealPrepLogType);
        state.loadingGetUserMealPrepLog = "SUCCEDED";
      } else {
        state.loadingGetUserMealPrepLog = "FAILED";
      }
    })
    .addCase(getAllUserMealPrepLogs.pending, (state, action) => {
      state.loadingGetUserMealPrepLogs = "PENDING";
    })
    .addCase(getAllUserMealPrepLogs.fulfilled, (state, action) => {
      const mealPrepLogs = action.payload as MealPrepLogType[];

      if (mealPrepLogs.length >= 1) {
        state.loadingGetUserMealPrepLogs = "SUCCEDED";
        mealPrepLogsAdapter.removeAll(state);
        mealPrepLogsAdapter.addMany(state, mealPrepLogs);
      } else {
        state.loadingGetUserMealPrepLogs = "FAILED";
      }
    })
    .addCase(createMealPrepLog.pending, (state, action) => {
      state.loadingCreateMealPrepLog = "PENDING";
    })
    .addCase(createMealPrepLog.fulfilled, (state, action) => {
      const mealPrepLog = action.payload as MealPrepLogType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepLogsAdapter.addOne(state, mealPrepLog);
        state.loadingCreateMealPrepLog = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepLogFormModalErrorMessage = error.message;
        }
        state.loadingCreateMealPrepLog = "FAILED";
      }
    })
    .addCase(deleteMealPrepLog.pending, (state, action) => {
      state.loadingDeleteMealPrepLog = "PENDING";
    })
    .addCase(deleteMealPrepLog.fulfilled, (state, action) => {
      const mealPrepLog = action.payload as MealPrepLogType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepLogsAdapter.removeOne(state, mealPrepLog.id);
        state.loadingDeleteMealPrepLog = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepLogFormModalErrorMessage = error.message;
        }
        state.loadingDeleteMealPrepLog = "FAILED";
      }
    })
    .addCase(updateMealPrepLog.fulfilled, (state, action) => {
      const mealPrepLog = action.payload as MealPrepLogType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        mealPrepLogsAdapter.updateOne(state, {
          changes: { ...mealPrepLog },
          id: mealPrepLog.id,
        });
        state.loadingUpdateMealPrepLog = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.mealPrepLogFormModalErrorMessage = error.message;
        }
        state.loadingUpdateMealPrepLog = "FAILED";
      }
    });
};

export default mealPrepLogsSliceExtraReducers;
