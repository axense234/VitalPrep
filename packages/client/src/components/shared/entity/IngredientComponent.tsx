// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC, useRef, useState } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import IngredientTemplate from "@/core/types/entity/ingredient/IngredientTemplate";
// Data
import { defaultIngredientImageUrl } from "@/data";
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

const IngredientComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const ingredientEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "ingredient")
  ) as IngredientTemplate;
  const ingredientEntityShown = ingredientEntity || entity;
  const ingredientContainerRef = useRef<HTMLDivElement | null>(null);

  const { name, imageUrl, macros, enabled } = ingredientEntityShown;

  let windowWidth = useGetWindowWidth();
  let tabletOrPhoneRedesign = windowWidth && windowWidth <= 1100;
  let phoneRedesign = windowWidth && windowWidth <= 600;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
      ref={ingredientContainerRef}
    >
      <EntityMutationMenu
        type="entityComponent"
        parentRef={ingredientContainerRef}
      />
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultIngredientImageUrl}
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
        {phoneRedesign ? null : <p>{macros?.calories} calories</p>}
        {tabletOrPhoneRedesign ? null : (
          <>
            <p>{macros?.proteinAmount}g protein </p>
            <p>{macros?.carbsAmount}g carbs</p>
            <p>{macros?.fatsAmount}g fats</p>
            <p>{enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientComponent;
