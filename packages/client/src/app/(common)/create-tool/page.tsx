"use client";

// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import EntityOptions from "@/components/shared/entity/EntityOptions";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const CreateTool = () => {
  useAuthorization();
  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle
        titleContent="Create Tool"
        subtitleContent="use it to create stuff"
      />
      <div className={createToolStyles.createToolContent}>
        <EntityOptions />
        <CreateToolInterface />
      </div>
    </div>
  );
};

export default CreateTool;
