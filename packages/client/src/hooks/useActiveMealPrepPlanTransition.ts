// Types
import MealPrepPlanType from "@/core/types/entity/mealPrepPlan/MealPrepPlanType";
// React
import { MutableRefObject, useEffect } from "react";

const useActiveMealPrepPlanTransition = (
  mealPrepPlans: MealPrepPlanType[],
  activeMealPrepPlanRef: MutableRefObject<HTMLDivElement | null>,
  showActiveMealPrepPlan: boolean,
  tabletOrPhoneRedesign: boolean
) => {
  useEffect(() => {
    if (mealPrepPlans.length >= 1) {
      const activeMealPrepPlanContainer =
        activeMealPrepPlanRef.current as HTMLDivElement;
      if (showActiveMealPrepPlan) {
        activeMealPrepPlanContainer.style.transform = "translateX(0%)";
      } else if (!showActiveMealPrepPlan) {
        if (tabletOrPhoneRedesign) {
          activeMealPrepPlanContainer.style.transform = "translateX(-70%)";
        } else {
          activeMealPrepPlanContainer.style.transform = "translateX(-80%)";
        }
      }
    }
  }, [showActiveMealPrepPlan]);
};

export default useActiveMealPrepPlanTransition;
