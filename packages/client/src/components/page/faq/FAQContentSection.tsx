// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Types
import FAQPageSection from "@/core/types/FAQPageSection";
// React
import { FC } from "react";
// Components
import FAQAccordion from "./FAQAccordion";
// Translations
import { useTranslations } from "next-intl";

const FAQContentSection: FC<FAQPageSection> = ({ sectionAccordions, id }) => {
  const translateFAQ = useTranslations(`faq.sections.${id}`);
  return (
    <section className={faqStyles.faqContentSection}>
      <h1>{translateFAQ("sectionTitle")}</h1>
      <p
        className={faqStyles.faqContentSectionParagraph}
        style={{
          color: id === 3 ? "#ddd9d5" : "#120a06",
        }}
      >
        {translateFAQ("sectionDescription")}
      </p>
      <ul className={faqStyles.faqContentSectionAccordions}>
        {sectionAccordions.map((sectionAccordion) => {
          return (
            <li key={sectionAccordion.id}>
              <FAQAccordion
                accordionContent={translateFAQ(
                  `sectionAccordions.${sectionAccordion.id}.accordionContent`
                )}
                accordionTitle={translateFAQ(
                  `sectionAccordions.${sectionAccordion.id}.accordionTitle`
                )}
                id={sectionAccordion.id}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default FAQContentSection;
