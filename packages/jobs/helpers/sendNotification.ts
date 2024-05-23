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

  const generateMessage = (lang: string) => {
    const messageFunc =
      notificationMessages[typeOfNotification]?.[lang]?.[
        notificationStyle || "default"
      ];
    if (typeOfNotification === "preSessionReminder") {
      return messageFunc(username, everyHourReminderInterval);
    } else {
      return messageFunc(username);
    }
  };

  notificationContents.ro = generateMessage("ro");
  notificationContents.en = generateMessage("en");
  notificationContents.fr = generateMessage("fr");
  notificationContents.de = generateMessage("de");

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: notificationContents,
    include_external_user_ids: [userId],
    chrome_web_image: notificationImageUrl || defaultNotificationImageUrl,
    chrome_web_icon: defaultNotificationImageUrl,
  });
};

export default sendNotification;
