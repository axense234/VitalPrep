"use client";

// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolOptions from "@/components/page/create-tool/CreateToolOptions";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const CreateTool = () => {
  useAuthorization("common");
  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle
        titleContent="Create Tool"
        subtitleContent="use it to create stuff"
      />
      <div className={createToolStyles.createToolContent}>
        <CreateToolOptions />
        <CreateToolInterface />
      </div>
    </div>
  );
};

export default CreateTool;
