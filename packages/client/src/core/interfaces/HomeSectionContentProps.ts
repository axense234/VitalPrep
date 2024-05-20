type SectionItemType = {
  id: number;
  imageSrc: string;
  itemTitle: string;
  itemDescription: string;
};

interface HomeSectionContentProps {
  id: number;
  sectionTitle: string;
  sectionSubTitle: string;
  ctaButtonContent?: string;
  ctaButtonLinkDest?: string;
  position: "left" | "right";
  type: "positional" | "middle" | "descriptionBased" | "imageBased";
  sectionPaddingBasedOnWindowWidth: string;
  tabletAndPhoneRedesign: boolean;

  sectionImage?: string;
  backgroundImageSrc?: string;
  contentBackgroundImageSrc?: string;
  sectionDescription?: string;
  sectionDescriptions?: { id: number; stringValue: string }[];
  sectionItems?: SectionItemType[];
}

export default HomeSectionContentProps;
