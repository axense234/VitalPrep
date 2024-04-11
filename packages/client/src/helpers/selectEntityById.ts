import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
import { selectDayTemplateById } from "@/redux/slices/dayTemplatesSlice";
import { selectIngredientById } from "@/redux/slices/ingredientsSlice";
import { selectInstanceTemplateById } from "@/redux/slices/instanceTemplatesSlice";
import { selectRecipeById } from "@/redux/slices/recipesSlice";
import { selectUtensilById } from "@/redux/slices/utensilsSlice";

const selectEntityById = (
  id: string,
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
      return useAppSelector((state: State) => selectIngredientById(state, id));
    case "utensil":
      return useAppSelector((state: State) => selectUtensilById(state, id));
    case "recipe":
      return useAppSelector((state: State) => selectRecipeById(state, id));
    case "dayTemplate":
      return useAppSelector((state: State) => selectDayTemplateById(state, id));
    case "instanceTemplate":
      return useAppSelector((state: State) =>
        selectInstanceTemplateById(state, id)
      );
    default:
      break;
  }
};

export default selectEntityById;
