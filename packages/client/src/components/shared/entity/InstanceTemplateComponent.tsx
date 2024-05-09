// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import InstanceTemplateTemplate from "@/core/types/entity/mutation/InstanceTemplateTemplate";
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

const InstanceTemplateComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const instanceTemplate = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "instanceTemplate")
  ) as InstanceTemplateTemplate;
  const instanceTemplateShown = instanceTemplate || entity;

  const { name, imageUrl, coverage, dayTemplates } = instanceTemplateShown;
  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth <= 1000;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
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
  );
};

export default InstanceTemplateComponent;
