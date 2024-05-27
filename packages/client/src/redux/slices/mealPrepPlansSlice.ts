// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateMealPrepPlan } from "@/data";
// Types
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import MealPrepPlansSliceStateType from "@/core/types/entity/mealPrepPlan/MealPrepPlansSliceStateType";
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
import MealPrepPlanCreateBodyType from "@/core/types/entity/mealPrepPlan/MealPrepPlanCreateBodyType";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const mealPrepPlansAdapter = createEntityAdapter<MealPrepPlanType>();

const initialState = mealPrepPlansAdapter.getInitialState({
  templateMealPrepPlan: defaultTemplateMealPrepPlan,
  loadingCreateMealPrepPlan: "IDLE",
  loadingDeleteMealPrepPlan: "IDLE",
  loadingUpdateMealPrepPlan: "IDLE",
  mealPrepPlanFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  numberOfInstanceTemplates: 0,
  loadingGetUserMealPrepPlans: "IDLE",
  loadingGetUserMealPrepPlan: "IDLE",
}) as MealPrepPlansSliceStateType;

export const createMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  MealPrepPlanCreateBodyType
>(
  "mealPrepPlans/createMealPrepPlan",
  async ({ templateMealPrepPlan, userId }) => {
    try {
      const { data } = await axiosInstance.post(
        "/mealPrepPlans/create",
        templateMealPrepPlan,
        { params: { userId: userId } }
      );
      return data.mealPrepPlan as MealPrepPlanType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserMealPrepPlans = createAsyncThunk<
  MealPrepPlanType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "mealPrepPlans/getAllUserMealPrepPlans",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/mealPrepPlans`, {
        params: {
          userId,
          userMealPrepPlans: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
          includeUtensils: true,
          includeIngredients: true,
          includeRecipes: true,
          includeDayTemplates: true,
          includeInstanceTemplates: true,
        },
      });
      return data.mealPrepPlans as MealPrepPlanType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  { userId: string; mealPrepPlanId: string }
>("mealPrepPlans/getUserMealPrepPlan", async ({ userId, mealPrepPlanId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/mealPrepPlans/${mealPrepPlanId}`,
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
          includeInstanceTemplates: true,
          includeInstanceTemplatesMacros: true,
          includeInstanceTemplatesTimings: true,
        },
      }
    );
    return data.mealPrepPlan as MealPrepPlanType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  { mealPrepPlanId: string; userId: string }
>("mealPrepPlans/deleteMealPrepPlan", async ({ mealPrepPlanId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/mealPrepPlans/delete/${mealPrepPlanId}?userId=${userId}`
    );
    return data.mealPrepPlan as MealPrepPlanType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateMealPrepPlan = createAsyncThunk<
  MealPrepPlanType | AxiosError,
  MealPrepPlanCreateBodyType
>(
  "mealPrepPlans/updateMealPrepPlan",
  async ({ templateMealPrepPlan, userId }) => {
    try {
      const { data } = await axiosInstance.patch(
        `/mealPrepPlans/update/${templateMealPrepPlan.id}?userId=${userId}&updateMealPrepPlanSingle=true`,
        templateMealPrepPlan
      );
      return data.mealPrepPlan as MealPrepPlanType;
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
    setTemplateMealPrepPlan(
      state,
      action: PayloadAction<MealPrepPlanTemplate>
    ) {
      state.templateMealPrepPlan = action.payload;
    },
    updateInstanceTemplatesTiming(
      state,
      action: PayloadAction<{ load: ObjectKeyValueType; index: number }>
    ) {
      state.templateMealPrepPlan.instanceTemplatesTimings[
        action.payload.index
      ] = {
        ...state.templateMealPrepPlan.instanceTemplatesTimings[
          action.payload.index
        ],
        [action.payload.load.key]: action.payload.load.value,
      };
    },
    updateLoadingGetUserMealPrepPlans(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserMealPrepPlans = action.payload;
    },
    updateLoadingUpdateMealPrepPlan(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingUpdateMealPrepPlan = action.payload;
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
      .addCase(getUserMealPrepPlan.pending, (state, action) => {
        state.loadingGetUserMealPrepPlan = "PENDING";
      })
      .addCase(getUserMealPrepPlan.fulfilled, (state, action) => {
        const mealPrepPlan = action.payload as MealPrepPlanType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          mealPrepPlansAdapter.upsertOne(
            state,
            mealPrepPlan as MealPrepPlanType
          );
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

export const selectLoadingGetUserMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingGetUserMealPrepPlan;

export const selectLoadingUpdateMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingUpdateMealPrepPlan;

export const selectLoadingDeleteMealPrepPlan = (state: State) =>
  state.mealPrepPlans.loadingDeleteMealPrepPlan;

export const {
  updateTemplateMealPrepPlan,
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateLoadingGetUserMealPrepPlans,
  updateInstanceTemplatesTiming,
  updateLoadingUpdateMealPrepPlan,
  setTemplateMealPrepPlan,
} = mealPrepPlansSlice.actions;

export default mealPrepPlansSlice.reducer;
