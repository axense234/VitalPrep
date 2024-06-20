// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import DayTemplateTemplate from "@/core/types/entity/dayTemplate/DayTemplateTemplate";
// Data
import { defaultDayTemplateImageUrl } from "@/data";
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

const DayTemplateComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const dayTemplateEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "dayTemplate")
  ) as DayTemplateTemplate;

  const dayTemplateEntityUsed = dayTemplateEntity || entity;
  const dayTemplateContainerRef = useRef<HTMLDivElement | null>(null);

  const translateDayTemplate = useTranslations(
    "entityComponents.details.dayTemplate"
  );
  const translateDayTemplateDefaultName = useTranslations(
    "createTool.formLabels.dayTemplate"
  );

  const { name, imageUrl, macros, recipes } = dayTemplateEntityUsed;
  let windowWidth = useGetWindowWidth();
  let phoneRedesign = windowWidth && windowWidth <= 800;

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
        ref={dayTemplateContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={dayTemplateContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={dayTemplateEntityUsed.name}
            entityType="dayTemplate"
          />
        )}
        <Link
          href={{
            pathname: `/dayTemplate/[id]` as any,
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
                alt={
                  name || translateDayTemplateDefaultName("defaultNameValue")
                }
                src={imageUrl || defaultDayTemplateImageUrl}
                title={
                  name || translateDayTemplateDefaultName("defaultNameValue")
                }
                aria-label={
                  name || translateDayTemplateDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>
                {name || translateDayTemplateDefaultName("defaultNameValue")}
              </h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            >
              {phoneRedesign ? null : (
                <>
                  <p>
                    {translateDayTemplate("meals", {
                      numberOfMeals: recipes?.length,
                    })}
                  </p>
                  <p>
                    {translateDayTemplate("calories", {
                      numberOfCalories: macros?.calories,
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
      ref={dayTemplateContainerRef}
    >
      <div className="hiddenLTR" ref={componentRef}>
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={dayTemplateContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={dayTemplateEntityUsed.name}
            entityType="dayTemplate"
          />
        )}
        <header className={entityComponentStyles.entityComponentHeader}>
          <Image
            alt={name || translateDayTemplateDefaultName("defaultNameValue")}
            src={imageUrl || defaultDayTemplateImageUrl}
            title={name || translateDayTemplateDefaultName("defaultNameValue")}
            aria-label={
              name || translateDayTemplateDefaultName("defaultNameValue")
            }
            width={80}
            height={80}
          />
          <h6>{name || translateDayTemplateDefaultName("defaultNameValue")}</h6>
        </header>
        <div
          className={entityComponentStyles.entityComponentDetails}
          style={{ alignItems: "center" }}
        >
          {phoneRedesign ? null : (
            <>
              <p>
                {translateDayTemplate("meals", {
                  numberOfMeals: recipes?.length,
                })}
              </p>
              <p>
                {translateDayTemplate("calories", {
                  numberOfCalories: macros?.calories,
                })}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DayTemplateComponent;
