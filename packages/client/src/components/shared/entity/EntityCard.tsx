// Components
import EntityMacrosPieGraph from "@/components/shared/entity/EntityMacrosPieGraph";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
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
import { useAppSelector } from "@/hooks/redux";
import selectEntityById from "@/helpers/selectEntityById";

const EntityCard: FC<{
  entityType: EntityType;
  entity:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate;
  entityId?: string;
}> = ({ entityType, entity, entityId }) => {
  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";
  let entityCardBackgroundColor = "#FFAE00";
  let entityCardLabelColor = "#120A06";

  const entityFromState = useAppSelector((state) =>
    selectEntityById(state, entityId || "", entityType)
  );
  const entityUsed = entity || entityFromState;

  switch (entityType) {
    case "ingredient":
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityIdentifier = "Ingredient";
      entityCardBackgroundColor = "#FFAE00";
      entityCardLabelColor = "#120A06";
      break;
    case "utensil":
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityIdentifier = "Utensil";
      entityCardBackgroundColor = "#FF6000";
      entityCardLabelColor = "#120A06";
      break;
    case "recipe":
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityIdentifier = "Recipe";
      entityCardBackgroundColor = "#8B0000";
      entityCardLabelColor = "#DDD9D5";
      break;
    case "dayTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityIdentifier = "Day Template";
      entityCardBackgroundColor = "#013310";
      entityCardLabelColor = "#DDD9D5";
      break;
    case "instanceTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Instance Template";
      entityCardBackgroundColor = "#012433";
      entityCardLabelColor = "#DDD9D5";
      break;
    case "mealPrepPlan":
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityIdentifier = "Meal Prep Plan";
      entityCardBackgroundColor = "#42171C";
      entityCardLabelColor = "#DDD9D5";
      break;
    default:
      break;
  }

  return (
    <div
      className={entityInfoStyles.entityInfoDetailsComposedSectionEntityCard}
      style={{ backgroundColor: entityCardBackgroundColor }}
    >
      <Image
        width={120}
        height={160}
        alt={entityUsed.name || `${entityIdentifier} Image`}
        title={entityUsed.name || `${entityIdentifier} Image`}
        aria-label={entityUsed.name || `${entityIdentifier} Image`}
        src={entityUsed.imageUrl || defaultImageUrlShownBasedOnEntityType}
      />
      <div
        className={
          entityInfoStyles.entityInfoDetailsComposedSectionEntityCardContent
        }
      >
        <h4 style={{ color: entityCardLabelColor }}>
          {entityUsed.name || `${entityIdentifier} Name`}
        </h4>
        {entityType !== "utensil" ? (
          <EntityMacrosPieGraph
            macros={(entityUsed as IngredientTemplate)?.macros}
            labelSize={12}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EntityCard;
