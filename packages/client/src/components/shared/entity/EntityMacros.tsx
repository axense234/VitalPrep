// Types
import { Macros } from "@prisma/client";
// SCSS
import macrosGraphStyles from "../../../scss/components/shared/EntityMacros.module.scss";
// Helpers
import getEntityMacrosChartData from "@/helpers/getEntityMacrosChartData";
// React
import { FC } from "react";
// ChartJS
import { Pie } from "react-chartjs-2";
import { useTranslations } from "next-intl";

const EntityMacros: FC<{ macros: Macros }> = ({ macros }) => {
  const translate = useTranslations("entityPreview.entityMacros");

  if (!macros || macros.calories === 0) {
    return (
      <div className={macrosGraphStyles.lineGraphContainer}>
        <h6>{translate("noMacrosMessage")}</h6>
      </div>
    );
  }

  return (
    <div className={macrosGraphStyles.lineGraphContainer}>
      <h4>{translate("macrosTitle")}</h4>
      <Pie
        data={getEntityMacrosChartData(macros)}
        className={macrosGraphStyles.lineGraph}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default EntityMacros;
