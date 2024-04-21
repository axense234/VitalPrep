// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Slices
import generalSliceReducer from "../slices/generalSlice";
import ingredientsSliceReducer from "../slices/ingredientsSlice";
import utensilsSliceReducer from "../slices/utensilsSlice";
import recipesSliceReducer from "../slices/recipesSlice";
import dayTemplatesSliceReducer from "../slices/dayTemplatesSlice";
import instanceTemplatesSliceReducer from "../slices/instanceTemplatesSlice";
import mealPrepPlansSliceReducer from "../slices/mealPrepPlansSlice";
import mealPrepLogsSliceReducer from "../slices/mealPrepLogsSlice";

const store = configureStore({
  reducer: {
    general: generalSliceReducer,
    ingredients: ingredientsSliceReducer,
    utensils: utensilsSliceReducer,
    recipes: recipesSliceReducer,
    dayTemplates: dayTemplatesSliceReducer,
    instanceTemplates: instanceTemplatesSliceReducer,
    mealPrepPlans: mealPrepPlansSliceReducer,
    mealPrepLogs: mealPrepLogsSliceReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
