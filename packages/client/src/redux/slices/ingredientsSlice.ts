// Redux Toolkit
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import { defaultTemplateIngredient } from "@/data";
// Types
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { State } from "../api/store";

type ObjectKeyValueType = {
  key: string;
  value: any;
};

type LoadingStateType = "IDLE" | "PENDING" | "SUCCEDED" | "FAILED";

type InitialStateType = {
  // General
  templateIngredient: IngredientTemplate;
};

const initialState: InitialStateType = {
  templateIngredient: defaultTemplateIngredient,
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    updateTemplateIngredient(state, action: PayloadAction<ObjectKeyValueType>) {
      state.templateIngredient = {
        ...state.templateIngredient,
        [action.payload.key]: action.payload.value,
      };
    },
  },
});

export const selectTemplateIngredient = (state: State) =>
  state.ingredients.templateIngredient;

export const { updateTemplateIngredient } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
