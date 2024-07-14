// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import dayTemplatesSliceInitialState from "./initialState";
// Reducers
import dayTemplatesSliceReducers from "./reducers";
// Extra Reducers
import dayTemplatesSliceExtraReducers from "./extraReducers";

const dayTemplatesSlice = createSlice({
  name: "dayTemplates",
  initialState: dayTemplatesSliceInitialState,
  reducers: dayTemplatesSliceReducers,
  extraReducers: dayTemplatesSliceExtraReducers,
});

export const {
  updateTemplateDayTemplate,
  updateLoadingCreateDayTemplate,
  updateNumberOfMeals,
  updateLoadingGetUserDayTemplates,
  updateLoadingUpdateDayTemplate,
  setTemplateDayTemplate,
  updateLoadingGetUserDayTemplate,
} = dayTemplatesSlice.actions;

export default dayTemplatesSlice.reducer;
