import IngredientTemplate from "./IngredientTemplate";

type IngredientCreateBodyType = {
  templateIngredient: IngredientTemplate;
  userId: string;
};

export default IngredientCreateBodyType;
