import * as OneSignal from "onesignal-node";
import {
  defaultNotificationImageUrl,
  everyHourReminderInterval,
  notificationMessages,
} from "../data/data";

const sendNotification = async (
  userId: string,
  username: string,
  typeOfNotification:
    | "dayReminder"
    | "preSessionReminder"
    | "postSessionReminder",
  notificationImageUrl?: string,
  notificationStyle?: "default" | "serious" | "motivating" | "menacing"
) => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID as string,
    process.env.ONE_SIGNAL_REST_API_KEY as string
  );

  const notificationContents: {
    en: string;
    ro: string;
    fr: string;
    de: string;
  } = {
    en: "",
    ro: "",
    fr: "",
    de: "",
  };

  notificationContents.ro = notificationMessages[typeOfNotification].ro[
    notificationStyle || "default"
  ](username, everyHourReminderInterval);
  notificationContents.en = notificationMessages[typeOfNotification].en[
    notificationStyle || "default"
  ](username, everyHourReminderInterval);
  notificationContents.fr = notificationMessages[typeOfNotification].fr[
    notificationStyle || "default"
  ](username, everyHourReminderInterval);
  notificationContents.de = notificationMessages[typeOfNotification].de[
    notificationStyle || "default"
  ](username, everyHourReminderInterval);

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: notificationContents,
    include_external_user_ids: [userId],
    chrome_web_image: notificationImageUrl || defaultNotificationImageUrl,
    chrome_web_icon: defaultNotificationImageUrl,
  });
};

export default sendNotification;
