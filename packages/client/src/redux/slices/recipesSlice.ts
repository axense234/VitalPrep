// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateRecipe, defaultTemplateUtensil } from "@/data";
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
import { Recipe } from "@prisma/client";
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
  showVideoTutorialContent: boolean;
  showWrittenTutorialContent: boolean;
};

export const recipesAdapter = createEntityAdapter<Recipe>({
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialState = recipesAdapter.getInitialState({
  templateRecipe: defaultTemplateRecipe,
  loadingCreateRecipe: "IDLE",
  recipeFormModalErrorMessage: "Default Message",
  showVideoTutorialContent: false,
  showWrittenTutorialContent: false,
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
    console.log(error);
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
    changeShowVideoTutorialContent(state, action: PayloadAction<boolean>) {
      state.showVideoTutorialContent = action.payload;
    },
    changeShowWrittenTutorialContent(state, action: PayloadAction<boolean>) {
      state.showWrittenTutorialContent = action.payload;
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

export const selectShowVideoTutorialContent = (state: State) =>
  state.recipes.showVideoTutorialContent;

export const selectShowWrittenTutorialContent = (state: State) =>
  state.recipes.showWrittenTutorialContent;

export const {
  updateTemplateRecipe,
  updateLoadingCreateRecipe,
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
} = recipesSlice.actions;

export default recipesSlice.reducer;
