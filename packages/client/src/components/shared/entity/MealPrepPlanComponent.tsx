// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import MealPrepPlanTemplate from "@/core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
// Data
import { defaultMealPrepPlanImageUrl } from "@/data";
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

const MealPrepPlanComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const mealPrepPlanEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepPlan")
  ) as MealPrepPlanTemplate;
  const mealPrepPlanEntityShown = mealPrepPlanEntity || entity;
  const mealPrepPlanContainerRef = useRef<HTMLDivElement | null>(null);

  const translateMealPrepPlan = useTranslations(
    "entityComponents.details.mealPrepPlan"
  );
  const translateMealPrepPlanDefaultName = useTranslations(
    "createTool.formLabels.mealPrepPlan"
  );

  const { name, imageUrl, instanceTemplates } = mealPrepPlanEntityShown;

  let windowWidth = useGetWindowWidth();
  let phoneRedesign = windowWidth && windowWidth <= 700;

  if (isALink) {
    return (
      <div
        className={entityComponentStyles.entityComponentWrapper}
        ref={mealPrepPlanContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={mealPrepPlanContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={mealPrepPlanEntityShown.name}
            entityType="mealPrepPlan"
          />
        )}
        <Link
          href={{
            pathname: `/mealPrepPlan/[id]` as any,
            params: { id: entityId || entity?.id },
          }}
          className={entityComponentStyles.entityComponentLinkWrapper}
        >
          <div
            className={entityComponentStyles.entityComponent}
            style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
            ref={mealPrepPlanContainerRef}
          >
            <header className={entityComponentStyles.entityComponentHeader}>
              <Image
                alt={
                  name || translateMealPrepPlanDefaultName("defaultNameValue")
                }
                src={imageUrl || defaultMealPrepPlanImageUrl}
                title={
                  name || translateMealPrepPlanDefaultName("defaultNameValue")
                }
                aria-label={
                  name || translateMealPrepPlanDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>
                {name || translateMealPrepPlanDefaultName("defaultNameValue")}
              </h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            >
              {phoneRedesign ? null : (
                <p>
                  {translateMealPrepPlan("instances", {
                    numberOfInstanceTemplatesUsed:
                      instanceTemplates?.length && instanceTemplates?.length > 0
                        ? instanceTemplates?.length
                        : "???",
                  })}
                </p>
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
      ref={mealPrepPlanContainerRef}
    >
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityComponent"
          parentRef={mealPrepPlanContainerRef}
          handleEntityDeletion={deleteEntityFunction}
          handleEntityModification={updateEntityFunction}
          entityName={mealPrepPlanEntityShown.name}
          entityType="mealPrepPlan"
        />
      )}
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={name || translateMealPrepPlanDefaultName("defaultNameValue")}
          src={imageUrl || defaultMealPrepPlanImageUrl}
          title={name || translateMealPrepPlanDefaultName("defaultNameValue")}
          aria-label={
            name || translateMealPrepPlanDefaultName("defaultNameValue")
          }
          width={80}
          height={80}
        />
        <h6>{name || translateMealPrepPlanDefaultName("defaultNameValue")}</h6>
      </header>
      <div
        className={entityComponentStyles.entityComponentDetails}
        style={{ alignItems: "center" }}
      >
        {phoneRedesign ? null : (
          <p>
            {translateMealPrepPlan("instances", {
              numberOfInstanceTemplatesUsed:
                instanceTemplates?.length && instanceTemplates?.length > 0
                  ? instanceTemplates?.length
                  : "???",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default MealPrepPlanComponent;
