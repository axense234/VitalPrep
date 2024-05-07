// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
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

const UtensilComponent: FC<EntityComponentProps> = ({ clicked, entityId }) => {
  const utensilEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "utensil")
  ) as Utensil;

  const { name, imageUrl, enabled } = utensilEntity;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultUtensilImageUrl}
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
        <p>{enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>
      </div>
    </div>
  );
};

export default UtensilComponent;
