// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
// Data
import { defaultIngredientImageUrl } from "@/data";
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

const IngredientComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const ingredientEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "ingredient")
  ) as IngredientTemplate;
  const ingredientEntityShown = ingredientEntity || entity;
  const ingredientContainerRef = useRef<HTMLDivElement | null>(null);

  const { name, imageUrl, macros } = ingredientEntityShown;

  const translateIngredient = useTranslations(
    "entityComponents.details.ingredient"
  );
  const translateIngredientDefaultName = useTranslations(
    "createTool.formLabels.ingredient"
  );

  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 1100;
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
        ref={ingredientContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={ingredientContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={ingredientEntityShown.name}
            entityType="ingredient"
          />
        )}
        <Link
          href={{
            pathname: `/ingredient/[id]` as any,
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
                alt={name || translateIngredientDefaultName("defaultNameValue")}
                src={imageUrl || defaultIngredientImageUrl}
                title={
                  name || translateIngredientDefaultName("defaultNameValue")
                }
                aria-label={
                  name || translateIngredientDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>
                {name || translateIngredientDefaultName("defaultNameValue")}
              </h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            >
              {phoneRedesign ? null : (
                <p>
                  {translateIngredient("calories", {
                    numberOfCalories: macros?.calories,
                  })}
                </p>
              )}
              {tabletOrPhoneRedesign ? null : (
                <>
                  <p>
                    {translateIngredient("macros.protein", {
                      grams: macros?.proteinAmount,
                    })}
                  </p>
                  <p>
                    {translateIngredient("macros.carbs", {
                      grams: macros?.carbsAmount,
                    })}
                  </p>
                  <p>
                    {translateIngredient("macros.fats", {
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
      ref={ingredientContainerRef}
    >
      <div className="hiddenLTR" ref={componentRef}>
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={ingredientContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={ingredientEntityShown.name}
            entityType="ingredient"
          />
        )}
        <header className={entityComponentStyles.entityComponentHeader}>
          <Image
            alt={`${name} Image`}
            src={imageUrl || defaultIngredientImageUrl}
            title={name}
            aria-label={name}
            width={80}
            height={80}
          />
          <h6>{name}</h6>
        </header>
        <div
          className={entityComponentStyles.entityComponentDetails}
          style={{ alignItems: "center" }}
        >
          {phoneRedesign ? null : (
            <p>
              {translateIngredient("calories", {
                numberOfCalories: macros?.calories,
              })}
            </p>
          )}
          {tabletOrPhoneRedesign ? null : (
            <>
              <p>
                {translateIngredient("macros.protein", {
                  grams: macros?.proteinAmount,
                })}
              </p>
              <p>
                {translateIngredient("macros.carbs", {
                  grams: macros?.carbsAmount,
                })}
              </p>
              <p>
                {translateIngredient("macros.fats", {
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

export default IngredientComponent;
