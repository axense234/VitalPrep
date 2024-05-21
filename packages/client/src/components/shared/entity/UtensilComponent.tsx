// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
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
// Hooks
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// Components
import EntityMutationMenu from "./EntityMutationMenu";

const UtensilComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const utensilEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "utensil")
  ) as Utensil;
  const utensilEntityShown = utensilEntity || entity;
  const utensilContainerRef = useRef<HTMLDivElement | null>(null);

  const { name, imageUrl, enabled } = utensilEntityShown;
  let windowWidth = useGetWindowWidth();
  let phoneRedesign = windowWidth && windowWidth <= 600;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
      ref={utensilContainerRef}
    >
      <EntityMutationMenu
        type="entityComponent"
        parentRef={utensilContainerRef}
      />
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultUtensilImageUrl}
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
        {phoneRedesign ? null : <p>{enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>}
      </div>
    </div>
  );
};

export default UtensilComponent;
