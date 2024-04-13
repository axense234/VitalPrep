// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateMealPrepPlan } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
// Prisma
import { MealPrepPlan } from "@prisma/client";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type LoadingStateType = "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";

type InitialStateType = {
  // General
  templateMealPrepPlan: MealPrepPlanTemplate;
  loadingCreateMealPrepPlan: LoadingStateType;
  mealPrepPlanFormModalErrorMessage: string;

  numberOfInstanceTemplates: number;

  loadingGetUserMealPrepPlans: LoadingStateType;
};

export const mealPrepPlansAdapter = createEntityAdapter<MealPrepPlan>();

const initialState = mealPrepPlansAdapter.getInitialState({
  templateMealPrepPlan: defaultTemplateMealPrepPlan,
  loadingCreateMealPrepPlan: "IDLE",
  mealPrepPlanFormModalErrorMessage: "Default Message",
  numberOfInstanceTemplates: 0,
  loadingGetUserMealPrepPlans: "IDLE",
}) as EntityState<MealPrepPlan, string> & InitialStateType;

type CreateMealPrepPlanBody = {
  templateMealPrepPlan: MealPrepPlanTemplate;
  userId: string;
};

export const createMealPrepPlan = createAsyncThunk<
  MealPrepPlan | AxiosError,
  CreateMealPrepPlanBody
>(
  "mealPrepPlans/createMealPrepPlan",
  async ({ templateMealPrepPlan, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/mealPrepPlans/create",
        templateMealPrepPlan,
        { params: { userId: userId } }
      );
      return data.mealPrepPlan as MealPrepPlan;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserMealPrepPlans = createAsyncThunk<
  MealPrepPlanTemplate[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepPlans/getAllUserMealPrepPlans",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(
        `/mealPrepPlans?userId=${userId}&userMealPrepPlans=true&searchByKey=${searchByKey}&searchByValue=${searchByValue}&sortByKey=${sortByKey}&sortByOrder=${sortByOrder}`
      );
      return data.mealPrepPlans as MealPrepPlanTemplate[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

const mealPrepPlansSlice = createSlice({
  name: "mealPrepPlans",
  initialState,
  reducers: {
    updateLoadingGetUserMealPrepPlans(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserMealPrepPlans = action.payload;
    },
    updateNumberOfInstanceTemplates(state, action: PayloadAction<number>) {
      state.numberOfInstanceTemplates = action.payload as number;
    },
    updateLoadingCreateMealPrepPlan(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateMealPrepPlan = action.payload;
    },
    updateTemplateMealPrepPlan(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateMealPrepPlan = {
        ...state.templateMealPrepPlan,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserMealPrepPlans.pending, (state, action) => {
        state.loadingGetUserMealPrepPlans = "PENDING";
      })
      .addCase(getAllUserMealPrepPlans.fulfilled, (state, action) => {
        const mealPrepPlans = action.payload as MealPrepPlan[];

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
        const mealPrepPlan = action.payload as MealPrepPlan;
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
      });
  },
});

export const {
  selectAll: selectAllMealPrepPlans,
  selectById: selectMealPrepPlanById,
  selectIds: selectAllMealPrepPlansIds,
} = mealPrepPlansAdapter.getSelectors<State>((state) => state.mealPrepPlans);

export const selectMealPrepPlanTemplate = (state: State) =>
  state.mealPrepPlans.templateMealPrepPlan;

export const selectLoadingCreateMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingCreateMealPrepPlan;

export const selectMealPrepPlanFormModalErrorMessage = (state: State) =>
  state.mealPrepPlans.mealPrepPlanFormModalErrorMessage;

export const selectNumberOfInstanceTemplates = (state: State) =>
  state.mealPrepPlans.numberOfInstanceTemplates;

export const selectLoadingGetUserMealPrepPlans = (state: State) =>
  state.mealPrepPlans.loadingGetUserMealPrepPlans;

export const {
  updateTemplateMealPrepPlan,
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateLoadingGetUserMealPrepPlans,
} = mealPrepPlansSlice.actions;

export default mealPrepPlansSlice.reducer;
