import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import EntityType from "@/core/types/entity/users/EntityType";

interface EntityCardProps {
  isALink: boolean;
  size: "large" | "medium";
  entityType: EntityType;
  entity: EntityTemplateType;
  entityId?: string;
  hasEntityMutationMenu?: boolean;
  deleteEntityFunction?: any;
  updateEntityFunction?: any;
}
export default EntityCardProps;
