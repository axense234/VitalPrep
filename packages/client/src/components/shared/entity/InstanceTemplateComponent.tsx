// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import InstanceTemplateTemplate from "@/core/types/entity/instanceTemplate/InstanceTemplateTemplate";
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

const InstanceTemplateComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
  hasEntityMutationMenu = true,
  deleteEntityFunction,
  updateEntityFunction,
  isALink,
}) => {
  const instanceTemplate = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "instanceTemplate")
  ) as InstanceTemplateTemplate;
  const instanceTemplateShown = instanceTemplate || entity;
  const instanceTemplateContainerRef = useRef<HTMLDivElement | null>(null);

  const { name, imageUrl, coverage, dayTemplates } = instanceTemplateShown;
  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 1000;

  if (isALink) {
    return (
      <div
        className={entityComponentStyles.entityComponentWrapper}
        ref={instanceTemplateContainerRef}
      >
        {hasEntityMutationMenu && (
          <EntityMutationMenu
            type="entityComponent"
            parentRef={instanceTemplateContainerRef}
            handleEntityDeletion={deleteEntityFunction}
            handleEntityModification={updateEntityFunction}
            entityName={instanceTemplateShown.name}
            entityType="instanceTemplate"
          />
        )}
        <Link
          href={{
            pathname: `/instanceTemplate/[id]` as any,
            params: { id: entityId || entity?.id },
          }}
          className={entityComponentStyles.entityComponentLinkWrapper}
        >
          <div
            className={entityComponentStyles.entityComponent}
            style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
            ref={instanceTemplateContainerRef}
          >
            <header className={entityComponentStyles.entityComponentHeader}>
              <Image
                alt={`${name} Image`}
                src={imageUrl || defaultInstanceTemplateImageUrl}
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
              {tabletOrPhoneRedesign ? null : (
                <>
                  <p>{coverage || "0"} days covered</p>
                  <p>{dayTemplates?.length || "0"} day templates used</p>
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
      ref={instanceTemplateContainerRef}
    >
      {hasEntityMutationMenu && (
        <EntityMutationMenu
          type="entityComponent"
          parentRef={instanceTemplateContainerRef}
          handleEntityDeletion={deleteEntityFunction}
          handleEntityModification={updateEntityFunction}
          entityName={instanceTemplateShown.name}
          entityType="instanceTemplate"
        />
      )}
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultInstanceTemplateImageUrl}
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
        {tabletOrPhoneRedesign ? null : (
          <>
            <p>{coverage || "0"} days covered</p>
            <p>{dayTemplates?.length || "0"} day templates used</p>
          </>
        )}
      </div>
    </div>
  );
};

export default InstanceTemplateComponent;
