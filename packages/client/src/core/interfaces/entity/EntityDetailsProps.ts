import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import EntityType from "@/core/types/entity/users/EntityType";

interface EntityDetailsProps {
  type: "preview" | "view";
  entityType: EntityType;
  entity: EntityTemplateType;
  entityId?: string;
}

export default EntityDetailsProps;
