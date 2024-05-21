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

const DayTemplateComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const dayTemplateEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "dayTemplate")
  ) as DayTemplateTemplate;

  const dayTemplateEntityUsed = dayTemplateEntity || entity;
  const dayTemplateContainerRef = useRef<HTMLDivElement | null>(null);

  const { name, imageUrl, macros, recipes } = dayTemplateEntityUsed;
  let windowWidth = useGetWindowWidth();
  let phoneRedesign = windowWidth && windowWidth <= 800;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
      ref={dayTemplateContainerRef}
    >
      <EntityMutationMenu
        type="entityComponent"
        parentRef={dayTemplateContainerRef}
      />
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultDayTemplateImageUrl}
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
          <>
            <p>{recipes?.length || "0"} meals</p>
            <p>{macros?.calories} calories</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DayTemplateComponent;
