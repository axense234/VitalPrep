// Redux Toolkit
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import { defaultTemplateIngredient } from "@/data";
// Types
import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { State } from "../api/store";
import { Ingredient } from "@prisma/client";
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
  showIngredientFormModal: boolean;
  ingredientModalMessage: string;
};

export const ingredientsAdapter = createEntityAdapter<Ingredient>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = ingredientsAdapter.getInitialState({
  templateIngredient: defaultTemplateIngredient,
  loadingCreateIngredient: "IDLE",
  showIngredientFormModal: false,
  ingredientModalMessage: "Default Message",
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

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    changeShowIngredientFormModal(state, action: PayloadAction<boolean>) {
      state.showIngredientFormModal = action.payload;
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
      .addCase(createIngredient.pending, (state, action) => {
        state.loadingCreateIngredient = "PENDING";
      })
      .addCase(createIngredient.fulfilled, (state, action) => {
        const ingredient = action.payload as Ingredient;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          ingredientsAdapter.addOne(state, ingredient);
          state.loadingCreateIngredient = "SUCCEDED";
          state.ingredientModalMessage = `Successfully created ingredient: ${ingredient.name}`;
        } else {
          const errorData = axiosError?.response?.data as { message: string };
          state.showIngredientFormModal = true;
          state.loadingCreateIngredient = "FAILED";
          state.ingredientModalMessage = errorData.message;
        }
      });
  },
});

export const {
  selectAll: selectAllIngredients,
  selectById: selectIngredientById,
} = ingredientsAdapter.getSelectors<State>((state) => state.ingredients);

export const selectTemplateIngredient = (state: State) =>
  state.ingredients.templateIngredient;

export const selectLoadingCreateIngredient = (state: State) =>
  state.ingredients.loadingCreateIngredient;

export const selectShowIngredientModal = (state: State) =>
  state.ingredients.showIngredientFormModal;
export const selectIngredientModalMessage = (state: State) =>
  state.ingredients.ingredientModalMessage;

export const { updateTemplateIngredient, changeShowIngredientFormModal } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
