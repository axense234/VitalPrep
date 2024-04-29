// One Signal
import * as OneSignal from "onesignal-node";
// Axios
import axios from "axios";
// DOTENV
import * as dotenv from "dotenv";
dotenv.config();

const sendNotification = async () => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID,
    process.env.ONE_SIGNAL_REST_API_KEY
  );

  const notification = await oneSignalClient.createNotification({
    contents: { en: "T5" },
    included_segments: ["All"],
  });
  console.log(notification);
};

sendNotification();
