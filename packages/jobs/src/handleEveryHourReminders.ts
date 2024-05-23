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

        let usedTimingWeekday = timing.weekday;
        const weekdayTimingIndexInDays = days.indexOf(timing.weekday);

        const timingHour = Number(timing.sessionStartingTime.slice(0, 2));
        const newHour = timingHour + timing.timezoneOffsetInHours;
        if (newHour < 0) {
          usedTimingWeekday = days[weekdayTimingIndexInDays - 1];
        } else if (newHour >= 24) {
          usedTimingWeekday = days[weekdayTimingIndexInDays + 1];
        }

        console.log(timing);

        if (currentDayOfTheWeekString === usedTimingWeekday) {
          const currentHour = new Date().getUTCHours();
          const timingHour = Number(timing.sessionStartingTime.slice(0, 2));

          let newPreTimingHour =
            timingHour -
            timing.timezoneOffsetInHours -
            everyHourReminderInterval;
          let newPostTimingHour =
            timingHour -
            timing.timezoneOffsetInHours +
            everyHourReminderInterval;

          if (newPreTimingHour < 0) {
            newPreTimingHour += 24;
          } else if (newPreTimingHour >= 24) {
            newPreTimingHour -= 24;
          }
          if (newPostTimingHour < 0) {
            newPostTimingHour += 24;
          } else if (newPostTimingHour >= 24) {
            newPostTimingHour -= 24;
          }

          if (
            currentHour === newPreTimingHour &&
            userNotificationSettings.allowPreSessionReminderNotifications
          ) {
            await sendNotification(
              user.id,
              user.username,
              "preSessionReminder",
              userNotificationSettings.notificationImageUrl,
              userNotificationSettings.notificationStyle
            );
          } else if (currentHour === newPostTimingHour) {
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
