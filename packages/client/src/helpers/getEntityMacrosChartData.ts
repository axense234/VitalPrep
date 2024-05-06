// ChartJS
import { ChartData } from "chart.js";
// Types
import { Macros } from "@prisma/client";

const getEntityMacrosChartData = (chartData: Macros): ChartData<"pie"> => {
  const totalGrams =
    chartData.proteinAmount + chartData.carbsAmount + chartData.fatsAmount;
  const proteinAmountProcentage = (chartData.proteinAmount / totalGrams) * 100;
  const carbsAmountProcentage = (chartData.carbsAmount / totalGrams) * 100;
  const fatsAmountProcentage = (chartData.fatsAmount / totalGrams) * 100;

  return {
    labels: ["Grams of Protein", "Grams of Carbs", "Grams of Fats"],
    datasets: [
      {
        label: "Procentage",
        data: [
          proteinAmountProcentage || 0,
          carbsAmountProcentage || 0,
          fatsAmountProcentage || 0,
        ],
        borderColor: "black",
        backgroundColor: ["#8b0000", "#432517", "#ffae00"],
      },
    ],
  };
};

export default getEntityMacrosChartData;
