import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import EntityType from "@/core/types/entity/users/EntityType";
import UserType from "@/core/types/entity/users/UserType";

type EntityComponentSchemeProps = {
  isALink: boolean;
  clicked: boolean;
  entityId: string;
  selectedViewOption?: "grid" | "list";
  entityType: EntityType;
  entity?: EntityTemplateType;
  hasEntityMutationMenu?: boolean;
  profile?: UserType;
};

export default EntityComponentSchemeProps;
