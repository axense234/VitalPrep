"use client";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// SCSS
import createToolStyles from "../../../scss/pages/CreateTool.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateToolInterface from "@/components/page/create-tool/CreateToolInterface";

const CreateLog = () => {
  useAuthorization();

  return (
    <div className={createToolStyles.createToolContainer}>
      <PageTitle />
      <div className={createToolStyles.createToolContent}>
        <CreateToolInterface forcedSelectedEntityOption="mealPrepLog" />
      </div>
    </div>
  );
};

export default CreateLog;
