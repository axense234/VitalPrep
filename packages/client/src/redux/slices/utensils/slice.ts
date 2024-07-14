// Redux
import { createSlice } from "@reduxjs/toolkit";
// Initial State
import utensilsSliceInitialState from "./initialState";
// Reducers
import utensilsSliceReducers from "./reducers";
// Extra Reducers
import utensilsSliceExtraReducers from "./extraReducers";

const utensilsSlice = createSlice({
  name: "utensils",
  initialState: utensilsSliceInitialState,
  reducers: utensilsSliceReducers,
  extraReducers: utensilsSliceExtraReducers,
});

export const {
  updateTemplateUtensil,
  updateLoadingCreateUtensil,
  updateLoadingGetUserUtensils,
  updateLoadingUpdateUtensil,
  setTemplateUtensil,
  updateLoadingGetUserUtensil,
} = utensilsSlice.actions;

export default utensilsSlice.reducer;
