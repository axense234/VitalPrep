// Redux
import { State } from "@/redux/api/store";
import { selectDayTemplateById } from "@/redux/slices/dayTemplatesSlice";
import { selectIngredientById } from "@/redux/slices/ingredientsSlice";
import { selectInstanceTemplateById } from "@/redux/slices/instanceTemplatesSlice";
import { selectMealPrepPlanById } from "@/redux/slices/mealPrepPlansSlice";
import { selectRecipeById } from "@/redux/slices/recipesSlice";
import { selectUtensilById } from "@/redux/slices/utensilsSlice";

const selectEntityById = (
  state: State,
  entityId: string,
  selectedEntityOption:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan"
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
    default:
      return null;
  }
};

export default selectEntityById;
