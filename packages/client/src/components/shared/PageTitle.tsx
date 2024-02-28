// Types
import PageTitleProps from "@/core/interfaces/PageTitleProps";
// React
import { FC } from "react";
// SCSS
import pageTitleStyles from "../../scss/components/shared/PageTitle.module.scss";

const PageTitle: FC<PageTitleProps> = ({ titleContent, subtitleContent }) => {
  return (
    <section className={pageTitleStyles.pageTitleContainer}>
      <h1>{titleContent}</h1>
      <h3>{subtitleContent}</h3>
    </section>
  );
};

export default PageTitle;
