type SectionItemType = {
  id: number;
  imageSrc: string;
  itemTitle: string;
  itemDescription: string;
};

interface HomeSectionContentProps {
  sectionTitle: string;
  sectionSubTitle: string;
  ctaButtonContent?: string;
  position: "left" | "right";
  type: "positional" | "middle" | "descriptionBased";

  backgroundImageSrc?: string;
  contentBackgroundImageSrc?: string;
  sectionDescription?: string;
  sectionItems?: SectionItemType[];
}

export default HomeSectionContentProps;