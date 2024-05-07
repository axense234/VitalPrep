// Types
import EntityStatisticsType from "@/core/types/entity/EntityStatisticsType";
// SCSS
import entityStatisticsStyles from "../../../scss/components/shared/EntityStatistics.module.scss";
// React
import { FC } from "react";

const EntityStatistics: FC<{ statistics: EntityStatisticsType }> = ({
  statistics,
}) => {
  return (
    <div className={entityStatisticsStyles.entityStatisticsContainer}>
      <h4>Statistics</h4>
      <ul className={entityStatisticsStyles.entityStatisticsList}>
        {statistics.map((stat) => {
          const prefix = stat.essence === "usable" ? "Used in " : "Uses ";
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
