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
import Link from "next/link";

const EntityCard: FC<{
  isALink: boolean;
  size: "large" | "medium";
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
}> = ({ entityType, entity, entityId, size = "large", isALink = false }) => {
  const entityFromState = useAppSelector((state) =>
    selectEntityById(state, entityId || "", entityType)
  );
  const entityUsed = entity || entityFromState;
  let entityComponentDestination = "";

  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";
  let entityDetails = `${(entityUsed as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
  let entitySubDetails = `${(entityUsed as DayTemplateTemplate)?.macros?.calories || 0} calories`;

  switch (entityType) {
    case "ingredient":
      entityComponentDestination = `/ingredient/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityIdentifier = "Ingredient";
      entityDetails = `${(entityUsed as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
      break;
    case "utensil":
      entityComponentDestination = `/utensil/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityIdentifier = "Utensil";
      entityDetails =
        (entityUsed as UtensilTemplate)?.enabled === true
          ? `ENABLED ✔️`
          : "DISABLED ❌";
      break;
    case "recipe":
      entityComponentDestination = `/recipe/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityIdentifier = "Recipe";
      entityDetails = `${(entityUsed as RecipeTemplate)?.macros?.calories || 0} calories`;
      break;
    case "dayTemplate":
      entityComponentDestination = `/dayTemplate/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityIdentifier = "Day Template";
      entityDetails = `${(entityUsed as DayTemplateTemplate)?.recipes?.filter((recipe) => recipe !== "")?.length} meals`;
      entitySubDetails = `${(entityUsed as DayTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "instanceTemplate":
      entityComponentDestination = `/instanceTemplate/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Instance Template";
      entityDetails = `${(entityUsed as InstanceTemplateTemplate)?.coverage || 0} days covered`;
      entitySubDetails = `${(entityUsed as InstanceTemplateTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepPlan":
      entityComponentDestination = `/mealPrepPlan/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityIdentifier = "Meal Prep Plan";
      entityDetails = `${(entityUsed as MealPrepPlanTemplate)?.instanceTemplates?.filter((instanceTemplate) => instanceTemplate !== "").length || 0} instances used`;
      entitySubDetails = `${(entityUsed as MealPrepPlanTemplate)?.macros?.calories || 0} calories`;
      break;
    case "mealPrepLog":
      entityComponentDestination = `/mealPrepLog/${entityId || entity?.id}`;
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Meal Prep Log";
      entityDetails = `${(entityUsed as MealPrepLogTemplate)?.completed ? `COMPLETED ✔️` : "ABANDONED ❌"}`;
      entitySubDetails = `${(entityUsed as MealPrepLogTemplate)?.cookingDuration || 0} hours`;
      break;
    default:
      break;
  }

  if (isALink) {
    return (
      <Link
        href={entityComponentDestination}
        className={entityCardStyles.entityCardLinkWrapper}
      >
        <div
          className={entityCardStyles.entityCardContainer}
          style={{
            maxWidth: size === "large" ? "24rem" : "16rem",
          }}
        >
          <Image
            width={384}
            height={384}
            alt={entityUsed?.name || `${entityIdentifier} Image`}
            title={entityUsed?.name || `${entityIdentifier} Image`}
            aria-label={entityUsed?.name || `${entityIdentifier} Image`}
            src={entityUsed?.imageUrl || defaultImageUrlShownBasedOnEntityType}
          />
          <div className={entityCardStyles.entityCardContentDetails}>
            <h5>{entityUsed?.name || `${entityIdentifier} Name`}</h5>
            <h6 style={{ fontSize: "large" ? "1.5rem" : "1rem" }}>
              {entityDetails}
            </h6>
            {(entityType === "dayTemplate" ||
              entityType === "instanceTemplate" ||
              entityType === "mealPrepPlan") && (
              <h6 style={{ fontSize: "large" ? "1.5rem" : "1rem" }}>
                {entitySubDetails}
              </h6>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className={entityCardStyles.entityCardContainer}
      style={{
        maxWidth: size === "large" ? "24rem" : "16rem",
      }}
    >
      <Image
        width={384}
        height={384}
        alt={entityUsed?.name || `${entityIdentifier} Image`}
        title={entityUsed?.name || `${entityIdentifier} Image`}
        aria-label={entityUsed?.name || `${entityIdentifier} Image`}
        src={entityUsed?.imageUrl || defaultImageUrlShownBasedOnEntityType}
      />
      <div className={entityCardStyles.entityCardContentDetails}>
        <h5>{entityUsed?.name || `${entityIdentifier} Name`}</h5>
        <h6 style={{ fontSize: "large" ? "1.5rem" : "1rem" }}>
          {entityDetails}
        </h6>
        {(entityType === "dayTemplate" ||
          entityType === "instanceTemplate" ||
          entityType === "mealPrepPlan" ||
          entityType === "mealPrepLog") && (
          <h6 style={{ fontSize: "large" ? "1.5rem" : "1rem" }}>
            {entitySubDetails}
          </h6>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
