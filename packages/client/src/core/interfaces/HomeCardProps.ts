export default interface HomeCardProps {
  title: string;
  information: string;
  type: "introduction" | "generic" | "withLinks";
  withLinksCardReferenceId?: number;
  backgroundColor: string;
}
