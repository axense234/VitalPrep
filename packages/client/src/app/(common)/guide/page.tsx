"use client";

// SCSS
import gettingStartedStyles from "../../../scss/pages/GettingStarted.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import GettingStartedContentMap from "@/components/page/guide/GettingStartedContentMap";
import GettingStartedContent from "@/components/page/guide/GettingStartedContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const GettingStarted = () => {
  useAuthorization();

  return (
    <div className={gettingStartedStyles.gettingStartedContainer}>
      <PageTitle />
      <div className={gettingStartedStyles.gettingStartedContent}>
        <GettingStartedContentMap />
        <GettingStartedContent />
      </div>
    </div>
  );
};

export default GettingStarted;
