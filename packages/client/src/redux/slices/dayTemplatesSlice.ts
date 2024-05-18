// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateDayTemplate } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import DayTemplatesSliceStateType from "@/core/types/entity/dayTemplate/DayTemplatesSliceStateType";
import DayTemplateCreateBodyType from "@/core/types/entity/dayTemplate/DayTemplateCreateBodyType";
// Prisma
import { DayTemplate } from "@prisma/client";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
import DayTemplateType from "@/core/types/entity/dayTemplate/DayTemplateType";

export const dayTemplatesAdapter = createEntityAdapter<DayTemplateType>();

const initialState = dayTemplatesAdapter.getInitialState({
  templateDayTemplate: defaultTemplateDayTemplate,
  loadingCreateDayTemplate: "IDLE",
  dayTemplateFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  numberOfMeals: 0,
  mealsInOrder: [],
  loadingGetUserDayTemplates: "IDLE",
  loadingGetUserDayTemplate: "IDLE",
}) as DayTemplatesSliceStateType;

export const createDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  DayTemplateCreateBodyType
>("dayTemplates/createDayTemplate", async ({ templateDayTemplate, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/dayTemplates/create",
      templateDayTemplate,
      { params: { userId: userId } }
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getAllUserDayTemplates = createAsyncThunk<
  DayTemplateType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "dayTemplates/getAllUserDayTemplates",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/dayTemplates`, {
        params: {
          userId,
          userDayTemplates: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
          includeIngredients: true,
          includeUtensils: true,
          includeRecipes: true,
          includeInstanceTemplates: true,
          includeMealPrepPlans: true,
        },
      });
      return data.dayTemplates as DayTemplateType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserDayTemplate = createAsyncThunk<
  DayTemplateType | AxiosError,
  { userId: string; dayTemplateId: string }
>("dayTemplates/getUserDayTemplate", async ({ userId, dayTemplateId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/dayTemplates/${dayTemplateId}`,
      {
        params: {
          includeMacros: true,
          includeIngredients: true,
          includeIngredientsMacros: true,
          includeUtensils: true,
          includeRecipes: true,
          includeRecipesMacros: true,
          includeInstanceTemplates: true,
          includeMealPrepPlans: true,
        },
      }
    );
    return data.dayTemplate as DayTemplateType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const dayTemplatesSlice = createSlice({
  name: "dayTemplates",
  initialState,
  reducers: {
    updateLoadingGetUserDayTemplates(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserDayTemplates = action.payload;
    },
    updateNumberOfMeals(state, action: PayloadAction<number>) {
      state.numberOfMeals = action.payload as number;
    },
    updateLoadingCreateDayTemplate(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateDayTemplate = action.payload;
    },
    updateTemplateDayTemplate(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateDayTemplate = {
        ...state.templateDayTemplate,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
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
      });
  },
});

export const {
  selectAll: selectAllDayTemplates,
  selectById: selectDayTemplateById,
  selectIds: selectAllDayTemplatesIds,
} = dayTemplatesAdapter.getSelectors<State>((state) => state.dayTemplates);

export const selectTemplateDayTemplate = (state: State) =>
  state.dayTemplates.templateDayTemplate;

export const selectLoadingCreateDayTemplate = (state: State) =>
  state.dayTemplates.loadingCreateDayTemplate;

export const selectDayTemplateFormModalErrorMessage = (state: State) =>
  state.dayTemplates.dayTemplateFormModalErrorMessage;

export const selectNumberOfMeals = (state: State) =>
  state.dayTemplates.numberOfMeals;

export const selectLoadingGetUserDayTemplates = (state: State) =>
  state.dayTemplates.loadingGetUserDayTemplates;

export const selectLoadingGetUserDayTemplate = (state: State) =>
  state.dayTemplates.loadingGetUserDayTemplate;

export const {
  updateTemplateDayTemplate,
  updateLoadingCreateDayTemplate,
  updateNumberOfMeals,
  updateLoadingGetUserDayTemplates,
} = dayTemplatesSlice.actions;

export default dayTemplatesSlice.reducer;
