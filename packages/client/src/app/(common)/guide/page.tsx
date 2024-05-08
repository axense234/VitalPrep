"use client";

// SCSS
import gettingStartedStyles from "../../../scss/pages/GettingStarted.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import GettingStartedContentMap from "@/components/page/guide/GettingStartedContentMap";
import GettingStartedContent from "@/components/page/guide/GettingStartedContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const GettingStarted = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/guide");

  return (
    <div className={gettingStartedStyles.gettingStartedContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <div className={gettingStartedStyles.gettingStartedContent}>
        <GettingStartedContentMap />
        <GettingStartedContent />
      </div>
    </div>
  );
};

export default GettingStarted;
