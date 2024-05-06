"use client";

// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";
import EntityTypeMenu from "@/components/shared/entity/EntityTypeMenu";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Data
import { pageTitleContent } from "@/data";

const CreateTool = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    pageTitleContent.find(
      (pageTitle) => pageTitle.specificPagePath === "/create-tool"
    ) || pageTitleContent[0];

  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <EntityTypeMenu />
      <div className={createToolStyles.createToolContent}>
        <CreateToolInterface />
      </div>
    </div>
  );
};

export default CreateTool;
