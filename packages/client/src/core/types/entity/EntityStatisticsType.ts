type EntityStatisticsType = {
  id: number;
  essence: "component" | "usable";
  entityType: string;
  count: number;
}[];

export default EntityStatisticsType;
