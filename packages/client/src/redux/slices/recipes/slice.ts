// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import recipesSliceInitialState from "./initialState";
// Reducers
import recipesSliceReducers from "./reducers";
// Extra Reducerss
import recipesSliceExtraReducers from "./extraReducers";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: recipesSliceInitialState,
  reducers: recipesSliceReducers,
  extraReducers: recipesSliceExtraReducers,
});

export const {
  updateTemplateRecipe,
  updateLoadingCreateRecipe,
  changeShowVideoTutorialContent,
  changeShowWrittenTutorialContent,
  updateLoadingGetUserRecipes,
  updateTemplateRecipeTutorial,
  updateLoadingUpdateRecipe,
  setTemplateRecipe,
} = recipesSlice.actions;

export default recipesSlice.reducer;
