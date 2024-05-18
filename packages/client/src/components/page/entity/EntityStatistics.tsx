// Types
import EntityStatisticsType from "@/core/types/entity/EntityStatisticsType";
// SCSS
import entityStatisticsStyles from "@/scss/components/shared/EntityStatistics.module.scss";
// React
import { FC } from "react";
// Translations
import { useTranslations } from "next-intl";

const EntityStatistics: FC<{ statistics: EntityStatisticsType }> = ({
  statistics,
}) => {
  const translate = useTranslations("entityStatistics");
  const translateEntityType = useTranslations("multiViewPage.entitiesTitle");

  return (
    <div className={entityStatisticsStyles.entityStatisticsContainer}>
      <h4>{translate("title")}</h4>
      <ul className={entityStatisticsStyles.entityStatisticsList}>
        {statistics.map((stat) => {
          const prefix = translate(`prefix.${stat.essence}`);
          if (stat.essence === "count") {
            return (
              <li key={stat.id}>
                {prefix}
                <span>{translateEntityType(stat.entityType)}</span>:{" "}
                {stat.count || 0}
              </li>
            );
          }
          return (
            <li key={stat.id}>
              {`${prefix}${stat.count} `}
              <span>{translateEntityType(stat.entityType)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityStatistics;
