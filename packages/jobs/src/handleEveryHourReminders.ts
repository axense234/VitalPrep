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

    const mealPrepPlanInstanceTemplates = userMealPrepPlan.instanceTemplates;

    console.log(mealPrepPlanInstanceTemplates);

    console.log(mealPrepPlanInstanceTemplatesTimings);

    mealPrepPlanInstanceTemplatesTimings.forEach(async (timing, index) => {
      const currentDayOfTheWeekIndex = new Date().getDay();
      const currentDayOfTheWeekString = days[currentDayOfTheWeekIndex];

      console.count(`${currentDayOfTheWeekString}, ${timing.weekday}`);
      if (currentDayOfTheWeekString === timing.weekday) {
        const currentHour = new Date().getHours();
        const timingHour = Number(timing.sessionStartingTime.slice(0, 2));
        console.log(currentHour, timingHour);

        if (currentHour === timingHour - everyHourReminderInterval) {
          await sendNotification(
            user.id,
            user.username,
            "preSessionReminder",
            mealPrepPlanInstanceTemplates[0]?.id
          );
        } else if (currentHour === timingHour + everyHourReminderInterval) {
          await sendNotification(
            user.id,
            user.username,
            "postSessionReminder",
            mealPrepPlanInstanceTemplates[0]?.id
          );
        }
      }
    });
  });
};

handleEveryHourReminders();
