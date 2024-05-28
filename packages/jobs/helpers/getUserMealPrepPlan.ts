// Axios Instance
import axiosInstance from "../utils/axios";

const getUserMealPrepPlan = async (userId: string, mealPrepPlanId: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/${userId}/mealPrepPlans/${mealPrepPlanId}`,
      {
        params: {
          includeInstanceTemplatesTimings: true,
          includeInstanceTemplates: true,
        },
      }
    );
    return data.mealPrepPlan;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default getUserMealPrepPlan;
