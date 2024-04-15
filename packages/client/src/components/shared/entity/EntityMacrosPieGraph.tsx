// Types
import { Macros } from "@prisma/client";
// SCSS
import pieGraphStyles from "../../../scss/components/shared/EntityMacrosPieGraph.module.scss";
// Helpers
import getEntityMacrosChartData from "@/helpers/getEntityMacrosChartData";
// React
import { FC } from "react";
// ChartJS
import { Pie } from "react-chartjs-2";

const EntityMacrosPieGraph: FC<{ macros: Macros }> = ({ macros }) => {
  return (
    <div className={pieGraphStyles.pieGraphContainer}>
      <Pie
        data={getEntityMacrosChartData(macros || {})}
        className={pieGraphStyles.pieGraph}
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

export default EntityMacrosPieGraph;
