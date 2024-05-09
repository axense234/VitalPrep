// SCSS
import faqStyles from "../../../scss/pages/FAQ.module.scss";
// Types
import FAQPageSection from "@/core/types/FAQPageSection";
// React
import { FC } from "react";
// Components
import FAQAccordion from "./FAQAccordion";

const FAQContentSection: FC<FAQPageSection> = ({
  sectionTitle,
  sectionDescription,
  sectionAccordions,
}) => {
  return (
    <section className={faqStyles.faqContentSection}>
      <h1>{sectionTitle}</h1>
      <p
        className={faqStyles.faqContentSectionParagraph}
        style={{
          color:
            sectionTitle === "Meal Prep Recipes and Ideas"
              ? "#ddd9d5"
              : "#120a06",
        }}
      >
        {sectionDescription}
      </p>
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

export default FAQContentSection;
