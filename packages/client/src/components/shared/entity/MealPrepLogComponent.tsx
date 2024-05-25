// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import MealPrepLogTemplate from "@/core/types/entity/mealPrepLog/MealPrepLogTemplate";
// Data
import { defaultInstanceTemplateImageUrl } from "@/data";
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

const MealPrepLogComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const mealPrepLogEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepLog")
  ) as MealPrepLogTemplate;
  const mealPrepLogEntityShown = mealPrepLogEntity || entity;
  const mealPrepLogContainerRef = useRef<HTMLDivElement | null>(null);

  const translateMealPrepLog = useTranslations(
    "entityComponents.details.mealPrepLog"
  );
  const translateMealPrepLogDefaultName = useTranslations(
    "createTool.formLabels.mealPrepLog"
  );

  const { name, imageUrl, cookingDuration, date, completed } =
    mealPrepLogEntityShown;

  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 1100;
  let phoneRedesign = windowWidth && windowWidth <= 500;

  if (isALink) {
    return (
      <div
        className={entityComponentStyles.entityComponentWrapper}
        ref={mealPrepLogContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={mealPrepLogContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={mealPrepLogEntityShown.name}
            entityType="mealPrepLog"
          />
        )}
        <Link
          href={{
            pathname: `/mealPrepLog/[id]` as any,
            params: { id: entityId || entity?.id },
          }}
          className={entityComponentStyles.entityComponentLinkWrapper}
        >
          <div
            className={entityComponentStyles.entityComponent}
            style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
            ref={mealPrepLogContainerRef}
          >
            <header className={entityComponentStyles.entityComponentHeader}>
              <Image
                alt={
                  name || translateMealPrepLogDefaultName("defaultNameValue")
                }
                src={imageUrl || defaultInstanceTemplateImageUrl}
                title={
                  name || translateMealPrepLogDefaultName("defaultNameValue")
                }
                aria-label={
                  name || translateMealPrepLogDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>
                {name || translateMealPrepLogDefaultName("defaultNameValue")}
              </h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            >
              {phoneRedesign ? null : (
                <p>{new Date(date || "")?.toLocaleDateString() || "???"}</p>
              )}
              {tabletOrPhoneRedesign ? null : (
                <>
                  <p>
                    {translateMealPrepLog("cookingDuration", {
                      cookingDuration: cookingDuration || "???",
                    })}
                  </p>
                  <p>
                    {completed
                      ? translateMealPrepLog("completed")
                      : translateMealPrepLog("abandoned")}
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
      ref={mealPrepLogContainerRef}
    >
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityComponent"
          parentRef={mealPrepLogContainerRef}
          handleEntityDeletion={deleteEntityFunction}
          handleEntityModification={updateEntityFunction}
          entityName={mealPrepLogEntityShown.name}
          entityType="mealPrepLog"
        />
      )}
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={name || translateMealPrepLogDefaultName("defaultNameValue")}
          src={imageUrl || defaultInstanceTemplateImageUrl}
          title={name || translateMealPrepLogDefaultName("defaultNameValue")}
          aria-label={
            name || translateMealPrepLogDefaultName("defaultNameValue")
          }
          width={80}
          height={80}
        />
        <h6>{name || translateMealPrepLogDefaultName("defaultNameValue")}</h6>
      </header>
      <div
        className={entityComponentStyles.entityComponentDetails}
        style={{ alignItems: "center" }}
      >
        {phoneRedesign ? null : (
          <p>{new Date(date || "")?.toLocaleDateString() || "???"}</p>
        )}
        {tabletOrPhoneRedesign ? null : (
          <>
            <p>
              {translateMealPrepLog("cookingDuration", {
                cookingDuration: cookingDuration || "???",
              })}
            </p>
            <p>
              {completed
                ? translateMealPrepLog("completed")
                : translateMealPrepLog("abandoned")}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default MealPrepLogComponent;
