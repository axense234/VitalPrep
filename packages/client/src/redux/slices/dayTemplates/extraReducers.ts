// Types
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import DayTemplateType from "@/core/types/entity/dayTemplate/DayTemplateType";
import DayTemplatesSliceStateType from "@/core/types/entity/dayTemplate/DayTemplatesSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axios Error Type
import { AxiosError } from "axios";
// Adapter
import dayTemplatesAdapter from "./adapter";
// Thunks
import {
  getUserDayTemplate,
  getAllUserDayTemplates,
  createDayTemplate,
  deleteDayTemplate,
  updateDayTemplate,
} from "./thunks";

const dayTemplatesSliceExtraReducers: (
  builder: ActionReducerMapBuilder<DayTemplatesSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserDayTemplate.pending, (state, action) => {
      state.loadingGetUserDayTemplate = "PENDING";
    })
    .addCase(getUserDayTemplate.fulfilled, (state, action) => {
      const dayTemplate = action.payload as DayTemplateTemplate;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        dayTemplatesAdapter.upsertOne(state, dayTemplate as DayTemplateType);
        state.loadingGetUserDayTemplate = "SUCCEDED";
      } else {
        state.loadingGetUserDayTemplate = "FAILED";
      }
    })
    .addCase(getAllUserDayTemplates.pending, (state, action) => {
      state.loadingGetUserDayTemplates = "PENDING";
    })
    .addCase(getAllUserDayTemplates.fulfilled, (state, action) => {
      const dayTemplates = action.payload as DayTemplateType[];

      if (dayTemplates.length >= 1) {
        state.loadingGetUserDayTemplates = "SUCCEDED";
        dayTemplatesAdapter.removeAll(state);
        dayTemplatesAdapter.addMany(state, dayTemplates);
      } else {
        state.loadingGetUserDayTemplates = "FAILED";
      }
    })
    .addCase(createDayTemplate.pending, (state, action) => {
      state.loadingCreateDayTemplate = "PENDING";
    })
    .addCase(createDayTemplate.fulfilled, (state, action) => {
      const dayTemplate = action.payload as DayTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        dayTemplatesAdapter.addOne(state, dayTemplate);
        state.loadingCreateDayTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.dayTemplateFormModalErrorMessage = error.message;
        }
        state.loadingCreateDayTemplate = "FAILED";
      }
    })
    .addCase(deleteDayTemplate.pending, (state, action) => {
      state.loadingDeleteDayTemplate = "PENDING";
    })
    .addCase(deleteDayTemplate.fulfilled, (state, action) => {
      const dayTemplate = action.payload as DayTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        dayTemplatesAdapter.removeOne(state, dayTemplate.id);
        state.loadingDeleteDayTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.dayTemplateFormModalErrorMessage = error.message;
        }
        state.loadingDeleteDayTemplate = "FAILED";
      }
    })
    .addCase(updateDayTemplate.fulfilled, (state, action) => {
      const dayTemplate = action.payload as DayTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        dayTemplatesAdapter.updateOne(state, {
          changes: { ...dayTemplate },
          id: dayTemplate.id,
        });
        state.loadingUpdateDayTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.dayTemplateFormModalErrorMessage = error.message;
        }
        state.loadingUpdateDayTemplate = "FAILED";
      }
    });
};

export default dayTemplatesSliceExtraReducers;
