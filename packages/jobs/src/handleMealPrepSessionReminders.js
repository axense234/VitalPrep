// One Signal
import * as OneSignal from "onesignal-node";
// Axios
import axios from "axios";
// DOTENV
import * as dotenv from "dotenv";
dotenv.config();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SITE_URL}/users?uniqueIdentifier=${process.env.ADMIN_USE_UNIQUE_IDENTIFIER}`,
      {
        withCredentials: true,
      }
    );
    return data.users;
  } catch (error) {
    console.log(error);
  }
};

const getUserMealPrepPlan = async (userId, mealPrepPlanId) => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SITE_URL}/${userId}/mealPrepPlans/${mealPrepPlanId}?uniqueIdentifier=${process.env.ADMIN_USE_UNIQUE_IDENTIFIER}&includeInstanceTemplatesTimings=true`,
      {
        withCredentials: true,
      }
    );
    return data.mealPrepPlan;
  } catch (error) {
    console.log(error);
  }
};

const sendNotification = async (userId, username, typeOfNotification) => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID,
    process.env.ONE_SIGNAL_REST_API_KEY
  );

  const notificationContents = {
    en: "",
    ro: "",
  };

  if (typeOfNotification === "dayReminder") {
    notificationContents.en = `${username}, you have a Meal Prep Session to complete today!`;
    notificationContents.ro = `${username}, ai o sesiune de Meal Prep de completat azi!`;
  }

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: notificationContents,
    include_external_user_ids: [userId],
  });
};

const handleMealPrepSessionReminders = async () => {
  const users = await getAllUsers();

  const usersWithMealPrepPlansInUse = await users.filter(
    (user) => user.mealPrepPlanInUseId !== ""
  );

  usersWithMealPrepPlansInUse.forEach(async (user) => {
    const userMealPrepPlan = await getUserMealPrepPlan(
      user.id,
      user.mealPrepPlanInUseId
    );
    const mealPrepPlanInstanceTemplatesTimings =
      userMealPrepPlan.instanceTemplatesTimings;

    console.log(mealPrepPlanInstanceTemplatesTimings);

    mealPrepPlanInstanceTemplatesTimings.forEach(async (timing) => {
      const currentDayOfTheWeekIndex = new Date().getDay();
      const currentDayOfTheWeekString = days[currentDayOfTheWeekIndex];

      console.count(`${currentDayOfTheWeekString}, ${timing.weekday}`);
      if (currentDayOfTheWeekString === timing.weekday) {
        await sendNotification(user.id, user.username, "dayReminder");
      }
    });
  });
};

handleMealPrepSessionReminders();
