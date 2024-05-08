type SectionValueType = "basics" | "entities" | "logs" | "extras";

type SubsectionType = {
  orderLetter: string;
  subsectionLabel: string;
  subsectionLinkDest: string;
};

type GettingStartedContentMapContentType = {
  id: number;
  sectionLabel: string;
  sectionContent: SubsectionType[];
  sectionValue: SectionValueType;
}[];

export type { SectionValueType, GettingStartedContentMapContentType };
