// Axios Instance
import axiosInstance from "../utils/axios";

const createSessionLog = async (
  userId: string,
  cookingDuration: number,
  instanceTemplateId: string
) => {
  try {
    const { data } = await axiosInstance.post(
      `/mealPrepLogs/create`,
      {
        name: "Session Log",
        cookingDuration,
        instanceTemplateId,
        date: new Date(),
      },
      {
        params: {
          userId: userId,
        },
      }
    );
    return data.mealPrepLog;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default createSessionLog;
