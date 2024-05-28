// Types
import RecipeType from "@/core/types/entity/recipe/RecipeType";
// Redux
import { createEntityAdapter } from "@reduxjs/toolkit";

const recipesAdapter = createEntityAdapter<RecipeType>();
export default recipesAdapter;
