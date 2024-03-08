// Redux Toolkit
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { State } from "../api/store";
type InitialStateType = {
  isSidebarOpened: boolean;
};

const initialState: InitialStateType = {
  isSidebarOpened: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    changeIsSidebarOpened(state, action: PayloadAction<boolean>) {
      state.isSidebarOpened = action.payload;
    },
  },
});

export const selectIsSidebarOpened = (state: State) =>
  state.general.isSidebarOpened;

export const { changeIsSidebarOpened } = generalSlice.actions;

export default generalSlice.reducer;
