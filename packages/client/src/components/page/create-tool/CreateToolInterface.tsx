// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// React
import { ReactElement } from "react";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedCreateToolOption } from "@/redux/slices/generalSlice";
// Components
import CreateIngredientInterface from "./interfaces/CreateIngredientInterface";
import CreateUtensilInterface from "./interfaces/CreateUtensilInterface";
import CreateRecipeInterface from "./interfaces/CreateRecipeInterface";
import CreateDayTemplateInterface from "./interfaces/CreateDayTemplateInterface";
import CreateInstanceTemplateInterface from "./interfaces/CreateInstanceTemplateInterface";
import CreateMealPrepPlanInterface from "./interfaces/CreateMealPrepPlanInterface";

const CreateToolInterface = () => {
  const selectedCreateToolOption = useAppSelector(
    selectSelectedCreateToolOption
  );

  let shownInterface: ReactElement = <CreateIngredientInterface />;
  switch (selectedCreateToolOption) {
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
    default:
      console.log("what the fuck are you doing");
      break;
  }

  return (
    <div className={createToolStyles.createToolInterface}>{shownInterface}</div>
  );
};

export default CreateToolInterface;
