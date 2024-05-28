// Types
import MealPrepLogType from "@/core/types/entity/mealPrepLog/MealPrepLogType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit/react";

const mealPrepLogsAdapter = createEntityAdapter<MealPrepLogType>();
export default mealPrepLogsAdapter;
