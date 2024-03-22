// SCSS
import { useAppSelector } from "@/hooks/redux";
import entityComponentStyles from "../../../scss/components/shared/EntityComponents.module.scss";
// React
import { FC } from "react";
import { selectIngredientById } from "@/redux/slices/ingredientsSlice";
import { State } from "@/redux/api/store";
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";

const IngredientComponent: FC<{ id: string }> = ({ id }) => {
  console.log(id);
  const ingredient = useAppSelector((state: State) =>
    selectIngredientById(state, id)
  );

  if (ingredient) {
    const { name, macros, enabled } = ingredient as IngredientTemplate;
    const { calories, proteinAmount, carbsAmount, fatsAmount } = macros;

    return (
      <div className={entityComponentStyles.ingredientComponent}>
        <h4>{name}</h4>
        <div className={entityComponentStyles.ingredientComponentDetails}>
          <p>{calories} calories</p>
          <p>{proteinAmount}g protein </p>
          <p>{carbsAmount}g carbs</p>
          <p>{fatsAmount}g fats</p>
          <p>{enabled ? `ENABLED ✔️` : `DISABLED ❌`}</p>
        </div>
      </div>
    );
  }
  return null;
};

export default IngredientComponent;
