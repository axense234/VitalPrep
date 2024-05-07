// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import DayTemplateTemplate from "@/core/types/entity/mutation/DayTemplateTemplate";
// Data
import { defaultDayTemplateImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";

const DayTemplateComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const dayTemplateEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "dayTemplate")
  ) as DayTemplateTemplate;

  const dayTemplateEntityUsed = dayTemplateEntity || entity;

  const { name, imageUrl, macros, recipes } = dayTemplateEntityUsed;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultDayTemplateImageUrl}
          title={name}
          aria-label={name}
          width={80}
          height={80}
        />
        <h5>{name}</h5>
      </header>
      <div
        className={entityComponentStyles.entityComponentDetails}
        style={{ alignItems: "center" }}
      >
        <p>{recipes?.length || "0"} meals</p>
        <p>{macros?.calories} calories</p>
      </div>
    </div>
  );
};

export default DayTemplateComponent;
