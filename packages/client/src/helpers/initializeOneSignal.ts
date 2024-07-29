// One Signal Notifications
import OneSignal from "react-onesignal";

const initializeOneSignal = async () => {
  await OneSignal.init({
    appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID as string,
    allowLocalhostAsSecureOrigin: process.env.NODE_ENV !== "production",
    notifyButton: { enable: true },
  });
};

const loginOneSignal = async (userId: string) => {
  await OneSignal.login(userId);
};

const logoutOneSignal = async () => {
  await OneSignal.logout();
};

export { loginOneSignal, logoutOneSignal, initializeOneSignal };
