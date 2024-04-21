"use client";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// SCSS
import createLogStyles from "../../../scss/pages/CreateLog.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import CreateLogContent from "@/components/page/create-log/CreateLogContent";

const CreateLog = () => {
  useAuthorization();
  return (
    <div className={createLogStyles.createLogContainer}>
      <PageTitle
        titleContent="Add Log"
        subtitleContent="log your meal prep session"
      />
      <CreateLogContent />
    </div>
  );
};

export default CreateLog;
