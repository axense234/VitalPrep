// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
import UtensilTemplate from "@/core/types/entity/mutation/UtensilTemplate";
// Next
import Image from "next/image";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Data
import {
  defaultDayTemplateImageUrl,
  defaultIngredientImageUrl,
  defaultInstanceTemplateImageUrl,
  defaultRecipeImageUrl,
  defaultUtensilImageUrl,
} from "@/data";
// Pie Chart
import EntityMacrosPieGraph from "@/components/shared/entity/EntityMacrosPieGraph";
// Components
import EntityInfoDetailsComposedSection from "./EntityInfoDetailsComposedSection";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
import { DayTemplate, Macros } from "@prisma/client";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";

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
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultIngredientImageUrl}
              alt={entity?.name || "Ingredient Image"}
              aria-label={entity?.name || "Ingredient Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Ingredient Name"}</h2>
              <h3>
                {(entity as IngredientTemplate)?.macros?.calories
                  ? `${(entity as IngredientTemplate)?.macros?.calories} calories`
                  : "??? calories"}
              </h3>
              <h3>
                {(entity as IngredientTemplate)?.enabled
                  ? "ENABLED"
                  : "DISABLED"}
              </h3>
            </header>
          </div>
          <EntityMacrosPieGraph
            macros={(entity as IngredientTemplate)?.macros}
            labelSize={28}
          />
        </div>
      );
      break;
    case "utensil":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultUtensilImageUrl}
              alt={entity?.name || "Utensil Image"}
              aria-label={entity?.name || "Utensil Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Utensil Name"}</h2>
              <h3>
                {(entity as UtensilTemplate)?.enabled ? "ENABLED" : "DISABLED"}
              </h3>
            </header>
          </div>
        </div>
      );
      break;
    case "recipe":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultRecipeImageUrl}
              alt={entity?.name || "Recipe Image"}
              aria-label={entity?.name || "Recipe Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Recipe Name"}</h2>
              <h3>
                {(entity as RecipeTemplate)?.macros?.calories
                  ? `${(entity as RecipeTemplate)?.macros?.calories} calories`
                  : "??? calories"}
              </h3>
            </header>
            <EntityMacrosPieGraph
              macros={(entity as RecipeTemplate)?.macros}
              labelSize={28}
            />
          </div>
          <div className={entityInfoStyles.entityInfoRecipeTutorialContainer}>
            <h3>Tutorial</h3>
            <div className={entityInfoStyles.entityInfoRecipeTutorialSection}>
              <h4>Video Tutorial</h4>
              <iframe
                src={(entity as RecipeTemplate)?.recipeTutorial?.videoTutorial}
                title={entity?.name}
                aria-label={entity?.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className={entityInfoStyles.entityInfoRecipeTutorialSection}>
              <h4>Written Tutorial</h4>
              <p>
                {(entity as RecipeTemplate)?.recipeTutorial?.writtenTutorial}
              </p>
            </div>
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as RecipeTemplate)?.ingredients as IngredientTemplate[]
              }
              entityType={"ingredient"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as RecipeTemplate)?.utensils as UtensilTemplate[]
              }
              entityType={"utensil"}
            />
          </div>
        </div>
      );
      break;
    case "dayTemplate":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultDayTemplateImageUrl}
              alt={entity?.name || "Day Template Image"}
              aria-label={entity?.name || "Day Template Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Day Template Name"}</h2>
              <h3>
                {(entity as DayTemplateTemplate)?.macros?.calories
                  ? `${(entity as DayTemplateTemplate)?.macros?.calories} total calories`
                  : "??? total calories"}
              </h3>
            </header>
            <EntityMacrosPieGraph
              macros={(entity as DayTemplateTemplate)?.macros}
              labelSize={28}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as DayTemplateTemplate)?.recipes as RecipeTemplate[]
              }
              entityType={"recipe"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as DayTemplateTemplate)
                  ?.ingredients as IngredientTemplate[]
              }
              entityType={"ingredient"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as DayTemplateTemplate)?.utensils as UtensilTemplate[]
              }
              entityType={"utensil"}
            />
          </div>
        </div>
      );
      break;
    case "instanceTemplate":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultInstanceTemplateImageUrl}
              alt={entity?.name || "Instance Template Image"}
              aria-label={entity?.name || "Instance Template Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Day Template Name"}</h2>
              <h3>
                {(entity as InstanceTemplateTemplate)?.dayTemplates?.length > 0
                  ? `${(entity as InstanceTemplateTemplate)?.dayTemplates?.length} day templates used`
                  : "??? day templates used"}
              </h3>
              <h3>
                {(entity as InstanceTemplateTemplate)?.coverage
                  ? `${(entity as InstanceTemplateTemplate).coverage} days covered`
                  : `??? days covered`}
              </h3>
            </header>
            <EntityMacrosPieGraph
              macros={(entity as InstanceTemplateTemplate)?.macros as Macros}
              labelSize={28}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as InstanceTemplateTemplate)
                  ?.dayTemplates as DayTemplateTemplate[]
              }
              entityType={"dayTemplate"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as InstanceTemplateTemplate)
                  ?.recipes as RecipeTemplate[]
              }
              entityType={"recipe"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as InstanceTemplateTemplate)
                  ?.ingredients as IngredientTemplate[]
              }
              entityType={"ingredient"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as InstanceTemplateTemplate)
                  ?.utensils as UtensilTemplate[]
              }
              entityType={"utensil"}
            />
          </div>
        </div>
      );
      break;
    case "mealPrepPlan":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <div className={entityInfoStyles.entityInfoDetailsHero}>
            <Image
              width={640}
              height={640}
              src={entity?.imageUrl || defaultInstanceTemplateImageUrl}
              alt={entity?.name || "Meal Prep Plan Image"}
              aria-label={entity?.name || "Meal Prep Plan Image"}
            />
            <header className={entityInfoStyles.entityInfoDetailsHeader}>
              <h2>{entity?.name || "Meal Prep Plan Name"}</h2>
              <h3>
                {(entity as MealPrepPlanTemplate)?.instanceTemplates?.length > 0
                  ? `${(entity as MealPrepPlanTemplate)?.instanceTemplates?.length} instance templates used`
                  : "??? day templates used"}
              </h3>
            </header>
            <EntityMacrosPieGraph
              macros={(entity as MealPrepPlanTemplate)?.macros as Macros}
              labelSize={28}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepPlanTemplate)
                  ?.instanceTemplates as InstanceTemplateTemplate[]
              }
              entityType={"mealPrepPlan"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepPlanTemplate)
                  ?.dayTemplates as DayTemplateTemplate[]
              }
              entityType={"dayTemplate"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepPlanTemplate)?.recipes as RecipeTemplate[]
              }
              entityType={"recipe"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepPlanTemplate)
                  ?.ingredients as IngredientTemplate[]
              }
              entityType={"ingredient"}
            />
          </div>
          <div className={entityInfoStyles.entityInfoDetalsComposedSection}>
            <EntityInfoDetailsComposedSection
              entities={
                (entity as MealPrepPlanTemplate)?.utensils as UtensilTemplate[]
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
