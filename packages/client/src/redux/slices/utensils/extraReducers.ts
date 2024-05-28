// Types
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import UtensilType from "@/core/types/entity/utensil/UtensilType";
import UtensilsSliceStateType from "@/core/types/entity/utensil/UtensilsSliceStateType";
// Redux
import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
// Axiox Error Type
import { AxiosError } from "axios";
// Adapter
import utensilsAdapter from "./adapter";
// Thunks
import {
  getUserUtensil,
  getAllUserUtensils,
  createUtensil,
  deleteUtensil,
  updateUtensil,
} from "./thunks";

const utensilsSliceExtraReducers: (
  builder: ActionReducerMapBuilder<UtensilsSliceStateType>
) => void = (builder) => {
  builder
    .addCase(getUserUtensil.pending, (state, action) => {
      state.loadingGetUserUtensil = "PENDING";
    })
    .addCase(getUserUtensil.fulfilled, (state, action) => {
      const utensil = action.payload as UtensilTemplate;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        utensilsAdapter.upsertOne(state, utensil as UtensilType);
        state.loadingGetUserUtensil = "SUCCEDED";
      } else {
        state.loadingGetUserUtensil = "FAILED";
      }
    })
    .addCase(getAllUserUtensils.pending, (state, action) => {
      state.loadingGetUserUtensils = "PENDING";
    })
    .addCase(getAllUserUtensils.fulfilled, (state, action) => {
      const utensils = action.payload as UtensilType[];

      if (utensils.length >= 1) {
        state.loadingGetUserUtensils = "SUCCEDED";
        utensilsAdapter.removeAll(state);
        utensilsAdapter.addMany(state, utensils);
      } else {
        state.loadingGetUserUtensils = "FAILED";
      }
    })
    .addCase(createUtensil.pending, (state, action) => {
      state.loadingCreateUtensil = "PENDING";
    })
    .addCase(createUtensil.fulfilled, (state, action) => {
      const utensil = action.payload as UtensilType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        utensilsAdapter.addOne(state, utensil);
        state.loadingCreateUtensil = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.utensilFormModalErrorMessage = error.message;
        }
        state.loadingCreateUtensil = "FAILED";
      }
    })
    .addCase(deleteUtensil.pending, (state, action) => {
      state.loadingDeleteUtensil = "PENDING";
    })
    .addCase(deleteUtensil.fulfilled, (state, action) => {
      const utensil = action.payload as UtensilType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        utensilsAdapter.removeOne(state, utensil.id);
        state.loadingDeleteUtensil = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.utensilFormModalErrorMessage = error.message;
        }
        state.loadingDeleteUtensil = "FAILED";
      }
    })
    .addCase(updateUtensil.fulfilled, (state, action) => {
      const utensil = action.payload as UtensilType;
      const axiosError = action.payload as AxiosError;

      if (axiosError !== undefined && !axiosError.response) {
        utensilsAdapter.updateOne(state, {
          changes: { ...utensil },
          id: utensil.id,
        });
        state.loadingUpdateUtensil = "SUCCEDED";
      } else {
        const error = axiosError.response?.data as {
          message: string;
          type: string;
        };
        if (error.type !== "jwt") {
          state.utensilFormModalErrorMessage = error.message;
        }
        state.loadingUpdateUtensil = "FAILED";
      }
    });
};

export default utensilsSliceExtraReducers;
