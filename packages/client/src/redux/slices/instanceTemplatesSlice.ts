// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateInstanceTemplate } from "@/data";
// Types
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import InstanceTemplatesSliceStateType from "@/core/types/entity/instanceTemplate/InstanceTemplatesSliceStateType";
import InstanceTemplateCreateBodyType from "@/core/types/entity/instanceTemplate/InstanceTemplateCreateBodyType";
import InstanceTemplateType from "@/core/types/entity/instanceTemplate/InstanceTemplateType";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const instanceTemplatesAdapter =
  createEntityAdapter<InstanceTemplateType>();

const initialState = instanceTemplatesAdapter.getInitialState({
  templateInstanceTemplate: defaultTemplateInstanceTemplate,
  loadingCreateInstanceTemplate: "IDLE",
  loadingDeleteInstanceTemplate: "IDLE",
  instanceTemplateFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserInstanceTemplates: "IDLE",
  loadingGetUserInstanceTemplate: "IDLE",
}) as InstanceTemplatesSliceStateType;

export const createInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  InstanceTemplateCreateBodyType
>(
  "instanceTemplates/createInstanceTemplate",
  async ({ templateInstanceTemplate, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/instanceTemplates/create",
        templateInstanceTemplate,
        { params: { userId: userId } }
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserInstanceTemplates = createAsyncThunk<
  InstanceTemplateType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "instanceTemplates/getAllUserInstanceTemplates",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/instanceTemplates`, {
        params: {
          userId,
          userInstanceTemplates: true,
          includeMacros: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeIngredients: true,
          includeUtensils: true,
          includeRecipes: true,
          includeDayTemplates: true,
          includeMealPrepPlans: true,
        },
      });
      return data.instanceTemplates as InstanceTemplateType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  { userId: string; instanceTemplateId: string }
>(
  "instanceTemplates/getUserInstanceTemplate",
  async ({ userId, instanceTemplateId }) => {
    try {
      const { data } = await axiosInstance.get(
        `/${userId}/instanceTemplates/${instanceTemplateId}`,
        {
          params: {
            includeMacros: true,
            includeIngredients: true,
            includeIngredientsMacros: true,
            includeUtensils: true,
            includeRecipes: true,
            includeRecipesMacros: true,
            includeDayTemplates: true,
            includeDayTemplatesMacros: true,
            includeMealPrepPlans: true,
          },
        }
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const deleteInstanceTemplate = createAsyncThunk<
  InstanceTemplateType | AxiosError,
  { instanceTemplateId: string; userId: string }
>(
  "instanceTemplates/deleteInstanceTemplate",
  async ({ instanceTemplateId, userId }) => {
    try {
      const { data } = await axiosInstance.delete(
        `/instanceTemplates/delete/${instanceTemplateId}?userId=${userId}`
      );
      return data.instanceTemplate as InstanceTemplateType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

const instanceTemplatesSlice = createSlice({
  name: "instanceTemplates",
  initialState,
  reducers: {
    updateLoadingGetUserInstanceTemplates(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserInstanceTemplates = action.payload;
    },
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

export const selectLoadingGetUserInstanceTemplate = (state: State) =>
  state.instanceTemplates.loadingGetUserInstanceTemplate;

export const {
  updateTemplateInstanceTemplate,
  updateLoadingCreateInstanceTemplate,
  updateLoadingGetUserInstanceTemplates,
} = instanceTemplatesSlice.actions;

export default instanceTemplatesSlice.reducer;
