// SCSS
import entityCardStyles from "../../../scss/components/shared/EntityCard.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
// Next
import Image from "next/image";
// Data
import {
  defaultIngredientImageUrl,
  defaultUtensilImageUrl,
  defaultRecipeImageUrl,
  defaultDayTemplateImageUrl,
  defaultInstanceTemplateImageUrl,
  defaultMealPrepPlanImageUrl,
} from "@/data";
// React
import { FC } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";

const EntityCard: FC<{
  entityType: EntityType;
  entity:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate
    | MealPrepLogTemplate;
  entityId?: string;
}> = ({ entityType, entity, entityId }) => {
  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";
  let entityDetails = `${(entity as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
  let entitySubDetails = `${(entity as DayTemplateTemplate)?.macros?.calories || 0} calories`;

  const entityFromState = useAppSelector((state) =>
    selectEntityById(state, entityId || "", entityType)
  );
  const entityUsed = entity || entityFromState;

  switch (entityType) {
    case "ingredient":
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityIdentifier = "Ingredient";
      entityDetails = `${(entity as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
      break;
    case "utensil":
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityIdentifier = "Utensil";
      entityDetails =
        (entity as UtensilTemplate)?.enabled === true
          ? `ENABLED ✔️`
          : "DISABLED ❌";
      break;
    case "recipe":
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityIdentifier = "Recipe";
      entityDetails = `${(entity as RecipeTemplate)?.macros?.calories || 0} calories`;
      break;
    case "dayTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityIdentifier = "Day Template";
      entityDetails = `${(entity as DayTemplateTemplate)?.recipes?.filter((recipe) => recipe !== "")?.length} meals`;
      entitySubDetails = `${(entity as DayTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "instanceTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Instance Template";
      entityDetails = `${(entity as InstanceTemplateTemplate)?.coverage || 0} days covered`;
      entitySubDetails = `${(entity as InstanceTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepPlan":
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityIdentifier = "Meal Prep Plan";
      entityDetails = `${(entity as MealPrepPlanTemplate)?.instanceTemplates?.filter((instanceTemplate) => instanceTemplate !== "").length || 0} instances used`;
      entitySubDetails = `${(entity as MealPrepPlanTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepLog":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Meal Prep Log";
      break;
    default:
      break;
  }

  return (
    <div className={entityCardStyles.entityCardContainer}>
      <Image
        width={384}
        height={384}
        alt={entityUsed.name || `${entityIdentifier} Image`}
        title={entityUsed.name || `${entityIdentifier} Image`}
        aria-label={entityUsed.name || `${entityIdentifier} Image`}
        src={entityUsed.imageUrl || defaultImageUrlShownBasedOnEntityType}
      />
      <div className={entityCardStyles.entityCardContentDetails}>
        <h5>{entityUsed.name || `${entityIdentifier} Name`}</h5>
        <h6>{entityDetails}</h6>
        {(entityType === "dayTemplate" ||
          entityType === "instanceTemplate" ||
          entityType === "mealPrepPlan") && <h6>{entitySubDetails}</h6>}
      </div>
    </div>
  );
};

export default EntityCard;
