// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Types
import FAQAccordionType from "@/core/types/FAQAccordion";
// React
import { FC, useState } from "react";
// React Icons
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQAccordion: FC<FAQAccordionType> = ({
  accordionTitle,
  accordionContent,
}) => {
  const [showAccordionContent, setShowAccordionContent] =
    useState<boolean>(false);

  return (
    <div className={faqStyles.faqAccordionContainer}>
      <header className={faqStyles.faqAccordionHeader}>
        {!showAccordionContent ? (
          <FaPlus
            title={`Show ${accordionTitle} Content`}
            aria-label={`Show ${accordionTitle} Content`}
            onClick={() => setShowAccordionContent(true)}
          />
        ) : (
          <FaMinus
            title={`Hide ${accordionTitle} Content`}
            aria-label={`Hide ${accordionTitle} Content`}
            onClick={() => setShowAccordionContent(false)}
          />
        )}
        <h3>{accordionTitle}</h3>
      </header>
      <div
        className={faqStyles.faqAccordionContent}
        style={{
          height: showAccordionContent
            ? `${accordionContent.length / 3 + 40}px `
            : "0rem",
        }}
      >
        <p>{accordionContent}</p>
      </div>
    </div>
  );
};

export default FAQAccordion;
