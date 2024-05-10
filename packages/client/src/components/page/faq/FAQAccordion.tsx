// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Types
import FAQAccordionType from "@/core/types/FAQAccordion";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
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

  let windowWidth = useGetWindowWidth();
  let accordionContentHeightDividerValue = 4;
  if (windowWidth <= 1200) {
    accordionContentHeightDividerValue = 3;
  }
  if (windowWidth <= 1000) {
    accordionContentHeightDividerValue = 2;
  }
  if (windowWidth <= 775) {
    accordionContentHeightDividerValue = 1.5;
  }

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
        <h5>{accordionTitle}</h5>
      </header>
      <div
        className={faqStyles.faqAccordionContent}
        style={{
          height: showAccordionContent
            ? `${accordionContent.length / accordionContentHeightDividerValue + 40}px `
            : "0rem",
        }}
      >
        <p>{accordionContent}</p>
      </div>
    </div>
  );
};

export default FAQAccordion;
