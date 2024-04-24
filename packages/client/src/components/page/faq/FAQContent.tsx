// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Data
import { faqPageContent } from "@/data";
// Components
import FAQContentSection from "./FAQContentSection";

const FAQContent = () => {
  return (
    <div className={faqStyles.faqContent}>
      {faqPageContent.map((faqSection) => {
        return <FAQContentSection {...faqSection} key={faqSection.id} />;
      })}
    </div>
  );
};

export default FAQContent;
