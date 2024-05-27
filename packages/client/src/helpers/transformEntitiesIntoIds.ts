// Types
import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import DayTemplateType from "@/core/types/entity/dayTemplate/DayTemplateType";
import IngredientType from "@/core/types/entity/ingredient/IngredientType";
import InstanceTemplateType from "@/core/types/entity/instanceTemplate/InstanceTemplateType";
import RecipeType from "@/core/types/entity/recipe/RecipeType";
import EntityType from "@/core/types/entity/users/EntityType";
import UtensilType from "@/core/types/entity/utensil/UtensilType";

const transformEntitiesIntoIds = (
  entityFoundById: EntityTemplateType,
  entityType: EntityType
) => {
  const entityWithComponents = entityFoundById as EntityTemplateType & {
    ingredients: IngredientType[] | string[];
    utensils: UtensilType[] | string[];
    recipes: RecipeType[] | string[];
    dayTemplates: DayTemplateType[] | string[];
    instanceTemplates: InstanceTemplateType[] | string[];
  };

  const updatedIngredients = (
    entityWithComponents.ingredients as IngredientType[]
  )?.map((ing) => ing.id);
  const updatedUtensils = (entityWithComponents.utensils as UtensilType[])?.map(
    (utensil) => utensil.id
  );

  const updatedRecipes = (entityWithComponents.recipes as RecipeType[])?.map(
    (recipe) => recipe.id
  );

  const updatedDayTemplates = (
    entityWithComponents.dayTemplates as DayTemplateType[]
  )?.map((dayTemplate) => dayTemplate.id);

  const updatedInstanceTemplates = (
    entityWithComponents.instanceTemplates as InstanceTemplateType[]
  )?.map((instanceTemplate) => instanceTemplate.id);

  let updatedEntity;

  switch (entityType) {
    case "recipe":
      updatedEntity = {
        ...entityWithComponents,
        ingredients: updatedIngredients,
        utensils: updatedUtensils,
      };
      break;
    case "dayTemplate":
      updatedEntity = {
        ...entityWithComponents,
        recipes: updatedRecipes,
      };
      break;
    case "instanceTemplate":
      updatedEntity = {
        ...entityWithComponents,
        dayTemplates: updatedDayTemplates,
      };
      break;
    case "mealPrepPlan":
      updatedEntity = {
        ...entityWithComponents,
        instanceTemplates: updatedInstanceTemplates,
      };
      break;
    case "mealPrepLog":
      updatedEntity = {
        ...entityWithComponents,
      };
    default:
      break;
  }
  return updatedEntity;
};

export default transformEntitiesIntoIds;
