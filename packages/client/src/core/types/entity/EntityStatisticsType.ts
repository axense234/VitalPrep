type EntityStatisticsType = {
  id: number;
  essence: "component" | "usable" | "count";
  entityType: string;
  count: number;
}[];

export default EntityStatisticsType;
