// Redux Toolkit
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import { State } from "../api/store";
// Data
import { defaultTemplateIngredient } from "@/data";
// Types
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
// Prisma
import { Ingredient } from "@prisma/client";
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
  templateIngredient: IngredientTemplate;
  loadingCreateIngredient: LoadingStateType;
  ingredientFormModalErrorMessage: string;

  loadingGetUserIngredients: LoadingStateType;
  loadingGetUserIngredient: LoadingStateType;
};

export const ingredientsAdapter = createEntityAdapter<Ingredient>();

const initialState = ingredientsAdapter.getInitialState({
  templateIngredient: defaultTemplateIngredient,
  loadingCreateIngredient: "IDLE",
  ingredientFormModalErrorMessage: "Default Message",
  loadingGetUserIngredients: "IDLE",
  loadingGetUserIngredient: "IDLE",
}) as EntityState<Ingredient, string> & InitialStateType;

type CreateIngredientBody = {
  templateIngredient: IngredientTemplate;
  userId: string;
};

export const createIngredient = createAsyncThunk<
  Ingredient | AxiosError,
  CreateIngredientBody
>("ingredients/createIngredient", async ({ templateIngredient, userId }) => {
  try {
    console.log(templateIngredient);
    const { data } = await axiosInstance.post(
      "/ingredients/create",
      templateIngredient,
      { params: { userId: userId } }
    );
    return data.ingredient as Ingredient;
  } catch (error) {
    return error as AxiosError;
  }
});

export const getAllUserIngredients = createAsyncThunk<
  Ingredient[] | AxiosError,
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
      return data.ingredients as Ingredient[];
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getUserIngredient = createAsyncThunk<
  Ingredient | AxiosError,
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
    return data.ingredient as Ingredient;
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
  },
  extraReducers(builder) {
    builder
      .addCase(getUserIngredient.pending, (state, action) => {
        state.loadingGetUserIngredient = "PENDING";
      })
      .addCase(getUserIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as IngredientTemplate;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.upsertOne(state, ingredient as Ingredient);
          state.loadingGetUserIngredient = "SUCCEDED";
        } else {
          state.loadingGetUserIngredient = "FAILED";
        }
      })
      .addCase(getAllUserIngredients.pending, (state, action) => {
        state.loadingGetUserIngredients = "PENDING";
      })
      .addCase(getAllUserIngredients.fulfilled, (state, action) => {
        const ingredients = action.payload as Ingredient[];

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
        const ingredient = action.payload as Ingredient;
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

export const {
  updateTemplateIngredient,
  updateLoadingCreateIngredient,
  updateLoadingGetUserIngredients,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
