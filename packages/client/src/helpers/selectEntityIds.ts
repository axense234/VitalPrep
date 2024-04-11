import { useAppSelector } from "@/hooks/redux";
import { selectAllDayTemplatesIds } from "@/redux/slices/dayTemplatesSlice";
import { selectAllIngredientsIds } from "@/redux/slices/ingredientsSlice";
import { selectAllInstanceTemplatesIds } from "@/redux/slices/instanceTemplatesSlice";
import { selectAllMealPrepPlansIds } from "@/redux/slices/mealPrepPlansSlice";
import { selectAllRecipesIds } from "@/redux/slices/recipesSlice";
import { selectAllUtensilsIds } from "@/redux/slices/utensilsSlice";

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
