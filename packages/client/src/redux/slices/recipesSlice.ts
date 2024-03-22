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
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
// Prisma
import { Recipe, Utensil } from "@prisma/client";
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
  templateRecipe: RecipeTemplate;
  loadingCreateRecipe: LoadingStateType;
  recipeFormModalErrorMessage: string;
};

export const recipesAdapter = createEntityAdapter<Recipe>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = recipesAdapter.getInitialState({
  templateRecipe: defaultTemplateUtensil,
  loadingCreateRecipe: "IDLE",
  recipeFormModalErrorMessage: "Default Message",
}) as EntityState<Recipe, string> & InitialStateType;

type CreateRecipeBody = {
  templateRecipe: RecipeTemplate;
  userId: string;
};

export const createRecipe = createAsyncThunk<
  Recipe | AxiosError,
  CreateRecipeBody
>("recipes/createRecipe", async ({ templateRecipe, userId }) => {
  try {
    console.log(templateRecipe);
    const { data } = await axiosInstance.post(
      "/recipes/create",
      templateRecipe,
      { params: { userId: userId } }
    );
    return data.recipe as Recipe;
  } catch (error) {
    return error as AxiosError;
  }
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    updateLoadingCreateRecipe(state, action: PayloadAction<LoadingStateType>) {
      state.loadingCreateRecipe = action.payload;
    },
    updateTemplateRecipe(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateRecipe = {
        ...state.templateRecipe,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createRecipe.pending, (state, action) => {
        state.loadingCreateRecipe = "PENDING";
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        const recipe = action.payload as Recipe;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          recipesAdapter.addOne(state, recipe);
          state.loadingCreateRecipe = "SUCCEDED";
        } else {
          const error = axiosError.response?.data as {
            message: string;
            type: string;
          };
          if (error.type !== "jwt") {
            state.recipeFormModalErrorMessage = error.message;
          }
          state.loadingCreateRecipe = "FAILED";
        }
      });
  },
});

export const { selectAll: selectAllRecipes, selectById: selectRecipeById } =
  recipesAdapter.getSelectors<State>((state) => state.recipes);

export const selectTemplateRecipe = (state: State) =>
  state.recipes.templateRecipe;

export const selectLoadingCreateRecipe = (state: State) =>
  state.recipes.loadingCreateRecipe;

export const selectRecipeFormModalErrorMessage = (state: State) =>
  state.recipes.recipeFormModalErrorMessage;

export const { updateTemplateRecipe, updateLoadingCreateRecipe } =
  recipesSlice.actions;

export default recipesSlice.reducer;
