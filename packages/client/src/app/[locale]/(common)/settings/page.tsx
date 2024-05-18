"use client";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// SCSS
import settingsStyles from "@/scss/pages/Settings.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
// Components
import SettingsContent from "@/components/page/settings/SettingsContent";

const Settings = () => {
  useAuthorization();

  return (
    <div className={settingsStyles.settingsContainer}>
      <PageTitle />
      <SettingsContent />
    </div>
  );
};

export default Settings;
