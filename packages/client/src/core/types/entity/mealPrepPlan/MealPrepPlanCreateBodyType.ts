import MealPrepPlanTemplate from "./MealPrepPlanTemplate";

type MealPrepPlanCreateBodyType = {
  templateMealPrepPlan: MealPrepPlanTemplate;
  userId: string;
};

export default MealPrepPlanCreateBodyType;
