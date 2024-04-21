// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
// Data
import {
  defaultIngredientImageUrl,
  defaultInstanceTemplateImageUrl,
} from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";

const MealPrepLogComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const mealPrepLogEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepLog")
  ) as MealPrepLogTemplate;
  const mealPrepLogEntityShown = mealPrepLogEntity || entity;

  const { name, imageUrl, cookingDuration, date, completed } =
    mealPrepLogEntityShown;

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
        <h4>{name}</h4>
      </header>
      <div className={entityComponentStyles.entityComponentDetails}>
        <p>{date?.toLocaleDateString() || "???"}</p>
        <p>{cookingDuration || "???"} hours spent</p>
        <p>{completed ? "COMPLETED" : "NOT COMPLETED"}</p>
      </div>
    </div>
  );
};

export default MealPrepLogComponent;
