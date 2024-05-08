"use client";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// SCSS
import settingsStyles from "../../../scss/pages/Settings.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
// Components
import SettingsContent from "@/components/page/settings/SettingsContent";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const Settings = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/settings");

  return (
    <div className={settingsStyles.settingsContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <SettingsContent />
    </div>
  );
};

export default Settings;
