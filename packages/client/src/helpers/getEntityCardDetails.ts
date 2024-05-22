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
  entityUsed: EntityTemplateType
) => {
  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";
  let entityDetails = `${(entityUsed as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
  let entitySubDetails = `${(entityUsed as DayTemplateTemplate)?.macros?.calories || 0} calories`;

  switch (entityType) {
    case "ingredient":
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityIdentifier = "Ingredient";
      entityDetails = `${(entityUsed as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
      break;
    case "utensil":
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityIdentifier = "Utensil";
      entityDetails =
        (entityUsed as UtensilTemplate)?.enabled === true
          ? `ENABLED ✔️`
          : "DISABLED ❌";
      break;
    case "recipe":
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityIdentifier = "Recipe";
      entityDetails = `${(entityUsed as RecipeTemplate)?.macros?.calories || 0} calories`;
      break;
    case "dayTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityIdentifier = "Day Template";
      entityDetails = `${(entityUsed as DayTemplateTemplate)?.recipes?.filter((recipe) => recipe !== "")?.length} meals`;
      entitySubDetails = `${(entityUsed as DayTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "instanceTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Instance Template";
      entityDetails = `${(entityUsed as InstanceTemplateTemplate)?.coverage || 0} days covered`;
      entitySubDetails = `${(entityUsed as InstanceTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepPlan":
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityIdentifier = "Meal Prep Plan";
      entityDetails = `${(entityUsed as MealPrepPlanTemplate)?.instanceTemplates?.filter((instanceTemplate) => instanceTemplate !== "").length || 0} instances used`;
      entitySubDetails = `${(entityUsed as MealPrepPlanTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepLog":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Meal Prep Log";
      entityDetails = `${(entityUsed as MealPrepLogTemplate)?.completed ? `COMPLETED ✔️` : "ABANDONED ❌"}`;
      entitySubDetails = `${(entityUsed as MealPrepLogTemplate)?.cookingDuration || 0} hours`;
      break;
    default:
      break;
  }

  return {
    defaultImageUrlShownBasedOnEntityType,
    entityIdentifier,
    entityDetails,
    entitySubDetails,
  };
};

export default getEntityCardDetails;
