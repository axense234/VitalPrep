// Types
import EntityStatisticsType from "@/core/types/entity/EntityStatisticsType";
// SCSS
import entityStatisticsStyles from "../../../scss/components/shared/EntityStatistics.module.scss";
// React
import { FC } from "react";

const EntityStatistics: FC<{ statistics: EntityStatisticsType }> = ({
  statistics,
}) => {
  const chooseEntityStatPrefix = (
    essence: "usable" | "component" | "count"
  ) => {
    switch (essence) {
      case "usable":
        return "Used in ";
      case "component":
        return "Uses ";
      case "count":
        return "Number of ";
      default:
        return "Used in ";
    }
  };

  return (
    <div className={entityStatisticsStyles.entityStatisticsContainer}>
      <h4>Statistics</h4>
      <ul className={entityStatisticsStyles.entityStatisticsList}>
        {statistics.map((stat) => {
          const prefix = chooseEntityStatPrefix(stat.essence);
          if (prefix === "Number of ") {
            return (
              <li key={stat.id}>
                {prefix}
                <span>{`${stat.entityType}`}</span>: {stat.count || 0}
              </li>
            );
          }
          return (
            <li key={stat.id}>
              {`${prefix}${stat.count} `}
              <span>{`${stat.entityType}`}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityStatistics;
