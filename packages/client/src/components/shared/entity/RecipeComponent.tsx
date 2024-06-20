// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import RecipeTemplate from "@/core/types/entity/recipe/RecipeTemplate";
// Data
import { defaultRecipeImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Components
import EntityMutationMenu from "./EntityMutationMenu";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
// Pop-in Transitions
import usePopInAnimation from "@/hooks/usePopInTransition";
import { useInView } from "react-intersection-observer";

const RecipeComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const recipeEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "recipe")
  ) as RecipeTemplate;
  const recipeEntityShown = recipeEntity || entity;
  const recipeContainerRef = useRef<HTMLDivElement | null>(null);

  const translateRecipe = useTranslations("entityComponents.details.recipe");
  const translateRecipeDefaultName = useTranslations(
    "createTool.formLabels.recipe"
  );

  const { name, imageUrl, macros } = recipeEntityShown;

  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 1000;
  let phoneRedesign = windowWidth && windowWidth <= 600;

  const {
    ref: componentRef,
    inView: componentInView,
    entry: componentEntry,
  } = useInView();
  usePopInAnimation("showLTR", componentInView, componentEntry);

  if (isALink) {
    return (
      <div
        className={entityComponentStyles.entityComponentWrapper}
        ref={recipeContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={recipeContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={recipeEntityShown.name}
            entityType="recipe"
          />
        )}
        <Link
          href={{
            pathname: `/recipe/[id]` as any,
            params: { id: entityId || entity?.id },
          }}
          className={entityComponentStyles.entityComponentLinkWrapper}
        >
          <div
            className={`${entityComponentStyles.entityComponent} hiddenLTR`}
            style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
            ref={componentRef}
          >
            <header className={entityComponentStyles.entityComponentHeader}>
              <Image
                alt={name || translateRecipeDefaultName("defaultNameValue")}
                src={imageUrl || defaultRecipeImageUrl}
                title={name || translateRecipeDefaultName("defaultNameValue")}
                aria-label={
                  name || translateRecipeDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>{name || translateRecipeDefaultName("defaultNameValue")}</h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            >
              {phoneRedesign ? null : (
                <p>
                  {translateRecipe("calories", {
                    numberOfCalories: macros?.calories,
                  })}
                </p>
              )}
              {tabletOrPhoneRedesign ? null : (
                <>
                  <p>
                    {translateRecipe("macros.protein", {
                      grams: macros?.proteinAmount,
                    })}
                  </p>
                  <p>
                    {translateRecipe("macros.carbs", {
                      grams: macros?.carbsAmount,
                    })}
                  </p>
                  <p>
                    {translateRecipe("macros.fats", {
                      grams: macros?.fatsAmount,
                    })}
                  </p>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
      ref={recipeContainerRef}
    >
      <div className="hiddenLTR" ref={componentRef}>
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={recipeContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={recipeEntityShown.name}
            entityType="recipe"
          />
        )}
        <header className={entityComponentStyles.entityComponentHeader}>
          <Image
            alt={name || translateRecipeDefaultName("defaultNameValue")}
            src={imageUrl || defaultRecipeImageUrl}
            title={name || translateRecipeDefaultName("defaultNameValue")}
            aria-label={name || translateRecipeDefaultName("defaultNameValue")}
            width={80}
            height={80}
          />
          <h6>{name || translateRecipeDefaultName("defaultNameValue")}</h6>
        </header>
        <div
          className={entityComponentStyles.entityComponentDetails}
          style={{ alignItems: "center" }}
        >
          {phoneRedesign ? null : (
            <p>
              {translateRecipe("calories", {
                numberOfCalories: macros?.calories,
              })}
            </p>
          )}
          {tabletOrPhoneRedesign ? null : (
            <>
              <p>
                {translateRecipe("macros.protein", {
                  grams: macros?.proteinAmount,
                })}
              </p>
              <p>
                {translateRecipe("macros.carbs", {
                  grams: macros?.carbsAmount,
                })}
              </p>
              <p>
                {translateRecipe("macros.fats", {
                  grams: macros?.fatsAmount,
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeComponent;
