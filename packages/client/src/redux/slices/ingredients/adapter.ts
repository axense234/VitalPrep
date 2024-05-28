// Types
import IngredientType from "@/core/types/entity/ingredient/IngredientType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const ingredientsAdapter = createEntityAdapter<IngredientType>();
export default ingredientsAdapter;
