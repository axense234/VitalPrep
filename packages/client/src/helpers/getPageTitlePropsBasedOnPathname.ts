import { pageTitleContent } from "@/data";

const getPageTitlePropsBasedOnPathname = (pathname: string) => {
  const { backgroundImageSrc } =
    pageTitleContent.find((pageTitle) =>
      pageTitle.specificPagePath.startsWith(pathname)
    ) || pageTitleContent[0];
  return {
    imageSrc: backgroundImageSrc,
  };
};

export default getPageTitlePropsBasedOnPathname;
