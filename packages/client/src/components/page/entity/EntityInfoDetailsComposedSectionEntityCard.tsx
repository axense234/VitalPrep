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

const EntityInfoDetailsComposedSectionEntityCard: FC<{
  entityType: EntityType;
  entity:
    | IngredientTemplate
    | UtensilTemplate
    | RecipeTemplate
    | DayTemplateTemplate
    | InstanceTemplateTemplate
    | MealPrepPlanTemplate;
  backgroundColor?: string;
  labelColor?: string;
}> = ({ entityType, entity, backgroundColor, labelColor }) => {
  let defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
  let entityIdentifier = "Ingredient";

  switch (entityType) {
    case "ingredient":
      defaultImageUrlShownBasedOnEntityType = defaultIngredientImageUrl;
      entityIdentifier = "Ingredient";
      break;
    case "utensil":
      defaultImageUrlShownBasedOnEntityType = defaultUtensilImageUrl;
      entityIdentifier = "Utensil";
      break;
    case "recipe":
      defaultImageUrlShownBasedOnEntityType = defaultRecipeImageUrl;
      entityIdentifier = "Recipe";
      break;
    case "dayTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultDayTemplateImageUrl;
      entityIdentifier = "Day Template";
      break;
    case "instanceTemplate":
      defaultImageUrlShownBasedOnEntityType = defaultInstanceTemplateImageUrl;
      entityIdentifier = "Instance Template";
      break;
    case "mealPrepPlan":
      defaultImageUrlShownBasedOnEntityType = defaultMealPrepPlanImageUrl;
      entityIdentifier = "Meal Prep Plan";
      break;
    default:
      break;
  }

  return (
    <div
      className={entityInfoStyles.entityInfoDetailsComposedSectionEntityCard}
      style={{ backgroundColor: backgroundColor ? backgroundColor : "#432517" }}
    >
      <Image
        width={240}
        height={360}
        alt={entity.name || `${entityIdentifier} Image`}
        title={entity.name || `${entityIdentifier} Image`}
        aria-label={entity.name || `${entityIdentifier} Image`}
        src={entity.imageUrl || defaultImageUrlShownBasedOnEntityType}
      />
      <div
        className={
          entityInfoStyles.entityInfoDetailsComposedSectionEntityCardContent
        }
      >
        <h4 style={{ color: labelColor ? labelColor : "#ddd9d5" }}>
          {entity.name || `${entityIdentifier} Name`}
        </h4>
        {entityType !== "utensil" ? (
          <EntityMacrosPieGraph
            macros={(entity as IngredientTemplate)?.macros}
            labelSize={16}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EntityInfoDetailsComposedSectionEntityCard;
