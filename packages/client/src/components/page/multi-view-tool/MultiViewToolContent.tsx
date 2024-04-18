// SCSS
import multiViewToolStyles from "../../../scss/pages/MultiViewTool.module.scss";
// Components
import EntityComponent from "@/components/shared/entity/EntityComponent";
// React
import { FC } from "react";
// Next
import Link from "next/link";
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedViewOption } from "@/redux/slices/generalSlice";

const MultiViewToolContent: FC<{
  entityType:
    | "ingredient"
    | "utensil"
    | "recipe"
    | "dayTemplate"
    | "instanceTemplate"
    | "mealPrepPlan";
  entityIds: string[] | undefined;
}> = ({ entityType, entityIds }) => {
  let multiViewToolContentTitle = "Ingredients";

  const selectedViewOption = useAppSelector(selectSelectedViewOption);

  switch (entityType) {
    case "ingredient":
      multiViewToolContentTitle = "Ingredients";
      break;
    case "utensil":
      multiViewToolContentTitle = "Utensils";
      break;
    case "recipe":
      multiViewToolContentTitle = "Recipes";
      break;
    case "dayTemplate":
      multiViewToolContentTitle = "Day Templates";
      break;
    case "instanceTemplate":
      multiViewToolContentTitle = "Instance Templates";
      break;
    case "mealPrepPlan":
      multiViewToolContentTitle = "Meal Prep Plans";
      break;
    default:
      break;
  }

  return (
    <div className={multiViewToolStyles.multiViewEntitiesWrapper}>
      <h2>{multiViewToolContentTitle}</h2>
      <ul
        className={multiViewToolStyles.multiViewEntitiesContainer}
        style={{
          flexDirection: selectedViewOption === "grid" ? "row" : "column",
        }}
      >
        {entityIds && entityIds.length > 0 ? (
          entityIds.map((entityId) => {
            return (
              <li
                key={entityId}
                style={{
                  maxWidth: selectedViewOption === "grid" ? "15%" : "100%",
                  width: selectedViewOption === "grid" ? "15%" : "100%",
                }}
              >
                <EntityComponent
                  clicked={true}
                  entityType={entityType}
                  entityId={entityId}
                  isALink={true}
                />
              </li>
            );
          })
        ) : (
          <p className={multiViewToolStyles.multiViewEntitiesNoEntitiesMessage}>
            You have no {multiViewToolContentTitle} available. If you want to
            create some checkout the{" "}
            <Link
              href="/create-tool"
              title="Go to Create Tool Page"
              aria-label="Go to Create Tool Page"
            >
              Create Tool Page
            </Link>
            .
          </p>
        )}
      </ul>
    </div>
  );
};

export default MultiViewToolContent;
