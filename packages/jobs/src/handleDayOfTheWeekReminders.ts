// Data
import { days } from "../data/data";
// DOTENV
import * as dotenv from "dotenv";
// Helpers
import getAllUsers from "../helpers/getAllUsers";
import getUserMealPrepPlan from "../helpers/getUserMealPrepPlan";
import sendNotification from "../helpers/sendNotification";

dotenv.config();

const handleDayOfTheWeekReminders = async () => {
  const users = await getAllUsers();

  const usersWithMealPrepPlansInUse = await users.filter(
    (user) => user.mealPrepPlanInUseId !== ""
  );

  usersWithMealPrepPlansInUse.forEach(async (user) => {
    const userNotificationSettings = user.notificationSettings;
    const userMealPrepPlan = await getUserMealPrepPlan(
      user.id,
      user.mealPrepPlanInUseId
    );
    const mealPrepPlanInstanceTemplatesTimings =
      userMealPrepPlan.instanceTemplatesTimings;
    const mealPrepPlanInstanceTemplates = userMealPrepPlan.instanceTemplates;

    console.log(userNotificationSettings);

    mealPrepPlanInstanceTemplatesTimings.forEach(async (timing, index) => {
      console.log(index);
      const currentDayOfTheWeekIndex = new Date().getDay();
      const currentDayOfTheWeekString = days[currentDayOfTheWeekIndex];
      console.log(mealPrepPlanInstanceTemplates);
      console.log(mealPrepPlanInstanceTemplates[0]);

      console.count(`${currentDayOfTheWeekString}, ${timing.weekday}`);
      if (
        currentDayOfTheWeekString === timing.weekday &&
        userNotificationSettings.allowedNotifications
      ) {
        await sendNotification(
          user.id,
          user.username,
          "dayReminder",
          mealPrepPlanInstanceTemplates[0]?.id
        );
      }
    });
  });
};

handleDayOfTheWeekReminders();
