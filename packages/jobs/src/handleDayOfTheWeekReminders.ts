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
    console.log(user.username);
    console.log(userNotificationSettings);
    if (
      userNotificationSettings.allowedNotifications &&
      userNotificationSettings.allowDayReminderNotifications
    ) {
      const userMealPrepPlan = await getUserMealPrepPlan(
        user.id,
        user.mealPrepPlanInUseId
      );
      const mealPrepPlanInstanceTemplatesTimings =
        userMealPrepPlan.instanceTemplatesTimings;

      mealPrepPlanInstanceTemplatesTimings.forEach(async (timing) => {
        const currentDayOfTheWeekIndex = new Date().getDay();
        const currentDayOfTheWeekString = days[currentDayOfTheWeekIndex];
        if (currentDayOfTheWeekString === timing.weekday) {
          await sendNotification(
            user.id,
            user.username,
            "dayReminder",
            userNotificationSettings.notificationImageUrl,
            userNotificationSettings.notificationStyle
          );
        }
      });
    }
  });
};

handleDayOfTheWeekReminders();
