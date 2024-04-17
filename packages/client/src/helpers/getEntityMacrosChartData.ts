// ChartJS
import { ChartData } from "chart.js";
// Types
import { Macros } from "@prisma/client";

const getEntityMacrosChartData = (
  chartData: Macros,
  labelSize: number
): ChartData<"pie"> => {
  return {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        datalabels: {
          color: "white",
          font: { size: labelSize },
          formatter: (value, ctx) => {
            const dataset = ctx.chart.data.datasets[ctx.datasetIndex];
            const total = dataset.data.reduce(
              (acc, data) => ((acc as number) || 0) + ((data as number) || 0),
              0
            );
            const percentage = ((value / (total as number)) * 100).toFixed(2);
            const label = (ctx.chart.data.labels as string[])[ctx.dataIndex];

            return `${percentage}% ${label.toLowerCase()}`;
          },
        },
        label: "Grams",
        data: [
          chartData?.proteinAmount || 0,
          chartData?.carbsAmount || 0,
          chartData?.fatsAmount || 0,
        ],
        backgroundColor: ["#432517", "#42171c", "#ff6000"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
};

export default getEntityMacrosChartData;
