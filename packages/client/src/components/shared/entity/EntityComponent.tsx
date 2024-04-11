// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Next
import Image from "next/image";
// Data
import { defaultIngredientImageUrl } from "@/data";
// Types
import {
  DayTemplate,
  Ingredient,
  InstanceTemplate,
  MealPrepPlan,
  Recipe,
  Utensil,
} from "@prisma/client";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";

export type EntityType =
  | IngredientTemplate
  | Utensil
  | Recipe
  | DayTemplate
  | InstanceTemplate
  | MealPrepPlan;

export interface EntityComponentProps {
  id: string;
  clicked: boolean;
  entity: EntityType;
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
}

const EntityComponent: FC<EntityComponentProps> = ({
  clicked,
  entity,
  entityType,
}) => {
  const { name, imageUrl } = entity;
  const { macros } = entity as IngredientTemplate;

  let entityDisplayedInformation = (
    <div className={entityComponentStyles.ingredientComponentDetails}>
      <p>{macros?.calories} calories</p>
      <p>{macros?.proteinAmount}g protein </p>
      <p>{macros?.carbsAmount}g carbs</p>
      <p>{macros?.fatsAmount}g fats</p>
      <p>
        {(entity as IngredientTemplate).enabled ? `ENABLED ✔️` : `DISABLED ❌`}
      </p>
    </div>
  );

  switch (entityType) {
    case "ingredient":
      entityDisplayedInformation = (
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{macros?.calories} calories</p>
          <p>{macros?.proteinAmount}g protein </p>
          <p>{macros?.carbsAmount}g carbs</p>
          <p>{macros?.fatsAmount}g fats</p>
          <p>
            {(entity as IngredientTemplate).enabled
              ? `ENABLED ✔️`
              : `DISABLED ❌`}
          </p>
        </div>
      );
      break;
    case "utensil":
      entityDisplayedInformation = (
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{(entity as Utensil).enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>
        </div>
      );
      break;
    case "recipe":
      entityDisplayedInformation = (
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{macros?.calories} calories</p>
          <p>{macros?.proteinAmount}g protein </p>
          <p>{macros?.carbsAmount}g carbs</p>
          <p>{macros?.fatsAmount}g fats</p>
        </div>
      );
      break;
    case "dayTemplate":
      const dayTemplate = entity as DayTemplateTemplate;
      entityDisplayedInformation = (
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{dayTemplate.recipes.length || "0"} meals</p>
          <p>{macros?.calories} calories</p>
        </div>
      );
      break;
    case "instanceTemplate":
      const instanceTemplate = entity as InstanceTemplateTemplate;
      entityDisplayedInformation = (
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{instanceTemplate.coverage || "0"} days covered</p>
          <p>
            {instanceTemplate.dayTemplates.length || "0"} day templates used
          </p>
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <div
      className={entityComponentStyles.ingredientComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.ingredientComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultIngredientImageUrl}
          title={name}
          aria-label={name}
          width={80}
          height={80}
        />
        <h4>{name}</h4>
      </header>
      {entityDisplayedInformation}
    </div>
  );
};

export default EntityComponent;
