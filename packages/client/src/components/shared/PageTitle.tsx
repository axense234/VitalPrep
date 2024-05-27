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
// Next
import { useSearchParams } from "next/navigation";

const PageTitle: FC<PageTitleProps> = ({
  titleContent,
  subtitleContent,
  backgroundImageSrc,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("edit");

  let curatedPathname = pathname;
  const indexOfSecondSlash = pathname.indexOf("/", 1);
  if (indexOfSecondSlash !== -1) {
    curatedPathname = pathname.substring(0, indexOfSecondSlash) as any;
  }

  const translate = useTranslations("pageTitles.titles");

  const { imageSrc } = getPageTitlePropsBasedOnPathname(curatedPathname);

  const titleTextContent = editMode
    ? translate(`${curatedPathname}.editMode.titleTextContent`)
    : translate(`${curatedPathname}.titleTextContent`);

  const subTitleTextContent = editMode
    ? translate(`${curatedPathname}.editMode.subtitleTextContent`)
    : translate(`${curatedPathname}.subTitleTextContent`);

  return (
    <section
      className={pageTitleStyles.pageTitleContainer}
      style={{ backgroundImage: `url(${backgroundImageSrc || imageSrc})` }}
    >
      <div className={pageTitleStyles.pageTitleContainer__header}>
        <h1>{titleContent || titleTextContent}</h1>
        <h3>{subtitleContent || subTitleTextContent}</h3>
      </div>
    </section>
  );
};

export default PageTitle;
