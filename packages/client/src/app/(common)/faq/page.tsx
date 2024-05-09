"use client";
// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import FAQContent from "@/components/page/faq/FAQContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// Helpers
import getPageTitlePropsBasedOnPathname from "@/helpers/getPageTitlePropsBasedOnPathname";

const FAQ = () => {
  useAuthorization();

  const { backgroundImageSrc, pageSubTitleContent, pageTitleTextContent } =
    getPageTitlePropsBasedOnPathname("/faq");

  return (
    <div className={faqStyles.faqContainer}>
      <PageTitle
        titleContent={pageTitleTextContent}
        subtitleContent={pageSubTitleContent}
        backgroundImageSrc={backgroundImageSrc}
      />
      <FAQContent />
    </div>
  );
};

export default FAQ;
