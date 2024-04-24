"use client";

// SCSS
import gettingStartedStyles from "../../../scss/pages/GettingStarted.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import GettingStartedContent from "@/components/page/guide/GettingStartedContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const GettingStarted = () => {
  useAuthorization();

  return (
    <div className={gettingStartedStyles.gettingStartedContainer}>
      <PageTitle
        titleContent="Getting Started"
        subtitleContent="a simple guide to meal prepping"
      />
      <GettingStartedContent />
    </div>
  );
};

export default GettingStarted;
