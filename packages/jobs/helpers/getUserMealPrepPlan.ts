import axios from "axios";

const getUserMealPrepPlan = async (userId: string, mealPrepPlanId: string) => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SITE_URL}/${userId}/mealPrepPlans/${mealPrepPlanId}?uniqueIdentifier=${process.env.ADMIN_USE_UNIQUE_IDENTIFIER}&includeInstanceTemplatesTimings=true&includeInstanceTemplates=true`,
      {
        withCredentials: true,
      }
    );
    return data.mealPrepPlan;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default getUserMealPrepPlan;
