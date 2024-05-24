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

        let usedTimingWeekday = timing.weekday;
        const weekdayTimingIndexInDays = days.indexOf(timing.weekday);

        const timingHour = Number(timing.sessionStartingTime.slice(0, 2));
        const newHour = timingHour + timing.timezoneOffsetInHours;
        if (newHour < 0) {
          usedTimingWeekday = days[weekdayTimingIndexInDays - 1];
        } else if (newHour >= 24) {
          usedTimingWeekday = days[weekdayTimingIndexInDays + 1];
        }

        console.log(currentDayOfTheWeekString, usedTimingWeekday);

        if (currentDayOfTheWeekString === usedTimingWeekday) {
          const currentHourUTC = new Date().getUTCHours();
          const timingHour = Number(timing.sessionStartingTime.slice(0, 2));
          let timingHourUTC = timingHour + timing.timezoneOffsetInHours;
          if (timingHourUTC < 0) {
            timingHourUTC += 24;
          } else if (timingHourUTC >= 24) {
            timingHourUTC -= 24;
          }

          let preTimingHourUTC = timingHourUTC - everyHourReminderInterval;
          let postTimingHourUTC = timingHourUTC + everyHourReminderInterval;

          if (preTimingHourUTC < 0) {
            preTimingHourUTC += 24;
          } else if (preTimingHourUTC >= 24) {
            preTimingHourUTC -= 24;
          }
          if (postTimingHourUTC < 0) {
            postTimingHourUTC += 24;
          } else if (postTimingHourUTC >= 24) {
            postTimingHourUTC -= 24;
          }

          console.log(
            currentHourUTC,
            timingHour,
            timingHourUTC,
            preTimingHourUTC,
            postTimingHourUTC
          );

          if (
            currentHourUTC === preTimingHourUTC &&
            userNotificationSettings.allowPreSessionReminderNotifications
          ) {
            await sendNotification(
              user.id,
              user.username,
              "preSessionReminder",
              userNotificationSettings.notificationImageUrl,
              userNotificationSettings.notificationStyle
            );
          } else if (currentHourUTC === postTimingHourUTC) {
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
