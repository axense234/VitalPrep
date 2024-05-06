import { Macros } from "@prisma/client";

const calculateEntityMacrosBasedOnComponents = (macros: Macros[]) => {
  const proteinAmount = macros.reduce((totalGrams, { proteinAmount }) => {
    return totalGrams + proteinAmount;
  }, 0);
  const carbsAmount = macros.reduce((totalGrams, { carbsAmount }) => {
    return totalGrams + carbsAmount;
  }, 0);
  const fatsAmount = macros.reduce((totalGrams, { fatsAmount }) => {
    return totalGrams + fatsAmount;
  }, 0);
  const calories = macros.reduce((totalGrams, { calories }) => {
    return totalGrams + calories;
  }, 0);

  console.log(calories);

  return {
    calories: calories,
    fatsAmount: fatsAmount,
    proteinAmount: proteinAmount,
    carbsAmount: carbsAmount,
  } as Macros;
};

export default calculateEntityMacrosBasedOnComponents;
