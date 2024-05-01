import * as OneSignal from "onesignal-node";
import { everyHourReminderInterval } from "../data/data";

const sendNotification = async (
  userId: string,
  username: string,
  typeOfNotification:
    | "dayReminder"
    | "preSessionReminder"
    | "postSessionReminder"
) => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID as string,
    process.env.ONE_SIGNAL_REST_API_KEY as string
  );

  const notificationContents = {
    en: "",
    ro: "",
  };

  if (typeOfNotification === "dayReminder") {
    notificationContents.en = `${username}, you have a Meal Prep Session to complete today!`;
    notificationContents.ro = `${username}, ai o sesiune de Meal Prep de completat azi!`;
  } else if (typeOfNotification === "preSessionReminder") {
    notificationContents.en = `${username}, you have a Meal Prep Session in ${everyHourReminderInterval} hours!`;
    notificationContents.ro = `${username}, ai o sesiune de Meal Prep in ${everyHourReminderInterval} ore!`;
  } else if (typeOfNotification === "postSessionReminder") {
    notificationContents.en = `${username}, did you complete your Meal Prep Session?`;
    notificationContents.ro = `${username}, ti-ai terminat sesiunea de Meal Prep?!`;
  }

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: notificationContents,
    include_external_user_ids: [userId],
  });
};

export default sendNotification;
