// ChartJS
import { ChartData } from "chart.js";
// Types
import { Macros } from "@prisma/client";

const getEntityMacrosChartData = (chartData: Macros): ChartData<"pie"> => {
  return {
    labels: ["Protein", "Carbs", "Fats"],
    datasets: [
      {
        datalabels: {
          color: "white",
          font: { size: 28 },
          formatter: (value, ctx) => {
            const dataset = ctx.chart.data.datasets[ctx.datasetIndex];
            const total = dataset.data.reduce(
              (acc, data) => ((acc as number) || 0) + ((data as number) || 0),
              0
            );
            const percentage = ((value / (total as number)) * 100).toFixed(0);
            return `${percentage}%`;
          },
        },
        label: "Grams",
        data: [
          chartData?.proteinAmount || 0,
          chartData?.carbsAmount || 0,
          chartData?.fatsAmount || 0,
        ],
        backgroundColor: ["#432517", "#42171c", "#ff8c00"],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
};

export default getEntityMacrosChartData;
