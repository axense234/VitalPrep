// SCSS
import faqStyles from "@/scss/pages/FAQ.module.scss";
// Types
import FAQAccordionType from "@/core/types/FAQAccordion";
import useGetWindowWidth from "@/hooks/useGetWindowWidth";
// React
import { FC, useState } from "react";
// React Icons
import { FaPlus, FaMinus } from "react-icons/fa";
// Translations
import { useTranslations } from "next-intl";

const FAQAccordion: FC<FAQAccordionType> = ({
  accordionTitle,
  accordionContent,
}) => {
  const translate = useTranslations("faq");
  const [showAccordionContent, setShowAccordionContent] =
    useState<boolean>(false);

  let windowWidth = useGetWindowWidth();
  let accordionContentHeightDividerValue = 4;
  if (windowWidth && windowWidth <= 1200) {
    accordionContentHeightDividerValue = 3;
  }
  if (windowWidth && windowWidth <= 1000) {
    accordionContentHeightDividerValue = 2;
  }
  if (windowWidth && windowWidth <= 775) {
    accordionContentHeightDividerValue = 1.5;
  }

  return (
    <div className={faqStyles.faqAccordionContainer}>
      <header className={faqStyles.faqAccordionHeader}>
        {!showAccordionContent ? (
          <FaPlus
            title={translate("accordionShowTitle", { title: accordionTitle })}
            aria-label={translate("accordionShowTitle", {
              title: accordionTitle,
            })}
            onClick={() => setShowAccordionContent(true)}
          />
        ) : (
          <FaMinus
            title={translate("accordionHideTitle", { title: accordionTitle })}
            aria-label={translate("accordionHideTitle", {
              title: accordionTitle,
            })}
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
