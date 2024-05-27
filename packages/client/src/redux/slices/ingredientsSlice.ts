// Data
import { defaultTemplateIngredient } from "@/data";
// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import IngredientsSliceStateType from "@/core/types/entity/ingredient/IngredientsSliceStateType";
import IngredientCreateBodyType from "@/core/types/entity/ingredient/IngredientCreateBodyType";
import IngredientType from "@/core/types/entity/ingredient/IngredientType";
// Redux Toolkit
import { State } from "../api/store";
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";

export const ingredientsAdapter = createEntityAdapter<IngredientType>();

const initialState = ingredientsAdapter.getInitialState({
  templateIngredient: defaultTemplateIngredient,
  loadingCreateIngredient: "IDLE",
  loadingDeleteIngredient: "IDLE",
  loadingUpdateIngredient: "IDLE",
  ingredientFormModalErrorMessage:
    "Something went wrong, please refresh the page!",
  loadingGetUserIngredients: "IDLE",
  loadingGetUserIngredient: "IDLE",
}) as IngredientsSliceStateType;

export const createIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  IngredientCreateBodyType
>("ingredients/createIngredient", async ({ templateIngredient, userId }) => {
  try {
    console.log(templateIngredient);
    const { data } = await axiosInstance.post(
      "/ingredients/create",
      templateIngredient,
      { params: { userId: userId } }
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getAllUserIngredients = createAsyncThunk<
  IngredientType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>(
  "ingredients/getAllUserIngredients",
  async ({ userId, entityQueryValues }) => {
    try {
      const { searchByKey, searchByValue, sortByKey, sortByOrder } =
        entityQueryValues;
      const { data } = await axiosInstance.get(`/ingredients`, {
        params: {
          userId,
          userIngredients: true,
          searchByKey,
          searchByValue,
          sortByKey,
          sortByOrder,
          includeMacros: true,
        },
      });
      return data.ingredients as IngredientType[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  { userId: string; ingredientId: string }
>("ingredients/getUserIngredient", async ({ userId, ingredientId }) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/ingredients/${ingredientId}`,
      {
        params: {
          includeMacros: true,
          includeUser: true,
          includeRecipes: true,
          includeDayTemplates: true,
          includeInstanceTemplates: true,
          includeMealPrepPlans: true,
        },
      }
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const deleteIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  { ingredientId: string; userId: string }
>("ingredients/deleteIngredient", async ({ ingredientId, userId }) => {
  try {
    const { data } = await axiosInstance.delete(
      `/ingredients/delete/${ingredientId}?userId=${userId}`
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const updateIngredient = createAsyncThunk<
  IngredientType | AxiosError,
  IngredientCreateBodyType
>("ingredients/updateIngredient", async ({ templateIngredient, userId }) => {
  try {
    const { data } = await axiosInstance.patch(
      `/ingredients/update/${templateIngredient.id}?userId=${userId}&updateIngredientSingle=true`,
      templateIngredient
    );
    return data.ingredient as IngredientType;
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    updateLoadingCreateIngredient(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingCreateIngredient = action.payload;
    },
    updateLoadingUpdateIngredient(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingUpdateIngredient = action.payload;
    },
    updateLoadingGetUserIngredients(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserIngredients = action.payload;
    },
    updateTemplateIngredient(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateIngredient = {
        ...state.templateIngredient,
        [action.payload.key]: action.payload.value,
      };
    },
    updateTemplateIngredientMacros(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateIngredient.macros = {
        ...state.templateIngredient.macros,
        [action.payload.key]: action.payload.value,
      };
    },
    setTemplateIngredient(state, action: PayloadAction<IngredientTemplate>) {
      state.templateIngredient = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserIngredient.pending, (state, action) => {
        state.loadingGetUserIngredient = "PENDING";
      })
      .addCase(getUserIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as IngredientType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.upsertOne(state, ingredient);
          state.loadingGetUserIngredient = "SUCCEDED";
        } else {
          state.loadingGetUserIngredient = "FAILED";
        }
      })
      .addCase(getAllUserIngredients.pending, (state, action) => {
        state.loadingGetUserIngredients = "PENDING";
      })
      .addCase(getAllUserIngredients.fulfilled, (state, action) => {
        const ingredients = action.payload as IngredientType[];

        if (ingredients.length >= 1) {
          state.loadingGetUserIngredients = "SUCCEDED";
          ingredientsAdapter.removeAll(state);
          ingredientsAdapter.addMany(state, ingredients);
        } else {
          state.loadingGetUserIngredients = "FAILED";
        }
      })
      .addCase(createIngredient.pending, (state, action) => {
        state.loadingCreateIngredient = "PENDING";
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as IngredientType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.addOne(state, ingredient);
          state.loadingCreateIngredient = "SUCCEDED";
        } else {
          const error = axiosError.response?.data as {
            message: string;
            type: string;
          };
          if (error.type !== "jwt") {
            state.ingredientFormModalErrorMessage = error.message;
          }
          state.loadingCreateIngredient = "FAILED";
        }
      })
      .addCase(deleteIngredient.pending, (state, action) => {
        state.loadingDeleteIngredient = "PENDING";
      })
      .addCase(deleteIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as IngredientType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.removeOne(state, ingredient.id);
          state.loadingDeleteIngredient = "SUCCEDED";
        } else {
          const error = axiosError.response?.data as {
            message: string;
            type: string;
          };
          if (error.type !== "jwt") {
            state.ingredientFormModalErrorMessage = error.message;
          }
          state.loadingDeleteIngredient = "FAILED";
        }
      })
      .addCase(updateIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as IngredientType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.updateOne(state, {
            changes: { ...ingredient },
            id: ingredient.id,
          });
          state.loadingUpdateIngredient = "SUCCEDED";
        } else {
          const error = axiosError.response?.data as {
            message: string;
            type: string;
          };
          if (error.type !== "jwt") {
            state.ingredientFormModalErrorMessage = error.message;
          }
          state.loadingUpdateIngredient = "FAILED";
        }
      });
  },
});

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
  selectIds: selectAllIngredientsIds,
} = ingredientsAdapter.getSelectors<State>((state) => state.ingredients);

export const selectTemplateIngredient = (state: State) =>
  state.ingredients.templateIngredient;

export const selectLoadingCreateIngredient = (state: State) =>
  state.ingredients.loadingCreateIngredient;

export const selectIngredientFormModalErrorMessage = (state: State) =>
  state.ingredients.ingredientFormModalErrorMessage;

export const selectLoadingGetUserIngredients = (state: State) =>
  state.ingredients.loadingGetUserIngredients;

export const selectLoadingGetUserIngredient = (state: State) =>
  state.ingredients.loadingGetUserIngredient;

export const selectLoadingUpdateIngredient = (state: State) =>
  state.ingredients.loadingUpdateIngredient;

export const selectLoadingDeleteIngredient = (state: State) =>
  state.ingredients.loadingDeleteIngredient;

export const {
  updateTemplateIngredient,
  updateLoadingCreateIngredient,
  updateLoadingGetUserIngredients,
  updateTemplateIngredientMacros,
  updateLoadingUpdateIngredient,
  setTemplateIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
