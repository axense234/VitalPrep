import { defaultDairy } from "./data/ingredients/dairy";
import { defaultFruits } from "./data/ingredients/fruits";
import { defaultGrains } from "./data/ingredients/grains";
import { defaultProteins } from "./data/ingredients/proteins";
import { defaultVegetables } from "./data/ingredients/vegetables";
import { defaultUtensilsBasic } from "./data/utensils/utensils";

export const defaultIngredients = (locale: string) =>
  defaultDairy(locale)
    .concat(defaultFruits(locale))
    .concat(defaultGrains(locale))
    .concat(defaultProteins(locale))
    .concat(defaultVegetables(locale));

export const defaultUtensils = (locale: string) => defaultUtensilsBasic(locale);
