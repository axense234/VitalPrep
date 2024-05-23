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
        const currentDayOfTheWeekIndex = new Date().getUTCDay();
        const currentDayOfTheWeekString = days[currentDayOfTheWeekIndex];

        const timingWeekdayIndex = days.indexOf(timing.weekday);
        const timingWeekdayIndexUTC = (timingWeekdayIndex + 1) % 7;

        if (currentDayOfTheWeekString === days[timingWeekdayIndexUTC]) {
          const currentHourUTC = new Date().getUTCHours();
          const timingHourLocal = Number(
            timing.sessionStartingTime.slice(0, 2)
          );

          const localDate = new Date();
          localDate.setHours(timingHourLocal, 0, 0, 0);

          const timingHourUTC = localDate.getUTCHours();

          if (
            currentHourUTC === timingHourUTC - everyHourReminderInterval &&
            userNotificationSettings.allowPreSessionReminderNotifications
          ) {
            await sendNotification(
              user.id,
              user.username,
              "preSessionReminder",
              userNotificationSettings.notificationImageUrl,
              userNotificationSettings.notificationStyle
            );
          } else if (
            currentHourUTC ===
            timingHourUTC + everyHourReminderInterval
          ) {
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
