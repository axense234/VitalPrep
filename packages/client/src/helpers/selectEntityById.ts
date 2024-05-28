// Types
import EntityType from "@/core/types/entity/users/EntityType";
// Redux
import { State } from "@/redux/api/store";
import { selectDayTemplateById } from "@/redux/slices/dayTemplates/selectors";
import { selectIngredientById } from "@/redux/slices/ingredients/selectors";
import { selectInstanceTemplateById } from "@/redux/slices/instanceTemplates/selectors";
import { selectMealPrepLogById } from "@/redux/slices/mealPrepLogs/selectors";
import { selectMealPrepPlanById } from "@/redux/slices/mealPrepPlans/selectors";
import { selectRecipeById } from "@/redux/slices/recipes/selectors";
import { selectUtensilById } from "@/redux/slices/utensils/selectors";

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
