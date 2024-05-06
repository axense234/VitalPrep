// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// React
import { FC, ReactElement } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedEntityOption } from "@/redux/slices/generalSlice";
// Components
import CreateIngredientInterface from "./interfaces/CreateIngredientInterface";
import CreateUtensilInterface from "./interfaces/CreateUtensilInterface";
import CreateRecipeInterface from "./interfaces/CreateRecipeInterface";
import CreateDayTemplateInterface from "./interfaces/CreateDayTemplateInterface";
import CreateInstanceTemplateInterface from "./interfaces/CreateInstanceTemplateInterface";
import CreateMealPrepPlanInterface from "./interfaces/CreateMealPrepPlanInterface";
import CreateMealPrepLogInterface from "./interfaces/CreateMealPrepLogInterface";
// Types
import EntityType from "@/core/types/entity/EntityType";

const CreateToolInterface: FC<{ forcedSelectedEntityOption?: EntityType }> = ({
  forcedSelectedEntityOption,
}) => {
  const selectedCreateToolOption = useAppSelector(selectSelectedEntityOption);
  const usedCreateToolOption =
    forcedSelectedEntityOption || selectedCreateToolOption;

  let shownInterface: ReactElement = <CreateIngredientInterface />;
  switch (usedCreateToolOption) {
    case "ingredient":
      shownInterface = <CreateIngredientInterface />;
      break;
    case "utensil":
      shownInterface = <CreateUtensilInterface />;
      break;
    case "recipe":
      shownInterface = <CreateRecipeInterface />;
      break;
    case "dayTemplate":
      shownInterface = <CreateDayTemplateInterface />;
      break;
    case "instanceTemplate":
      shownInterface = <CreateInstanceTemplateInterface />;
      break;
    case "mealPrepPlan":
      shownInterface = <CreateMealPrepPlanInterface />;
      break;
    case "mealPrepLog":
      shownInterface = <CreateMealPrepLogInterface />;
      break;
    default:
      throw new Error("What?");
  }

  return (
    <div className={createToolStyles.createToolInterface}>{shownInterface}</div>
  );
};

export default CreateToolInterface;
