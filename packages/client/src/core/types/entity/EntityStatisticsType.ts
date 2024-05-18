import EntityType from "./users/EntityType";

type EntityStatisticsType = {
  id: number;
  essence: "component" | "usable" | "count";
  entityType: EntityType;
  count: number;
}[];

export default EntityStatisticsType;
