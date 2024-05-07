// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
// Data
import { defaultInstanceTemplateImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";

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

  console.log(mealPrepLogEntityShown, date);
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
        <h5>{name}</h5>
      </header>
      <div
        className={entityComponentStyles.entityComponentDetails}
        style={{ alignItems: "center" }}
      >
        <p>{new Date(date || "")?.toLocaleDateString() || "???"}</p>
        <p>{cookingDuration || "???"} hours spent</p>
        <p>{completed ? "COMPLETED" : "NOT COMPLETED"}</p>
      </div>
    </div>
  );
};

export default MealPrepLogComponent;
