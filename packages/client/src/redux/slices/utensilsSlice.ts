// Redux Toolkit
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import { State } from "../api/store";
// Data
import { defaultTemplateUtensil } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
// Prisma
import { Utensil } from "@prisma/client";
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
  templateUtensil: UtensilTemplate;
  loadingCreateUtensil: LoadingStateType;
  utensilFormModalErrorMessage: string;

  loadingGetUserUtensils: LoadingStateType;
};

export const utensilsAdapter = createEntityAdapter<Utensil>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = utensilsAdapter.getInitialState({
  templateUtensil: defaultTemplateUtensil,
  loadingCreateUtensil: "IDLE",
  utensilFormModalErrorMessage: "Default Message",
  loadingGetUserUtensils: "IDLE",
}) as EntityState<Utensil, string> & InitialStateType;

type CreateUtensilBody = {
  templateUtensil: UtensilTemplate;
  userId: string;
};

export const createUtensil = createAsyncThunk<
  Utensil | AxiosError,
  CreateUtensilBody
>("utensils/createUtensil", async ({ templateUtensil, userId }) => {
  try {
    console.log(templateUtensil);
    const { data } = await axiosInstance.post(
      "/utensils/create",
      templateUtensil,
      { params: { userId: userId } }
    );
    return data.utensil as Utensil;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getAllUserUtensils = createAsyncThunk<
  Utensil[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>("utensils/getAllUserUtensils", async ({ userId, entityQueryValues }) => {
  try {
    const { searchByKey, searchByValue, sortByKey, sortByOrder } =
      entityQueryValues;
    const { data } = await axiosInstance.get(
      `/utensils?userId=${userId}&userUtensils=true&searchByKey=${searchByKey}&searchByValue=${searchByValue}&sortByKey=${sortByKey}&sortByOrder=${sortByOrder}`
    );
    return data.utensils as Utensil[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const utensilsSlice = createSlice({
  name: "utensils",
  initialState,
  reducers: {
    updateLoadingCreateUtensil(state, action: PayloadAction<LoadingStateType>) {
      state.loadingCreateUtensil = action.payload;
    },
    updateLoadingGetUserUtensils(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserUtensils = action.payload;
    },
    updateTemplateUtensil(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateUtensil = {
        ...state.templateUtensil,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserUtensils.pending, (state, action) => {
        state.loadingGetUserUtensils = "PENDING";
      })
      .addCase(getAllUserUtensils.fulfilled, (state, action) => {
        const utensils = action.payload as Utensil[];

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
        const utensil = action.payload as Utensil;
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
      });
  },
});

export const {
  selectAll: selectAllUtensils,
  selectById: selectUtensilById,
  selectIds: selectAllUtensilsIds,
} = utensilsAdapter.getSelectors<State>((state) => state.utensils);

export const selectTemplateUtensil = (state: State) =>
  state.utensils.templateUtensil;

export const selectLoadingCreateUtensil = (state: State) =>
  state.utensils.loadingCreateUtensil;

export const selectUtensilFormModalErrorMessage = (state: State) =>
  state.utensils.utensilFormModalErrorMessage;

export const selectLoadingGetUserUtensils = (state: State) =>
  state.utensils.loadingGetUserUtensils;

export const {
  updateTemplateUtensil,
  updateLoadingCreateUtensil,
  updateLoadingGetUserUtensils,
} = utensilsSlice.actions;

export default utensilsSlice.reducer;
