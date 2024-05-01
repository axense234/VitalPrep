// Data
import { days, everyHourReminderInterval } from "../data/data";
// DOTENV
import * as dotenv from "dotenv";
// Helpers
import getAllUsers from "../helpers/getAllUsers";
import getUserMealPrepPlan from "../helpers/getUserMealPrepPlan";
import sendNotification from "../helpers/sendNotification";

dotenv.config();

const handleEveryHourReminders = async () => {
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
        const currentHour = new Date().getHours();
        const timingHour = Number(timing.sessionStartingTime.slice(0, 2));
        console.log(currentHour, timingHour);

        if (currentHour === timingHour - everyHourReminderInterval) {
          await sendNotification(user.id, user.username, "preSessionReminder");
        } else if (currentHour === timingHour + everyHourReminderInterval) {
          await sendNotification(user.id, user.username, "postSessionReminder");
        }
      }
    });
  });
};

handleEveryHourReminders();
