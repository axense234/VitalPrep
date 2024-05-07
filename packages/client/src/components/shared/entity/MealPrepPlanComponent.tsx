// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import MealPrepPlanTemplate from "@/core/types/entity/mutation/MealPrepPlanTemplate";
// Data
import { defaultMealPrepPlanImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";

const MealPrepPlanComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const mealPrepPlanEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepPlan")
  ) as MealPrepPlanTemplate;
  const mealPrepPlanEntityShown = mealPrepPlanEntity || entity;

  const { name, imageUrl, instanceTemplates } = mealPrepPlanEntityShown;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultMealPrepPlanImageUrl}
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
        <p>
          {instanceTemplates?.length > 0 ? instanceTemplates.length : "???"}{" "}
          instance templates used
        </p>
      </div>
    </div>
  );
};

export default MealPrepPlanComponent;
