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

  return (
    <div className={faqStyles.faqContainer}>
      <PageTitle />
      <FAQContent />
    </div>
  );
};

export default FAQ;
