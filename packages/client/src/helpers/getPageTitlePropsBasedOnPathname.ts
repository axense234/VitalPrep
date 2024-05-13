import { pageTitleContent } from "@/data";

const getPageTitlePropsBasedOnPathname = (pathname: string) => {
  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    pageTitleContent.find((pageTitle) =>
      pageTitle.specificPagePath.startsWith(pathname)
    ) || pageTitleContent[0];
  return {
    imageSrc: backgroundImageSrc,
    subtitleTextContent: pageSubTitleContent,
    titleTextContent: pageTitleTextContent,
  };
};

export default getPageTitlePropsBasedOnPathname;
