// One Signal Notifications
import OneSignal from "react-onesignal";

const initializeOneSignal = async () => {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID as string,
    allowLocalhostAsSecureOrigin: true,
    notifyButton: { enable: true },
  });
};

export default initializeOneSignal;
