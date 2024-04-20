// SCSS
import settingsContentStyles from "../../../scss/pages/Settings.module.scss";
// Components
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";

const SettingsContent = () => {
  return (
    <div className={settingsContentStyles.settingsContent}>
      <AccountSettings />
      <NotificationSettings />
    </div>
  );
};

export default SettingsContent;
