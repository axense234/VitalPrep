// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
// React
import { FC, ReactElement } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntityOption } from "@/redux/slices/general/selectors";
// Components
import UpsertIngredientInterface from "./interfaces/UpsertIngredientInterface";
import UpsertUtensilInterface from "./interfaces/UpsertUtensilInterface";
import UpsertRecipeInterface from "./interfaces/UpsertRecipeInterface";
import UpsertDayTemplateInterface from "./interfaces/UpsertDayTemplateInterface";
import UpsertInstanceTemplateInterface from "./interfaces/UpsertInstanceTemplateInterface";
import UpsertMealPrepPlanInterface from "./interfaces/UpsertMealPrepPlanInterface";
import UpsertMealPrepLogInterface from "./interfaces/UpsertMealPrepLogInterface";
// Types
import EntityType from "@/core/types/entity/users/EntityType";

const CreateToolInterface: FC<{ forcedSelectedEntityOption?: EntityType }> = ({
  forcedSelectedEntityOption,
}) => {
  const selectedCreateToolOption = useAppSelector(selectSelectedEntityOption);
  const usedCreateToolOption =
    forcedSelectedEntityOption || selectedCreateToolOption;
  const shownInterface =
    useChooseCreateToolShownInterface(usedCreateToolOption);

  return (
    <div className={createToolStyles.createToolInterface}>{shownInterface}</div>
  );
};

const useChooseCreateToolShownInterface = (usedOption: EntityType) => {
  let shownInterface: ReactElement = (
    <UpsertIngredientInterface interfaceType="create" />
  );
  switch (usedOption) {
    case "ingredient":
      shownInterface = <UpsertIngredientInterface interfaceType="create" />;
      break;
    case "utensil":
      shownInterface = <UpsertUtensilInterface interfaceType="create" />;
      break;
    case "recipe":
      shownInterface = <UpsertRecipeInterface interfaceType="create" />;
      break;
    case "dayTemplate":
      shownInterface = <UpsertDayTemplateInterface interfaceType="create" />;
      break;
    case "instanceTemplate":
      shownInterface = (
        <UpsertInstanceTemplateInterface interfaceType="create" />
      );
      break;
    case "mealPrepPlan":
      shownInterface = <UpsertMealPrepPlanInterface interfaceType="create" />;
      break;
    case "mealPrepLog":
      shownInterface = <UpsertMealPrepLogInterface interfaceType="create" />;
      break;
    default:
      throw new Error("What?");
  }
  return shownInterface;
};

export default CreateToolInterface;
