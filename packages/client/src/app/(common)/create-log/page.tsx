"use client";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";
// Data
import { pageTitleContent } from "@/data";

const CreateLog = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    pageTitleContent.find(
      (pageTitle) => pageTitle.specificPagePath === "/create-log"
    ) || pageTitleContent[0];

  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <div className={createToolStyles.createToolContent}>
        <CreateToolInterface forcedSelectedEntityOption="mealPrepLog" />
      </div>
    </div>
  );
};

export default CreateLog;
