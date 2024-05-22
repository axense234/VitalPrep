import EntityType from "@/core/types/entity/users/EntityType";
// Redux
import { State } from "@/redux/api/store";
import { deleteDayTemplate } from "@/redux/slices/dayTemplatesSlice";
import { deleteIngredient } from "@/redux/slices/ingredientsSlice";
import { deleteInstanceTemplate } from "@/redux/slices/instanceTemplatesSlice";
import { deleteMealPrepLog } from "@/redux/slices/mealPrepLogsSlice";
import { deleteMealPrepPlan } from "@/redux/slices/mealPrepPlansSlice";
import { deleteRecipe } from "@/redux/slices/recipesSlice";
import { deleteUtensil } from "@/redux/slices/utensilsSlice";
import { ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const getDeleteEntityFunction = (
  entityType: EntityType,
  dispatch: ThunkDispatch<State, {}, UnknownAction>,
  entityId: string,
  userId: string
) => {
  switch (entityType) {
    case "ingredient":
      return () =>
        dispatch(
          deleteIngredient({
            ingredientId: entityId,
            userId,
          })
        );
    case "utensil":
      return () =>
        dispatch(
          deleteUtensil({
            utensilId: entityId,
            userId,
          })
        );
    case "recipe":
      return () =>
        dispatch(
          deleteRecipe({
            recipeId: entityId,
            userId,
          })
        );
    case "dayTemplate":
      return () =>
        dispatch(
          deleteDayTemplate({
            dayTemplateId: entityId,
            userId,
          })
        );
    case "instanceTemplate":
      return () =>
        dispatch(
          deleteInstanceTemplate({
            instanceTemplateId: entityId,
            userId,
          })
        );
    case "mealPrepPlan":
      return () =>
        dispatch(
          deleteMealPrepPlan({
            mealPrepPlanId: entityId,
            userId,
          })
        );
    case "mealPrepLog":
      return () =>
        dispatch(
          deleteMealPrepLog({
            mealPrepLogId: entityId,
            userId,
          })
        );
    default:
      return null;
  }
};
export default getDeleteEntityFunction;
