// Redux Toolkit
import { State } from "../api/store";
// Data
import { defaultTemplateRecipe } from "@/data";
// Types
import {
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import EntityQueryValues from "@/core/types/entity/EntityQueryValues";
import LoadingStateType from "@/core/types/LoadingStateType";
import ObjectKeyValueType from "@/core/types/ObjectKeyValueType";
import RecipesSliceStateType from "@/core/types/entity/recipe/RecipesSliceStateType";
import RecipeCreateBodyType from "@/core/types/entity/recipe/RecipeCreateBodyType";
import RecipeType from "@/core/types/entity/recipe/RecipeType";
// Axios
import { AxiosError } from "axios";
import axiosInstance from "@/utils/axios";

export const recipesAdapter = createEntityAdapter<RecipeType>();

const initialState = recipesAdapter.getInitialState({
  templateRecipe: defaultTemplateRecipe,
  loadingCreateRecipe: "IDLE",
  recipeFormModalErrorMessage: "Default Message",
  showVideoTutorialContent: false,
  showWrittenTutorialContent: false,
  loadingGetUserRecipes: "IDLE",
  loadingGetUserRecipe: "IDLE",
}) as RecipesSliceStateType;

export const createRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  RecipeCreateBodyType
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
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            writtenTutorial: "",
          },
        };
      }

      if (!showVideoTutorialContent) {
        templateRecipe = {
          ...templateRecipe,
          recipeTutorial: {
            ...templateRecipe.recipeTutorial,
            videoTutorial: "",
          },
        };
      }

      const { data } = await axiosInstance.post(
        "/recipes/create",
        templateRecipe,
        { params: { userId: userId } }
      );
      return data.recipe as RecipeType;
    } catch (error) {
      console.log(error);
      return error as AxiosError;
    }
  }
);

export const getAllUserRecipes = createAsyncThunk<
  RecipeType[] | AxiosError,
  { userId: string; entityQueryValues: EntityQueryValues }
>("recipes/getAllUserRecipes", async ({ userId, entityQueryValues }) => {
  try {
    const { searchByKey, searchByValue, sortByKey, sortByOrder } =
      entityQueryValues;
    const { data } = await axiosInstance.get(`/recipes`, {
      params: {
        userId,
        includeIngredients: true,
        includeUtensils: true,
        searchByKey,
        searchByValue,
        sortByKey,
        sortByOrder,
        includeMacros: true,
        includeRecipeTutorial: true,
      },
    });
    return data.recipes as RecipeType[];
  } catch (error) {
    console.log(error);
    return error as AxiosError;
  }
});

export const getUserRecipe = createAsyncThunk<
  RecipeType | AxiosError,
  { userId: string; recipeId: string }
>("recipes/getUserRecipe", async ({ userId, recipeId }) => {
  try {
    const { data } = await axiosInstance.get(`/${userId}/recipes/${recipeId}`, {
      params: {
        includeRecipeTutorial: true,
        includeMacros: true,
        includeIngredients: true,
        includeIngredientsMacros: true,
        includeUtensils: true,
        includeDayTemplates: true,
        includeInstanceTemplates: true,
        includeMealPrepPlans: true,
      },
    });
    return data.recipe as RecipeType;
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
    updateTemplateRecipeTutorial(
      state,
      action: PayloadAction<ObjectKeyValueType>
    ) {
      state.templateRecipe.recipeTutorial = {
        ...state.templateRecipe.recipeTutorial,
        [action.payload.key]: action.payload.value,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserRecipe.pending, (state, action) => {
        state.loadingGetUserRecipe = "PENDING";
      })
      .addCase(getUserRecipe.fulfilled, (state, action) => {
        const recipe = action.payload as RecipeType;
        const axiosError = action.payload as AxiosError;

        if (axiosError !== undefined && !axiosError.response) {
          recipesAdapter.upsertOne(state, recipe as RecipeType);
          state.loadingGetUserRecipe = "SUCCEDED";
        } else {
          state.loadingGetUserRecipe = "FAILED";
        }
      })
      .addCase(getAllUserRecipes.pending, (state, action) => {
        state.loadingGetUserRecipes = "PENDING";
      })
      .addCase(getAllUserRecipes.fulfilled, (state, action) => {
        const recipes = action.payload as RecipeType[];

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
        const recipe = action.payload as RecipeType;
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

export const selectLoadingGetUserRecipe = (state: State) =>
  state.recipes.loadingGetUserRecipe;

export const {
  updateTemplateRecipe,
  updateLoadingCreateRecipe,
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
  updateLoadingGetUserRecipes,
  updateTemplateRecipeTutorial,
} = recipesSlice.actions;

export default recipesSlice.reducer;
