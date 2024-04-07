// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateInstanceTemplate } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
// Prisma
import { InstanceTemplate } from "@prisma/client";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type LoadingStateType = "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";

type InitialStateType = {
  // General
  templateInstanceTemplate: InstanceTemplateTemplate;
  loadingCreateInstanceTemplate: LoadingStateType;
  instanceTemplateFormModalErrorMessage: string;

  loadingGetUserInstanceTemplates: LoadingStateType;
};

export const instanceTemplatesAdapter = createEntityAdapter<InstanceTemplate>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = instanceTemplatesAdapter.getInitialState({
  templateInstanceTemplate: defaultTemplateInstanceTemplate,
  loadingCreateInstanceTemplate: "IDLE",
  instanceTemplateFormModalErrorMessage: "Default Message",
  loadingGetUserInstanceTemplates: "IDLE",
}) as EntityState<InstanceTemplate, string> & InitialStateType;

type CreateInstanceTemplateBody = {
  templateInstanceTemplate: InstanceTemplateTemplate;
  userId: string;
};

export const createInstanceTemplate = createAsyncThunk<
  InstanceTemplate | AxiosError,
  CreateInstanceTemplateBody
>(
  "instanceTemplates/createInstanceTemplate",
  async ({ templateInstanceTemplate, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/instanceTemplates/create",
        templateInstanceTemplate,
        { params: { userId: userId } }
      );
      return data.instanceTemplate as InstanceTemplate;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserInstanceTemplates = createAsyncThunk<
  InstanceTemplate[] | AxiosError,
  string
>("instanceTemplates/getAllUserInstanceTemplates", async (userId) => {
  try {
    const { data } = await axiosInstance.get(
      `/instanceTemplates?userId=${userId}&userInstanceTemplates=true`
    );
    return data.instanceTemplates as InstanceTemplate[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const instanceTemplatesSlice = createSlice({
  name: "instanceTemplates",
  initialState,
  reducers: {
    updateLoadingCreateInstanceTemplate(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateInstanceTemplate = action.payload;
    },
    updateTemplateInstanceTemplate(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateInstanceTemplate = {
        ...state.templateInstanceTemplate,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserInstanceTemplates.pending, (state, action) => {
        state.loadingGetUserInstanceTemplates = "PENDING";
      })
      .addCase(getAllUserInstanceTemplates.fulfilled, (state, action) => {
        const instanceTemplates = action.payload as InstanceTemplate[];

        if (instanceTemplates.length >= 1) {
          state.loadingGetUserInstanceTemplates = "SUCCEDED";
          instanceTemplatesAdapter.upsertMany(state, instanceTemplates);
        } else {
          state.loadingGetUserInstanceTemplates = "FAILED";
        }
      })
      .addCase(createInstanceTemplate.pending, (state, action) => {
        state.loadingCreateInstanceTemplate = "PENDING";
      })
      .addCase(createInstanceTemplate.fulfilled, (state, action) => {
        const instanceTemplate = action.payload as InstanceTemplate;
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
      });
  },
});

export const {
  selectAll: selectAllInstanceTemplates,
  selectById: selectInstanceTemplateById,
  selectIds: selectAllInstanceTemplatesIds,
} = instanceTemplatesAdapter.getSelectors<State>(
  (state) => state.instanceTemplates
);

export const selectTemplateInstanceTemplate = (state: State) =>
  state.instanceTemplates.templateInstanceTemplate;

export const selectLoadingCreateInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingCreateInstanceTemplate;

export const selectInstanceTemplateFormModalErrorMessage = (state: State) =>
  state.instanceTemplates.instanceTemplateFormModalErrorMessage;

export const selectLoadingGetUserInstanceTemplates = (state: State) =>
  state.instanceTemplates.loadingGetUserInstanceTemplates;

export const {
  updateTemplateInstanceTemplate,
  updateLoadingCreateInstanceTemplate,
} = instanceTemplatesSlice.actions;

export default instanceTemplatesSlice.reducer;
