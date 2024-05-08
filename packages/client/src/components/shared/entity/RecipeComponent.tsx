// SCSS
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
// Types
import EntityComponentProps from "@/core/interfaces/entity/EntityComponentProps";
import RecipeTemplate from "@/core/types/entity/mutation/RecipeTemplate";
// Data
import { defaultRecipeImageUrl } from "@/data";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Next
import Image from "next/image";

const RecipeComponent: FC<EntityComponentProps> = ({
  clicked,
  entityId,
  entity,
}) => {
  const recipeEntity = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "recipe")
  ) as RecipeTemplate;
  const recipeEntityShown = recipeEntity || entity;

  const { name, imageUrl, macros } = recipeEntityShown;

  return (
    <div
      className={entityComponentStyles.entityComponent}
      style={{ filter: clicked ? "brightness(1)" : "brightness(0.5)" }}
    >
      <header className={entityComponentStyles.entityComponentHeader}>
        <Image
          alt={`${name} Image`}
          src={imageUrl || defaultRecipeImageUrl}
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
        <p>{macros?.calories} calories</p>
        <p>{macros?.proteinAmount}g protein </p>
        <p>{macros?.carbsAmount}g carbs</p>
        <p>{macros?.fatsAmount}g fats</p>
      </div>
    </div>
  );
};

export default RecipeComponent;
