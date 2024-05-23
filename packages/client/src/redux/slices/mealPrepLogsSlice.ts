// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateMealPrepLog } from "@/data";
// Redux
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import MealPrepLogsSliceStateType from "@/core/types/entity/mealPrepLog/MealPrepLogsSliceStateType";
import MealPrepLogCreateBodyType from "@/core/types/entity/mealPrepLog/MealPrepLogCreateBodyType";
import MealPrepLogType from "@/core/types/entity/mealPrepLog/MealPrepLogType";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const mealPrepLogsAdapter = createEntityAdapter<MealPrepLogType>();

const initialState = mealPrepLogsAdapter.getInitialState({
  templateMealPrepLog: defaultTemplateMealPrepLog,
  loadingCreateMealPrepLog: "IDLE",
  loadingDeleteMealPrepLog: "IDLE",
  mealPrepLogFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserMealPrepLogs: "IDLE",
  loadingGetUserMealPrepLog: "IDLE",
}) as MealPrepLogsSliceStateType;

export const createMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  MealPrepLogCreateBodyType
>("mealPrepLogs/createMealPrepLog", async ({ templateMealPrepLog, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/mealPrepLogs/create",
      templateMealPrepLog,
      { params: { userId: userId } }
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getAllUserMealPrepLogs = createAsyncThunk<
  MealPrepLogType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepLogs/getAllUserMealPrepLogs",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/mealPrepLogs`, {
        params: {
          userMealPrepLogs: true,
          userId,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeDayTemplates: true,
          includeDayTemplatesMacros: true,
          includeInstanceTemplate: true,
          includeInstanceTemplateMacros: true,
        },
      });
      return data.mealPrepLogs as MealPrepLogType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  { userId: string; mealPrepLogId: string }
>("mealPrepLogs/getUserMealPrepLog", async ({ userId, mealPrepLogId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/mealPrepLogs/${mealPrepLogId}`,
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
          includeInstanceTemplate: true,
          includeInstanceTemplateMacros: true,
        },
      }
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteMealPrepLog = createAsyncThunk<
  MealPrepLogType | AxiosError,
  { mealPrepLogId: string; userId: string }
>("mealPrepLogs/deleteMealPrepLog", async ({ mealPrepLogId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/mealPrepLogs/delete/${mealPrepLogId}?userId=${userId}`
    );
    return data.mealPrepLog as MealPrepLogType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const mealPrepLogsSlice = createSlice({
  name: "mealPrepLogs",
  initialState,
  reducers: {
    updateLoadingGetUserMealPrepLogs(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserMealPrepLogs = action.payload;
    },
    updateLoadingCreateMealPrepLog(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateMealPrepLog = action.payload;
    },
    updateTemplateMealPrepLog(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateMealPrepLog = {
        ...state.templateMealPrepLog,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
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
      });
  },
});

export const {
  selectAll: selectAllMealPrepLogs,
  selectById: selectMealPrepLogById,
  selectIds: selectAllMealPrepLogsIds,
} = mealPrepLogsAdapter.getSelectors<State>((state) => state.mealPrepLogs);

export const selectTemplateMealPrepLog = (state: State) =>
  state.mealPrepLogs.templateMealPrepLog;

export const selectLoadingCreateMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingCreateMealPrepLog;

export const selectMealPrepLogFormModalErrorMessage = (state: State) =>
  state.mealPrepLogs.mealPrepLogFormModalErrorMessage;

export const selectLoadingGetUserMealPrepLogs = (state: State) =>
  state.mealPrepLogs.loadingGetUserMealPrepLogs;

export const selectLoadingGetUserMealPrepLog = (state: State) =>
  state.mealPrepLogs.loadingGetUserMealPrepLog;

export const {
  updateTemplateMealPrepLog,
  updateLoadingCreateMealPrepLog,
  updateLoadingGetUserMealPrepLogs,
} = mealPrepLogsSlice.actions;

export default mealPrepLogsSlice.reducer;
