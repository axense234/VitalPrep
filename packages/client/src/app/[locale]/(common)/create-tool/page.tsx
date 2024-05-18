"use client";

// SCSS
import createToolStyles from "@/scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";
import EntityTypeMenu from "@/components/shared/entity/EntityTypeMenu";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const CreateTool = () => {
  useAuthorization();

  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle />
      <EntityTypeMenu />
      <div className={createToolStyles.createToolContent}>
        <CreateToolInterface />
      </div>
    </div>
  );
};

export default CreateTool;
