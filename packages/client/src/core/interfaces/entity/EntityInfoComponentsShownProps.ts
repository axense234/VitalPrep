import EntityTemplateType from "@/core/types/entity/EntityTemplateType";
import EntityType from "@/core/types/entity/users/EntityType";

interface EntityInfoComponentsShownProps {
  entitiesLabel: string;
  entityName: string;
  entityType: EntityType;
  entityComponents: EntityTemplateType[];
}
export default EntityInfoComponentsShownProps;
