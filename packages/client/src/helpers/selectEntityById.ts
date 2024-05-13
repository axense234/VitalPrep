// Types
import EntityType from "@/core/types/entity/users/EntityType";
// Redux
import { State } from "@/redux/api/store";
import { selectDayTemplateById } from "@/redux/slices/dayTemplatesSlice";
import { selectIngredientById } from "@/redux/slices/ingredientsSlice";
import { selectInstanceTemplateById } from "@/redux/slices/instanceTemplatesSlice";
import { selectMealPrepLogById } from "@/redux/slices/mealPrepLogsSlice";
import { selectMealPrepPlanById } from "@/redux/slices/mealPrepPlansSlice";
import { selectRecipeById } from "@/redux/slices/recipesSlice";
import { selectUtensilById } from "@/redux/slices/utensilsSlice";

const selectEntityById = (
  state: State,
  entityId: string,
  selectedEntityOption: EntityType
) => {
  switch (selectedEntityOption) {
    case "ingredient":
      return selectIngredientById(state, entityId);
    case "utensil":
      return selectUtensilById(state, entityId);
    case "recipe":
      return selectRecipeById(state, entityId);
    case "dayTemplate":
      return selectDayTemplateById(state, entityId);
    case "instanceTemplate":
      return selectInstanceTemplateById(state, entityId);
    case "mealPrepPlan":
      return selectMealPrepPlanById(state, entityId);
    case "mealPrepLog":
      return selectMealPrepLogById(state, entityId);
    default:
      return null;
  }
};

export default selectEntityById;
