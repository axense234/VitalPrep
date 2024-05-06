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

const EntityMacros: FC<{ macros: Macros }> = ({ macros }) => {
  if (!macros || macros.calories === 0) {
    return (
      <div className={macrosGraphStyles.lineGraphContainer}>
        <h6>No macros to display.</h6>
      </div>
    );
  }

  return (
    <div className={macrosGraphStyles.lineGraphContainer}>
      <h4>Macros</h4>
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
