// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateMealPrepLog } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
// Prisma
import { MealPrepLog } from "@prisma/client";
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
  templateMealPrepLog: MealPrepLogTemplate;
  loadingCreateMealPrepLog: LoadingStateType;
  mealPrepLogFormModalErrorMessage: string;

  loadingGetUserMealPrepLogs: LoadingStateType;
  loadingGetUserMealPrepLog: LoadingStateType;
};

export const mealPrepLogsAdapter = createEntityAdapter<MealPrepLog>();

const initialState = mealPrepLogsAdapter.getInitialState({
  templateMealPrepLog: defaultTemplateMealPrepLog,
  loadingCreateMealPrepLog: "IDLE",
  mealPrepLogFormModalErrorMessage: "Default Message",
  loadingGetUserMealPrepLogs: "IDLE",
  loadingGetUserMealPrepLog: "IDLE",
}) as EntityState<MealPrepLog, string> & InitialStateType;

type CreateMealPrepLog = {
  templateMealPrepLog: MealPrepLogTemplate;
  userId: string;
};

export const createMealPrepLog = createAsyncThunk<
  MealPrepLog | AxiosError,
  CreateMealPrepLog
>("mealPrepLogs/createMealPrepLog", async ({ templateMealPrepLog, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/mealPrepLogs/create",
      templateMealPrepLog,
      { params: { userId: userId } }
    );
    return data.mealPrepLog as MealPrepLog;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getAllUserMealPrepLogs = createAsyncThunk<
  MealPrepLog[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepLogs/getAllUserMealPrepLogs",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/mealPrepLogs`, {
        params: {
          userId,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeIngredients: true,
          includeUtensils: true,
          includeRecipes: true,
          includeDayTemplates: true,
        },
      });
      return data.mealPrepLogs as MealPrepLog[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserMealPrepLog = createAsyncThunk<
  MealPrepLog | AxiosError,
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
    return data.mealPrepLog as MealPrepLog;
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
        const mealPrepLog = action.payload as MealPrepLogTemplate;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          mealPrepLogsAdapter.upsertOne(state, mealPrepLog as MealPrepLog);
          state.loadingGetUserMealPrepLog = "SUCCEDED";
        } else {
          state.loadingGetUserMealPrepLog = "FAILED";
        }
      })
      .addCase(getAllUserMealPrepLogs.pending, (state, action) => {
        state.loadingGetUserMealPrepLogs = "PENDING";
      })
      .addCase(getAllUserMealPrepLogs.fulfilled, (state, action) => {
        const mealPrepLogs = action.payload as MealPrepLog[];

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
        const mealPrepLog = action.payload as MealPrepLog;
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
