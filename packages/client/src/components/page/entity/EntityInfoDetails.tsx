// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/users/EntityType";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/utensil/UtensilTemplate";
import EntityPreview from "@/components/shared/entity/EntityPreview";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Components
import EntityStatistics from "./EntityStatistics";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";

const EntityInfoDetails: FC<{ entityId: string; entityType: EntityType }> = ({
  entityId,
  entityType,
}) => {
  let entityInfoDetailsShown = null;
  const entity = useAppSelector((state) =>
    selectEntityById(state, entityId, entityType)
  );

  console.log(entity, entityId);

  switch (entityType) {
    case "ingredient":
      const entityAsIngredient = entity as IngredientTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsIngredient}
            entityId={entityId}
            entityType="ingredient"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsIngredient?.mealPrepPlans?.length || 0,
                entityType: "Meal Prep Plans",
                essence: "usable",
              },
              {
                id: 2,
                count: entityAsIngredient?.instanceTemplates?.length || 0,
                entityType: "Instance Templates",
                essence: "usable",
              },
              {
                id: 3,
                count: entityAsIngredient?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "usable",
              },
              {
                id: 4,
                count: entityAsIngredient?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "usable",
              },
            ]}
          />
        </div>
      );
      break;
    case "utensil":
      const entityAsUtensil = entity as UtensilTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsUtensil}
            entityId={entityId}
            entityType="utensil"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsUtensil?.mealPrepPlans?.length || 0,
                entityType: "Meal Prep Plans",
                essence: "usable",
              },
              {
                id: 2,
                count: entityAsUtensil?.instanceTemplates?.length || 0,
                entityType: "Instance Templates",
                essence: "usable",
              },
              {
                id: 3,
                count: entityAsUtensil?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "usable",
              },
              {
                id: 4,
                count: entityAsUtensil?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "usable",
              },
            ]}
          />
        </div>
      );
      break;
    case "recipe":
      const entityAsRecipe = entity as RecipeTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsRecipe}
            entityId={entityId}
            entityType="recipe"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsRecipe?.mealPrepPlans?.length || 0,
                entityType: "Meal Prep Plans",
                essence: "usable",
              },
              {
                id: 2,
                count: entityAsRecipe?.instanceTemplates?.length || 0,
                entityType: "Instance Templates",
                essence: "usable",
              },
              {
                id: 3,
                count: entityAsRecipe?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "usable",
              },
              {
                id: 4,
                count: entityAsRecipe?.ingredients?.length || 0,
                entityType: "Ingredients",
                essence: "component",
              },
              {
                id: 5,
                count: entityAsRecipe?.utensils?.length || 0,
                entityType: "Utensils",
                essence: "component",
              },
            ]}
          />
        </div>
      );
      break;
    case "dayTemplate":
      const entityAsDayTemplate = entity as DayTemplateTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsDayTemplate}
            entityId={entityId}
            entityType="dayTemplate"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsDayTemplate?.mealPrepPlans?.length || 0,
                entityType: "Meal Prep Plans",
                essence: "usable",
              },
              {
                id: 2,
                count: entityAsDayTemplate?.instanceTemplates?.length || 0,
                entityType: "Instance Templates",
                essence: "usable",
              },
              {
                id: 3,
                count: entityAsDayTemplate?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "component",
              },
              {
                id: 4,
                count: entityAsDayTemplate?.ingredients?.length || 0,
                entityType: "Ingredients",
                essence: "component",
              },
              {
                id: 5,
                count: entityAsDayTemplate?.utensils?.length || 0,
                entityType: "Utensils",
                essence: "component",
              },
            ]}
          />
        </div>
      );
      break;
    case "instanceTemplate":
      const entityAsInstanceTemplate = entity as InstanceTemplateTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsInstanceTemplate}
            entityId={entityId}
            entityType="instanceTemplate"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsInstanceTemplate?.mealPrepPlans?.length || 0,
                entityType: "Meal Prep Plans",
                essence: "usable",
              },
              {
                id: 2,
                count: entityAsInstanceTemplate?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "component",
              },
              {
                id: 3,
                count: entityAsInstanceTemplate?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "component",
              },
              {
                id: 4,
                count: entityAsInstanceTemplate?.ingredients?.length || 0,
                entityType: "Ingredients",
                essence: "component",
              },
              {
                id: 5,
                count: entityAsInstanceTemplate?.utensils?.length || 0,
                entityType: "Utensils",
                essence: "component",
              },
            ]}
          />
        </div>
      );
      break;
    case "mealPrepPlan":
      const entityAsMealPrepPlan = entity as MealPrepPlanTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsMealPrepPlan}
            entityId={entityId}
            entityType="mealPrepPlan"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsMealPrepPlan?.instanceTemplates?.length || 0,
                entityType: "Instance Templates",
                essence: "component",
              },
              {
                id: 2,
                count: entityAsMealPrepPlan?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "component",
              },
              {
                id: 3,
                count: entityAsMealPrepPlan?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "component",
              },
              {
                id: 4,
                count: entityAsMealPrepPlan?.ingredients?.length || 0,
                entityType: "Ingredients",
                essence: "component",
              },
              {
                id: 5,
                count: entityAsMealPrepPlan?.utensils?.length || 0,
                entityType: "Utensils",
                essence: "component",
              },
            ]}
          />
        </div>
      );
      break;
    case "mealPrepLog":
      const entityAsMealPrepLog = entity as MealPrepLogTemplate;
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <EntityPreview
            entity={entityAsMealPrepLog}
            entityId={entityId}
            entityType="mealPrepLog"
            type="view"
          />
          <EntityStatistics
            statistics={[
              {
                id: 1,
                count: entityAsMealPrepLog?.dayTemplates?.length || 0,
                entityType: "Day Templates",
                essence: "component",
              },
              {
                id: 2,
                count: entityAsMealPrepLog?.recipes?.length || 0,
                entityType: "Recipes",
                essence: "component",
              },
              {
                id: 3,
                count: entityAsMealPrepLog?.ingredients?.length || 0,
                entityType: "Ingredients",
                essence: "component",
              },
              {
                id: 4,
                count: entityAsMealPrepLog?.utensils?.length || 0,
                entityType: "Utensils",
                essence: "component",
              },
            ]}
          />
        </div>
      );
      break;
    default:
      break;
  }

  return entityInfoDetailsShown;
};

export default EntityInfoDetails;
