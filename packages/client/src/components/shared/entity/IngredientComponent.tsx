// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
// Data
import { defaultIngredientImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";

const IngredientComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
}) => {
  const ingredientEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "ingredient")
  ) as IngredientTemplate;

  const { name, imageUrl, macros, enabled } = ingredientEntity;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultIngredientImageUrl}
          title={name}
          aria-label={name}
          width={80}
          height={80}
        />
        <h4>{name}</h4>
      </header>
      <div className={entityComponentStyles.entityComponentDetails}>
        <p>{macros?.calories} calories</p>
        <p>{macros?.proteinAmount}g protein </p>
        <p>{macros?.carbsAmount}g carbs</p>
        <p>{macros?.fatsAmount}g fats</p>
        <p>{enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>
      </div>
    </div>
  );
};

export default IngredientComponent;
