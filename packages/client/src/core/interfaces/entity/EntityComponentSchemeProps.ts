import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import EntityType from "@/core/types/entity/users/EntityType";

type EntityComponentSchemeProps = {
  isALink: boolean;
  clicked: boolean;
  entityId: string;
  selectedViewOption?: "grid" | "list";
  entityType: EntityType;
  entity?: EntityTemplateType;
};

export default EntityComponentSchemeProps;
