// SCSS
import entityComponentStyles from "@/scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import { Utensil } from "@prisma/client";
// Data
import { defaultUtensilImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";
// Components
import EntityMutationMenu from "./EntityMutationMenu";
// Translations
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
// Pop-in Transitions
import usePopInAnimation from "@/hooks/usePopInTransition";
import { useInView } from "react-intersection-observer";

const UtensilComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const utensilEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "utensil")
  ) as Utensil;
  const utensilEntityShown = utensilEntity || entity;
  const utensilContainerRef = useRef<HTMLDivElement | null>(null);

  const translateUtensilDefaultName = useTranslations(
    "createTool.formLabels.utensil"
  );

  const { name, imageUrl } = utensilEntityShown;

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
        ref={utensilContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={utensilContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={utensilEntityShown.name}
            entityType="utensil"
          />
        )}
        <Link
          href={{
            pathname: `/utensil/[id]` as any,
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
                alt={name || translateUtensilDefaultName("defaultNameValue")}
                src={imageUrl || defaultUtensilImageUrl}
                title={name || translateUtensilDefaultName("defaultNameValue")}
                aria-label={
                  name || translateUtensilDefaultName("defaultNameValue")
                }
                width={80}
                height={80}
              />
              <h6>{name || translateUtensilDefaultName("defaultNameValue")}</h6>
            </header>
            <div
              className={entityComponentStyles.entityComponentDetails}
              style={{ alignItems: "center" }}
            ></div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
      ref={utensilContainerRef}
    >
      <div className="hiddenLTR" ref={componentRef}>
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={utensilContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={utensilEntityShown.name}
            entityType="utensil"
          />
        )}
        <header className={entityComponentStyles.entityComponentHeader}>
          <Image
            alt={name || translateUtensilDefaultName("defaultNameValue")}
            src={imageUrl || defaultUtensilImageUrl}
            title={name || translateUtensilDefaultName("defaultNameValue")}
            aria-label={name || translateUtensilDefaultName("defaultNameValue")}
            width={80}
            height={80}
          />
          <h6>{name || translateUtensilDefaultName("defaultNameValue")}</h6>
        </header>
        <div
          className={entityComponentStyles.entityComponentDetails}
          style={{ alignItems: "center" }}
        />
      </div>
    </div>
  );
};

export default UtensilComponent;
