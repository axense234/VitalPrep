// One Signal
import * as OneSignal from "onesignal-node";
// Axios
import axios from "axios";
// DOTENV
import * as dotenv from "dotenv";
dotenv.config();

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.SERVER_SITE_URL}/users?uniqueIdentifier=${process.env.ADMIN_USE_UNIQUE_IDENTIFIER}`,
      {
        withCredentials: true,
      }
    );
    return data.users;
  } catch (error) {
    console.log(error);
  }
};

const sendNotification = async (userId, username) => {
  const oneSignalClient = new OneSignal.Client(
    process.env.ONE_SIGNAL_APP_ID as string,
    process.env.ONE_SIGNAL_REST_API_KEY as string
  );

  console.log(userId, username);

  await oneSignalClient.createNotification({
    contents: { en: `T7 - EN - ${username}`, ro: `T7 - RO - ${username}` },
    include_external_user_ids: [userId],
  });
};

const handleMealPrepSessionReminders = async () => {
  const users = await getAllUsers();

  users.forEach(async (user) => {
    await sendNotification(user.id, user.username);
  });
};

handleMealPrepSessionReminders();
