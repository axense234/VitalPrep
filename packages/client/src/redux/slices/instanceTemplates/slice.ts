// Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import instanceTemplatesInitialState from "./initialState";
// Reducers
import instanceTemplatesSliceReducers from "./reducers";
// Extra Reducers
import instanceTemplatesSliceExtraReducers from "./extraReducers";

const instanceTemplatesSlice = createSlice({
  name: "instanceTemplates",
  initialState: instanceTemplatesInitialState,
  reducers: instanceTemplatesSliceReducers,
  extraReducers: instanceTemplatesSliceExtraReducers,
});

export const {
  updateTemplateInstanceTemplate,
  updateLoadingCreateInstanceTemplate,
  updateLoadingGetUserInstanceTemplates,
  updateLoadingUpdateInstanceTemplate,
  setTemplateInstanceTemplate,
  updateLoadingGetUserInstanceTemplate,
} = instanceTemplatesSlice.actions;

export default instanceTemplatesSlice.reducer;
