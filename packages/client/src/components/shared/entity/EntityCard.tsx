// SCSS
import entityCardStyles from "../../../scss/components/shared/EntityCard.module.scss";
// Types
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
import EntityCardProps from "@/core/interfaces/entity/EntityCardProps";
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
import { FC, useRef } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Translations
import { Link } from "@/navigation";
import EntityMutationMenu from "./EntityMutationMenu";

const EntityCard: FC<EntityCardProps> = ({
  entityType,
  entity,
  entityId,
  size = "large",
  isALink = false,
}) => {
  const entityFromState = useAppSelector((state) =>
    selectEntityById(state, entityId || "", entityType)
  );
  const entityCardRef = useRef<HTMLDivElement | null>(null);
  const entityUsed = entity || entityFromState;

  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";
  let entityDetails = `${(entityUsed as IngredientTemplate)?.macros?.calories || 0} calories / 100g`;
  let entitySubDetails = `${(entityUsed as DayTemplateTemplate)?.macros?.calories || 0} calories`;

  let windowWidth = useGetWindowWidth();
  let tabletAndPhoneRedesign = windowWidth && windowWidth <= 600;

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

  if (isALink) {
    return (
      <Link
        href={{
          pathname: `/${entityType}/[id]` as any,
          params: { id: entityId || entity?.id },
        }}
        className={entityCardStyles.entityCardLinkWrapper}
      >
        <div
          className={entityCardStyles.entityCardContainer}
          style={{
            maxWidth:
              size === "large" && !tabletAndPhoneRedesign ? "24rem" : "16rem",
          }}
          ref={entityCardRef}
        >
          <EntityMutationMenu type="entityCard" parentRef={entityCardRef} />
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
            <h6
              style={{
                fontSize:
                  size === "large" && !tabletAndPhoneRedesign
                    ? "1.5rem"
                    : "1rem",
              }}
            >
              {entityDetails}
            </h6>
            {(entityType === "dayTemplate" ||
              entityType === "instanceTemplate" ||
              entityType === "mealPrepPlan") && (
              <h6
                style={{
                  fontSize:
                    size === "large" && !tabletAndPhoneRedesign
                      ? "1.5rem"
                      : "1rem",
                }}
              >
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
        maxWidth:
          size === "large" && !tabletAndPhoneRedesign ? "24rem" : "16rem",
      }}
      ref={entityCardRef}
    >
      <EntityMutationMenu type="entityCard" parentRef={entityCardRef} />
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
        <h6
          style={{
            fontSize:
              size === "large" && !tabletAndPhoneRedesign ? "1.5rem" : "1rem",
          }}
        >
          {entityDetails}
        </h6>
        {(entityType === "dayTemplate" ||
          entityType === "instanceTemplate" ||
          entityType === "mealPrepPlan" ||
          entityType === "mealPrepLog") && (
          <h6
            style={{
              fontSize:
                size === "large" && !tabletAndPhoneRedesign ? "1.5rem" : "1rem",
            }}
          >
            {entitySubDetails}
          </h6>
        )}
      </div>
    </div>
  );
};

export default EntityCard;
