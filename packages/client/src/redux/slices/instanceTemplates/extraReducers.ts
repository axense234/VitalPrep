// Types
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import InstanceTemplateType from "@/core/types/entity/instanceTemplate/InstanceTemplateType";
import InstanceTemplatesSliceStateType from "@/core/types/entity/instanceTemplate/InstanceTemplatesSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axios Error Type
import { AxiosError } from "axios";
// Adapters
import instanceTemplatesAdapter from "./adapter";
// Thunks
import {
  getUserInstanceTemplate,
  getAllUserInstanceTemplates,
  createInstanceTemplate,
  deleteInstanceTemplate,
  updateInstanceTemplate,
} from "./thunks";

const instanceTemplatesSliceExtraReducers: (
  builder: ActionReducerMapBuilder<InstanceTemplatesSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserInstanceTemplate.pending, (state, action) => {
      state.loadingGetUserInstanceTemplate = "PENDING";
    })
    .addCase(getUserInstanceTemplate.fulfilled, (state, action) => {
      const instanceTemplate = action.payload as InstanceTemplateTemplate;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        instanceTemplatesAdapter.upsertOne(
          state,
          instanceTemplate as InstanceTemplateType
        );
        state.loadingGetUserInstanceTemplate = "SUCCEDED";
      } else {
        state.loadingGetUserInstanceTemplate = "FAILED";
      }
    })
    .addCase(getAllUserInstanceTemplates.pending, (state, action) => {
      state.loadingGetUserInstanceTemplates = "PENDING";
    })
    .addCase(getAllUserInstanceTemplates.fulfilled, (state, action) => {
      const instanceTemplates = action.payload as InstanceTemplateType[];

      if (instanceTemplates.length >= 1) {
        state.loadingGetUserInstanceTemplates = "SUCCEDED";
        instanceTemplatesAdapter.removeAll(state);
        instanceTemplatesAdapter.addMany(state, instanceTemplates);
      } else {
        state.loadingGetUserInstanceTemplates = "FAILED";
      }
    })
    .addCase(createInstanceTemplate.pending, (state, action) => {
      state.loadingCreateInstanceTemplate = "PENDING";
    })
    .addCase(createInstanceTemplate.fulfilled, (state, action) => {
      const instanceTemplate = action.payload as InstanceTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        instanceTemplatesAdapter.addOne(state, instanceTemplate);
        state.loadingCreateInstanceTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.instanceTemplateFormModalErrorMessage = error.message;
        }
        state.loadingCreateInstanceTemplate = "FAILED";
      }
    })
    .addCase(deleteInstanceTemplate.pending, (state, action) => {
      state.loadingDeleteInstanceTemplate = "PENDING";
    })
    .addCase(deleteInstanceTemplate.fulfilled, (state, action) => {
      const instanceTemplate = action.payload as InstanceTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        instanceTemplatesAdapter.removeOne(state, instanceTemplate.id);
        state.loadingDeleteInstanceTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.instanceTemplateFormModalErrorMessage = error.message;
        }
        state.loadingDeleteInstanceTemplate = "FAILED";
      }
    })
    .addCase(updateInstanceTemplate.fulfilled, (state, action) => {
      const instanceTemplate = action.payload as InstanceTemplateType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        instanceTemplatesAdapter.updateOne(state, {
          changes: { ...instanceTemplate },
          id: instanceTemplate.id,
        });
        state.loadingUpdateInstanceTemplate = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.instanceTemplateFormModalErrorMessage = error.message;
        }
        state.loadingUpdateInstanceTemplate = "FAILED";
      }
    });
};

export default instanceTemplatesSliceExtraReducers;
