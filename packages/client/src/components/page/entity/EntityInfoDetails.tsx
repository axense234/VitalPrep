// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Types
import EntityType from "@/core/types/entity/EntityType";
// Next
import Image from "next/image";
// Redux
import { useAppSelector } from "@/hooks/redux";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Data
import { defaultIngredientImageUrl } from "@/data";
// Types
import IngredientTemplate from "@/core/types/entity/mutation/IngredientTemplate";
// Pie Chart
import EntityMacrosPieGraph from "@/components/shared/entity/EntityMacrosPieGraph";

const EntityInfoDetails: FC<{ entityId: string; entityType: EntityType }> = ({
  entityId,
  entityType,
}) => {
  let entityInfoDetailsShown = null;
  const entity = useAppSelector((state) =>
    selectEntityById(state, entityId, entityType)
  );

  switch (entityType) {
    case "ingredient":
      entityInfoDetailsShown = (
        <div className={entityInfoStyles.entityInfoDetailsContainer}>
          <Image
            width={640}
            height={640}
            src={entity?.imageUrl || defaultIngredientImageUrl}
            alt={entity?.name || "Ingredient Image"}
            aria-label={entity?.name || "Ingredient Image"}
          />
          <header className={entityInfoStyles.entityInfoDetailsHeader}>
            <h2>{entity?.name || "Ingredient Name"}</h2>
            <h3>
              {(entity as IngredientTemplate)?.macros?.calories
                ? `${(entity as IngredientTemplate)?.macros?.calories} calories`
                : "??? calories"}
            </h3>
            <h3>
              {(entity as IngredientTemplate)?.enabled ? "ENABLED" : "DISABLED"}
            </h3>
          </header>
          <EntityMacrosPieGraph
            macros={(entity as IngredientTemplate)?.macros}
          />
        </div>
      );
      break;
    default:
      break;
  }

  return entityInfoDetailsShown;
};

export default EntityInfoDetails;
