import EntityTemplateType from "@/core/types/entity/EntityTemplateType";

interface EntityComponentProps {
  clicked: boolean;
  entityId: string;
  entity?: EntityTemplateType;
  isALink?: boolean;
  hasEntityMutationMenu?: boolean;
  deleteEntityFunction?: any;
  updateEntityFunction?: any;
}
export default EntityComponentProps;
