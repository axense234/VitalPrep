import * as OneSignal from "onesignal-node";
import { everyHourReminderInterval } from "../data/data";

const sendNotification = async (
  userId: string,
  username: string,
  typeOfNotification:
    | "dayReminder"
    | "preSessionReminder"
    | "postSessionReminder",
  instanceTemplateId: string
) => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID as string,
    process.env.ONE_SIGNAL_REST_API_KEY as string
  );

  const notificationContents: {
    en: string;
    ro: string;
  } = {
    en: "",
    ro: "",
  };
  let notificationWebButtons: undefined | any[] = undefined;

  if (typeOfNotification === "dayReminder") {
    notificationContents.en = `${username}, you have a Meal Prep Session to complete today!`;
    notificationContents.ro = `${username}, ai o sesiune de Meal Prep de completat azi!`;
    notificationWebButtons = [
      {
        id: "view-instance-template-button",
        text: "View Template",
        icon: "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_72/v1714586314/VitalPrep/pngtree-vector-information-icon-png-image_925431_ysk97k.jpg",
        url: `${process.env.CLIENT_SITE_URL ? `${process.env.CLIENT_SITE_URL}/instanceTemplate/${instanceTemplateId}` : "http://localhost:3000/instanceTemplate/${instanceTemplateId}"}`,
      },
    ];
  } else if (typeOfNotification === "preSessionReminder") {
    notificationContents.en = `${username}, you have a Meal Prep Session in ${everyHourReminderInterval} hours!`;
    notificationContents.ro = `${username}, ai o sesiune de Meal Prep in ${everyHourReminderInterval} ore!`;
    notificationWebButtons = [
      {
        id: "view-instance-template-button",
        text: "View Template",
        icon: "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_72/v1714586314/VitalPrep/pngtree-vector-information-icon-png-image_925431_ysk97k.jpg",
        url: `${process.env.CLIENT_SITE_URL ? `${process.env.CLIENT_SITE_URL}/instanceTemplate/${instanceTemplateId}` : "http://localhost:3000/instanceTemplate/${instanceTemplateId}"}`,
      },
    ];
  } else if (typeOfNotification === "postSessionReminder") {
    notificationContents.en = `${username}, did you complete your Meal Prep Session?`;
    notificationContents.ro = `${username}, ti-ai terminat sesiunea de Meal Prep?!`;
    notificationWebButtons = [
      {
        id: "completed-meal-prep-session-button",
        text: "Yes",
        icon: "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_72/v1714586907/VitalPrep/12901779_womanf.png",
        url: `do_not_open`,
      },
      {
        id: "uncompleted-meal-prep-session-button",
        text: "No",
        icon: "https://res.cloudinary.com/birthdayreminder/image/upload/c_scale,w_72/v1714586922/VitalPrep/14025328_nrizgn.png",
        url: `do_not_open`,
      },
    ];
  }

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: notificationContents,
    include_external_user_ids: [userId],
    web_buttons: notificationWebButtons,
  });
};

export default sendNotification;
