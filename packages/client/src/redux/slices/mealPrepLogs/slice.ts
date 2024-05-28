// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import mealPrepLogsSliceInitialState from "./initialState";
// Reducers
import mealPrepLogsSliceReducers from "./reducers";
// Extra Reducers
import mealPrepLogsSliceExtraReducers from "./extraReducers";

const mealPrepLogsSlice = createSlice({
  name: "mealPrepLogs",
  initialState: mealPrepLogsSliceInitialState,
  reducers: mealPrepLogsSliceReducers,
  extraReducers: mealPrepLogsSliceExtraReducers,
});

export const {
  updateTemplateMealPrepLog,
  updateLoadingCreateMealPrepLog,
  updateLoadingGetUserMealPrepLogs,
  updateLoadingUpdateMealPrepLog,
  setTemplateMealPrepLog,
} = mealPrepLogsSlice.actions;

export default mealPrepLogsSlice.reducer;
