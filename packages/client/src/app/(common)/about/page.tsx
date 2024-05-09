"use client";
// SCSS
import aboutStyles from "../../../scss/pages/About.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import AboutContent from "@/components/page/about/AboutContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const About = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/about");

  return (
    <div className={aboutStyles.aboutContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <AboutContent />
    </div>
  );
};

export default About;
