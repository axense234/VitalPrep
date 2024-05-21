// Data
import { days, everyHourReminderInterval } from "../data/data";
// DOTENV
import * as dotenv from "dotenv";
// Helpers
import getAllUsers from "../helpers/getAllUsers";
import getUserMealPrepPlan from "../helpers/getUserMealPrepPlan";
import sendNotification from "../helpers/sendNotification";
import createSessionLog from "../helpers/createSessionLog";

dotenv.config();

const handleEveryHourReminders = async () => {
  const users = await getAllUsers();

  const usersWithMealPrepPlansInUse = await users.filter(
    (user) => user.mealPrepPlanInUseId !== ""
  );

  usersWithMealPrepPlansInUse.forEach(async (user) => {
    const userNotificationSettings = user.notificationSettings;
    console.log(userNotificationSettings);
    if (userNotificationSettings.allowedNotifications) {
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
          const currentHour = new Date().getHours();
          const timingHour = Number(timing.sessionStartingTime.slice(0, 2));

          if (
            currentHour === timingHour - everyHourReminderInterval &&
            userNotificationSettings.allowPreSessionReminderNotifications
          ) {
            await sendNotification(
              user.id,
              user.username,
              "preSessionReminder",
              userNotificationSettings.notificationImageUrl,
              userNotificationSettings.notificationStyle
            );
          } else if (currentHour === timingHour + everyHourReminderInterval) {
            if (userNotificationSettings.allowAutomaticCreationOfLogs) {
              await createSessionLog(
                user.id,
                everyHourReminderInterval,
                userMealPrepPlan.instanceTemplates[0].id
              );
            }
            if (
              userNotificationSettings.allowPostSessionReminderNotifications
            ) {
              await sendNotification(
                user.id,
                user.username,
                "postSessionReminder",
                userNotificationSettings.notificationImageUrl,
                userNotificationSettings.notificationStyle
              );
            }
          }
        }
      });
    }
  });
};

handleEveryHourReminders();
