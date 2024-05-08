// React
import { FC } from "react";
// SCSS
import entityInfoStyles from "../../../scss/components/page/EntityInfo.module.scss";
// Helpers
import selectEntityById from "@/helpers/selectEntityById";
// Redux
import { useAppSelector } from "@/hooks/redux";
import { State } from "@/redux/api/store";
// Types
import MealPrepLogTemplate from "@/core/types/entity/mutation/MealPrepLogTemplate";
// Components
import EntityCard from "@/components/shared/entity/EntityCard";
import EntityMacros from "@/components/shared/entity/EntityMacros";

const EntityInfoInstanceTemplate: FC<{ entityId: string }> = ({ entityId }) => {
  const entityThatHasAInstanceTemplate = useAppSelector((state: State) =>
    selectEntityById(state, entityId, "mealPrepLog")
  ) as MealPrepLogTemplate;

  const entityInstanceTemplate =
    entityThatHasAInstanceTemplate?.instanceTemplate;

  return (
    <div className={entityInfoStyles.entityInfoInstanceTemplateContainer}>
      <h4>
        Instance Template used by{" "}
        {entityThatHasAInstanceTemplate?.name || "Entity Example"}
      </h4>
      <div
        className={entityInfoStyles.entityInfoInstanceTemplateContainerContent}
      >
        <EntityCard
          entity={entityInstanceTemplate}
          entityId={entityId}
          entityType="instanceTemplate"
          isALink={true}
          size="large"
        />
        <EntityMacros macros={entityInstanceTemplate?.macros} />
      </div>
    </div>
  );
};

export default EntityInfoInstanceTemplate;
