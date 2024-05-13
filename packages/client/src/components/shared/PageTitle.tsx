// Types
import PageTitleProps from "@/core/interfaces/PageTitleProps";
// React
import { FC } from "react";
// SCSS
import pageTitleStyles from "../../scss/components/shared/PageTitle.module.scss";
// Next
import { usePathname } from "next/navigation";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const PageTitle: FC<PageTitleProps> = ({
  titleContent,
  subtitleContent,
  backgroundImageSrc,
}) => {
  const pathname = usePathname();
  const { imageSrc, subtitleTextContent, titleTextContent } =
    getPageTitlePropsBasedOnPathname(pathname);

  return (
    <section
      className={pageTitleStyles.pageTitleContainer}
      style={{ backgroundImage: `url(${backgroundImageSrc || imageSrc})` }}
    >
      <div className={pageTitleStyles.pageTitleContainer__header}>
        <h1>{titleContent || titleTextContent}</h1>
        <h3>{subtitleContent || subtitleTextContent}</h3>
      </div>
    </section>
  );
};

export default PageTitle;
