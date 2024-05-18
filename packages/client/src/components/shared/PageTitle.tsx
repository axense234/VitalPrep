// Types
import PageTitleProps from "@/core/interfaces/PageTitleProps";
// React
import { FC } from "react";
// SCSS
import pageTitleStyles from "@/scss/components/shared/PageTitle.module.scss";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";
// Translations
import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";

const PageTitle: FC<PageTitleProps> = ({
  titleContent,
  subtitleContent,
  backgroundImageSrc,
}) => {
  const pathname = usePathname();
  let curatedPathname = pathname;
  const indexOfSecondSlash = pathname.indexOf("/", 1);
  if (indexOfSecondSlash !== -1) {
    curatedPathname = pathname.substring(0, indexOfSecondSlash) as any;
  }

  const translate = useTranslations("pageTitles.titles");

  const { imageSrc } = getPageTitlePropsBasedOnPathname(curatedPathname);

  return (
    <section
      className={pageTitleStyles.pageTitleContainer}
      style={{ backgroundImage: `url(${backgroundImageSrc || imageSrc})` }}
    >
      <div className={pageTitleStyles.pageTitleContainer__header}>
        <h1>
          {titleContent || translate(`${curatedPathname}.titleTextContent`)}
        </h1>
        <h3>
          {subtitleContent ||
            translate(`${curatedPathname}.subTitleTextContent`)}
        </h3>
      </div>
    </section>
  );
};

export default PageTitle;
