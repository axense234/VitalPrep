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
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
// Prisma
import { DayTemplate } from "@prisma/client";
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
  templateDayTemplate: DayTemplateTemplate;
  loadingCreateDayTemplate: LoadingStateType;
  dayTemplateFormModalErrorMessage: string;
  numberOfMeals: number;
};

export const dayTemplatesAdapter = createEntityAdapter<DayTemplate>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = dayTemplatesAdapter.getInitialState({
  templateDayTemplate: defaultTemplateDayTemplate,
  loadingCreateDayTemplate: "IDLE",
  dayTemplateFormModalErrorMessage: "Default Message",
  numberOfMeals: 0,
}) as EntityState<DayTemplate, string> & InitialStateType;

type CreateDayTemplateBody = {
  templateDayTemplate: DayTemplateTemplate;
  userId: string;
};

export const createDayTemplate = createAsyncThunk<
  DayTemplate | AxiosError,
  CreateDayTemplateBody
>("dayTemplates/createDayTemplate", async ({ templateDayTemplate, userId }) => {
  try {
    const { data } = await axiosInstance.post(
      "/dayTemplates/create",
      templateDayTemplate,
      { params: { userId: userId } }
    );
    return data.dayTemplate as DayTemplate;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const dayTemplatesSlice = createSlice({
  name: "dayTemplates",
  initialState,
  reducers: {
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
      .addCase(createDayTemplate.pending, (state, action) => {
        state.loadingCreateDayTemplate = "PENDING";
      })
      .addCase(createDayTemplate.fulfilled, (state, action) => {
        const dayTemplate = action.payload as DayTemplate;
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
} = dayTemplatesAdapter.getSelectors<State>((state) => state.dayTemplates);

export const selectTemplateDayTemplate = (state: State) =>
  state.dayTemplates.templateDayTemplate;

export const selectLoadingCreateDayTemplate = (state: State) =>
  state.dayTemplates.loadingCreateDayTemplate;

export const selectDayTemplateFormModalErrorMessage = (state: State) =>
  state.dayTemplates.dayTemplateFormModalErrorMessage;

export const selectNumberOfMeals = (state: State) =>
  state.dayTemplates.numberOfMeals;

export const {
  updateTemplateDayTemplate,
  updateLoadingCreateDayTemplate,
  updateNumberOfMeals,
} = dayTemplatesSlice.actions;

export default dayTemplatesSlice.reducer;
