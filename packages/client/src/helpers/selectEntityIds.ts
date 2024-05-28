// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectAllDayTemplatesIds } from "@/redux/slices/dayTemplates/selectors";
import { selectAllIngredientsIds } from "@/redux/slices/ingredients/selectors";
import { selectAllInstanceTemplatesIds } from "@/redux/slices/instanceTemplates/selectors";
import { selectAllMealPrepPlansIds } from "@/redux/slices/mealPrepPlans/selectors";
import { selectAllRecipesIds } from "@/redux/slices/recipes/selectors";
import { selectAllUtensilsIds } from "@/redux/slices/utensils/selectors";

const selectEntityIds = (entityType: string) => {
  switch (entityType) {
    case "ingredient":
      return useAppSelector(selectAllIngredientsIds);
    case "utensil":
      return useAppSelector(selectAllUtensilsIds);
    case "recipe":
      return useAppSelector(selectAllRecipesIds);
    case "dayTemplate":
      return useAppSelector(selectAllDayTemplatesIds);
    case "instanceTemplate":
      return useAppSelector(selectAllInstanceTemplatesIds);
    case "mealPrepPlan":
      return useAppSelector(selectAllMealPrepPlansIds);
    default:
      break;
  }
};

export default selectEntityIds;
