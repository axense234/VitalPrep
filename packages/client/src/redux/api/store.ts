// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Slices
import generalSliceReducer from "../slices/generalSlice";
import ingredientsSliceReducer from "../slices/ingredientsSlice";
import utensilsSliceReducer from "../slices/utensilsSlice";
import recipesSliceReducer from "../slices/recipesSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    ingredients: ingredientsSliceReducer,
    utensils: utensilsSliceReducer,
    recipes: recipesSliceReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
