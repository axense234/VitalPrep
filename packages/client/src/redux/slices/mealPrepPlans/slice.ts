// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import mealPrepPlansSliceInitialState from "./initialState";
// Reducers
import mealPrepPlansSliceReducers from "./reducers";
// Extra Reducers
import mealPrepPlansSliceExtraReducers from "./extraReducers";

const mealPrepPlansSlice = createSlice({
  name: "mealPrepPlans",
  initialState: mealPrepPlansSliceInitialState,
  reducers: mealPrepPlansSliceReducers,
  extraReducers: mealPrepPlansSliceExtraReducers,
});

export const {
  updateTemplateMealPrepPlan,
  updateLoadingCreateMealPrepPlan,
  updateNumberOfInstanceTemplates,
  updateLoadingGetUserMealPrepPlans,
  updateInstanceTemplatesTiming,
  updateLoadingUpdateMealPrepPlan,
  setTemplateMealPrepPlan,
} = mealPrepPlansSlice.actions;

export default mealPrepPlansSlice.reducer;
