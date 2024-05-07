// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
import EntityPreview from "@/components/shared/entity/EntityPreview";
import EntityStatistics from "./EntityStatistics";
// Next
import Image from "next/image";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Data
import {
  defaultDayTemplateImageUrl,
  defaultInstanceTemplateImageUrl,
  defaultRecipeImageUrl,
} from "@/data";
// Line Chart
import EntityMacros from "@/components/shared/entity/EntityMacros";
// Components
import EntityInfoDetailsComposedSection from "./EntityInfoDetailsComposedSection";
// Types
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import { Macros } from "@prisma/client";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";

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
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultInstanceTemplateImageUrl}
              alt={entity?.name || "Meal Prep Log Image"}
              aria-label={entity?.name || "Meal Prep Log Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Meal Prep Log Name"}</h2>
              <h3>
                {(entity as MealPrepLogTemplate)?.completed
                  ? `COMPLETED ✔️`
                  : "NOT COMPLETED ❌"}
              </h3>
              <h3>
                {new Date((entity as MealPrepLogTemplate)?.date as Date)
                  ? new Date(
                      (entity as MealPrepLogTemplate)?.date as Date
                    ).toLocaleDateString()
                  : "unknown date"}
              </h3>
              <h3>
                {(entity as MealPrepLogTemplate)?.cookingDuration
                  ? `${(entity as MealPrepLogTemplate)?.cookingDuration} hours`
                  : "??? hours"}
              </h3>
            </header>
            <EntityMacros
              macros={
                (entity as MealPrepLogTemplate)?.instanceTemplate
                  ?.macros as Macros
              }
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepLogTemplate)
                  ?.dayTemplates as DayTemplateTemplate[]
              }
              entityType={"dayTemplate"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepLogTemplate)?.recipes as RecipeTemplate[]
              }
              entityType={"recipe"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepLogTemplate)
                  ?.ingredients as IngredientTemplate[]
              }
              entityType={"ingredient"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepLogTemplate)?.utensils as UtensilTemplate[]
              }
              entityType={"utensil"}
            />
          </div>
        </div>
      );
      break;
    default:
      break;
  }

  return entityInfoDetailsShown;
};

export default EntityInfoDetails;
