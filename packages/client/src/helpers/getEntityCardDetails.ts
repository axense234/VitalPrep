// Types
import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import EntityType from "@/core/types/entity/users/EntityType";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
// Data
import {
  defaultIngredientImageUrl,
  defaultUtensilImageUrl,
  defaultRecipeImageUrl,
  defaultDayTemplateImageUrl,
  defaultInstanceTemplateImageUrl,
  defaultMealPrepPlanImageUrl,
} from "@/data";

const getEntityCardDetails = (
  entityType: EntityType,
  entityUsed: EntityTemplateType,
  translate: any
) => {
  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityDetails = translate("ingredient.calories", {
    numberOfCalories: (entityUsed as IngredientTemplate)?.macros?.calories || 0,
  });
  let entitySubDetails = translate("dayTemplate.calories", {
    numberOfCalories:
      (entityUsed as DayTemplateTemplate)?.macros?.calories || 0,
  });

  switch (entityType) {
    case "ingredient":
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityDetails = translate("ingredient.calories", {
        numberOfCalories:
          (entityUsed as IngredientTemplate)?.macros?.calories || 0,
      });
      break;
    case "utensil":
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityDetails =
        (entityUsed as UtensilTemplate)?.enabled === true
          ? translate("utensil.enabled")
          : translate("utensil.disabled");
      break;
    case "recipe":
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityDetails = translate("recipe.calories", {
        numberOfCalories: (entityUsed as RecipeTemplate)?.macros?.calories || 0,
      });
      break;
    case "dayTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityDetails = translate("dayTemplate.meals", {
        numberOfMeals: (entityUsed as DayTemplateTemplate)?.recipes?.filter(
          (recipe) => recipe !== ""
        )?.length,
      });
      entitySubDetails = translate("dayTemplate.calories", {
        numberOfCalories:
          (entityUsed as DayTemplateTemplate)?.macros?.calories || 0,
      });
      break;
    case "instanceTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityDetails = translate("instanceTemplate.coverage", {
        numberOfDaysCovered:
          (entityUsed as InstanceTemplateTemplate)?.coverage || 0,
      });
      entitySubDetails = translate("instanceTemplate.calories", {
        numberOfCalories:
          (entityUsed as InstanceTemplateTemplate)?.macros?.calories || 0,
      });
      break;
    case "mealPrepPlan":
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityDetails = translate("mealPrepPlan.instances", {
        numberOfInstanceTemplatesUsed:
          (entityUsed as MealPrepPlanTemplate)?.instanceTemplates?.filter(
            (instanceTemplate) => instanceTemplate !== ""
          ).length || 0,
      });
      entitySubDetails = translate("mealPrepPlan.calories", {
        numberOfCalories:
          (entityUsed as MealPrepPlanTemplate)?.macros?.calories || 0,
      });
      break;
    case "mealPrepLog":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityDetails = `${(entityUsed as MealPrepLogTemplate)?.completed ? translate("mealPrepLog.completed") : translate("mealPrepLog.abandoned")}`;
      entitySubDetails = translate("mealPrepLog.cookingDuration", {
        cookingDuration:
          (entityUsed as MealPrepLogTemplate)?.cookingDuration || 0,
      });
      break;
    default:
      break;
  }

  return {
    defaultImageUrlShownBasedOnEntityType,
    entityDetails,
    entitySubDetails,
  };
};

export default getEntityCardDetails;
