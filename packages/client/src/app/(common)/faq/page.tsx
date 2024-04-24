"use client";
// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import FAQContent from "@/components/page/faq/FAQContent";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";

const FAQ = () => {
  useAuthorization();

  return (
    <div className={faqStyles.faqContainer}>
      <PageTitle
        titleContent="FAQ"
        subtitleContent="frequently asked questions"
      />
      <FAQContent />
    </div>
  );
};

export default FAQ;
