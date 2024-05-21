import axios from "axios";

const createSessionLog = async (
  userId: string,
  cookingDuration: number,
  instanceTemplateId: string
) => {
  try {
    const { data } = await axios.post(
      `${process.env.SERVER_SITE_URL}/mealPrepLogs/create?userId=${userId}`,
      {
        name: "Session Log",
        cookingDuration,
        instanceTemplateId,
        date: new Date(),
      },
      {
        withCredentials: true,
      }
    );
    return data.mealPrepLog;
  } catch (error) {
    console.log(error);
    return {};
  }
};

export default createSessionLog;
