"use client";

// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolOptions from "@/components/page/create-tool/CreateToolOptions";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";

const CreateTool = () => {
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
