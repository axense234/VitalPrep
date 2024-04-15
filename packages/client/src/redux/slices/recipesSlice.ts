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
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
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

  loadingGetUserRecipes: LoadingStateType;
};

export const recipesAdapter = createEntityAdapter<Recipe>();

const initialState = recipesAdapter.getInitialState({
  templateRecipe: defaultTemplateRecipe,
  loadingCreateRecipe: "IDLE",
  recipeFormModalErrorMessage: "Default Message",
  showVideoTutorialContent: false,
  showWrittenTutorialContent: false,
  loadingGetUserRecipes: "IDLE",
}) as EntityState<Recipe, string> & InitialStateType;

type CreateRecipeBody = {
  templateRecipe: RecipeTemplate;
  showVideoTutorialContent: boolean;
  showWrittenTutorialContent: boolean;
  userId: string;
};

export const createRecipe = createAsyncThunk<
  Recipe | AxiosError,
  CreateRecipeBody
>(
  "recipes/createRecipe",
  async ({
    templateRecipe,
    userId,
    showWrittenTutorialContent,
    showVideoTutorialContent,
  }) => {
    try {
      if (!showWrittenTutorialContent) {
        templateRecipe = { ...templateRecipe, writtenTutorial: "" };
      }

      if (!showVideoTutorialContent) {
        templateRecipe = { ...templateRecipe, videoTutorial: "" };
      }

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
  }
);

export const getAllUserRecipes = createAsyncThunk<
  Recipe[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>("recipes/getAllUserRecipes", async ({ userId, entityQueryValues }) => {
  try {
    const { searchByKey, searchByValue, sortByKey, sortByOrder } =
      entityQueryValues;
    const { data } = await axiosInstance.get(`/recipes`, {
      params: {
        userId,
        userIngredients: true,
        searchByKey,
        searchByValue,
        sortByKey,
        sortByOrder,
      },
    });
    return data.recipes as Recipe[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    updateLoadingGetUserRecipes(
      state,
      action: PayloadAction<LoadingStateType>
    ) {
      state.loadingGetUserRecipes = action.payload;
    },
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
      .addCase(getAllUserRecipes.pending, (state, action) => {
        state.loadingGetUserRecipes = "PENDING";
      })
      .addCase(getAllUserRecipes.fulfilled, (state, action) => {
        const recipes = action.payload as Recipe[];

        if (recipes.length >= 1) {
          state.loadingGetUserRecipes = "SUCCEDED";
          recipesAdapter.removeAll(state);
          recipesAdapter.addMany(state, recipes);
        } else {
          state.loadingGetUserRecipes = "FAILED";
        }
      })
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

export const {
  selectAll: selectAllRecipes,
  selectById: selectRecipeById,
  selectIds: selectAllRecipesIds,
} = recipesAdapter.getSelectors<State>((state) => state.recipes);

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

export const selectLoadingGetUserRecipes = (state: State) =>
  state.recipes.loadingGetUserRecipes;

export const {
  updateTemplateRecipe,
  updateLoadingCreateRecipe,
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
  updateLoadingGetUserRecipes,
} = recipesSlice.actions;

export default recipesSlice.reducer;
