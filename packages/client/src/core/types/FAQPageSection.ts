import FAQAccordionType from "./FAQAccordion";

type FAQPageSection = {
  id: number;
  sectionTitle: string;
  sectionDescription: string;
  sectionAccordions: FAQAccordionType[];
};

export default FAQPageSection;
