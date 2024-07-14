// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// InitialState
import ingredientsSliceInitialState from "./initialState";
// Reducers
import ingredientsSliceReducers from "./reducers";
// Extra Reducers
import ingredientsSliceExtraReducers from "./extraReducers";

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: ingredientsSliceInitialState,
  reducers: ingredientsSliceReducers,
  extraReducers: ingredientsSliceExtraReducers,
});

export const {
  updateTemplateIngredient,
  updateLoadingCreateIngredient,
  updateLoadingGetUserIngredients,
  updateTemplateIngredientMacros,
  updateLoadingUpdateIngredient,
  setTemplateIngredient,
  updateLoadingGetUserIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
