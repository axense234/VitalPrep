// One Signal Notifications
import OneSignal from "react-onesignal";

const initializeOneSignal = async () => {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID as string,
    allowLocalhostAsSecureOrigin:
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test",
    notifyButton: { enable: true },
  });
};

export default initializeOneSignal;
