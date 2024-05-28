// Types
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const mealPrepPlansAdapter = createEntityAdapter<MealPrepPlanType>();
export default mealPrepPlansAdapter;
