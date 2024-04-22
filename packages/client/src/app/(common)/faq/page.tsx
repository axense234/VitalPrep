"use client";
// Types
import FAQAccordionType from "@/core/types/FAQAccordion";
// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Components
import PageTitle from "@/components/shared/PageTitle";
import FAQPageSection from "@/core/types/FAQPageSection";
import { faqPageContent } from "@/data";
// Hooks
import useAuthorization from "@/hooks/useAuthorization";
// React
import { FC, useState } from "react";
// React Icons
import { FaMinus, FaPlus } from "react-icons/fa";

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

const FAQContent = () => {
  return (
    <div className={faqStyles.faqContent}>
      {faqPageContent.map((faqSection) => {
        return <FAQContentSection {...faqSection} key={faqSection.id} />;
      })}
    </div>
  );
};

const FAQContentSection: FC<FAQPageSection> = ({
  sectionTitle,
  sectionDescription,
  sectionAccordions,
}) => {
  return (
    <section className={faqStyles.faqContentSection}>
      <h1>{sectionTitle}</h1>
      <p>{sectionDescription}</p>
      <ul className={faqStyles.faqContentSectionAccordions}>
        {sectionAccordions.map((sectionAccordion) => {
          return (
            <li key={sectionAccordion.id}>
              <FAQAccordion {...sectionAccordion} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

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

export default FAQ;
