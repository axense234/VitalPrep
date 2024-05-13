import MealPrepLogTemplate from "./MealPrepLogTemplate";

type MealPrepLogCreateBodyType = {
  templateMealPrepLog: MealPrepLogTemplate;
  userId: string;
};
export default MealPrepLogCreateBodyType;
