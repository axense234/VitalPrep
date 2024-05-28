// Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Slices
import generalSliceReducer from "../slices/general/slice";
import ingredientsSliceReducer from "../slices/ingredients/slice";
import utensilsSliceReducer from "../slices/utensils/slice";
import recipesSliceReducer from "../slices/recipes/slice";
import dayTemplatesSliceReducer from "../slices/dayTemplates/slice";
import instanceTemplatesSliceReducer from "../slices/instanceTemplates/slice";
import mealPrepPlansSliceReducer from "../slices/mealPrepPlans/slice";
import mealPrepLogsSliceReducer from "../slices/mealPrepLogs/slice";

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
