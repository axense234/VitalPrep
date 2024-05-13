import EntityTemplateType from "./EntityTemplateType";
import IngredientTemplate from "./ingredient/IngredientTemplate";
import UtensilTemplate from "./utensil/UtensilTemplate";

type EntityTemplateWithMacrosType =
  | Exclude<EntityTemplateType, UtensilTemplate>
  | IngredientTemplate;

export default EntityTemplateWithMacrosType;
