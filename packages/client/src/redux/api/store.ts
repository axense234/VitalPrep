// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Slices
import generalSliceReducer from "../slices/generalSlice";
import ingredientsSliceReducer from "../slices/ingredientsSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    ingredients: ingredientsSliceReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
