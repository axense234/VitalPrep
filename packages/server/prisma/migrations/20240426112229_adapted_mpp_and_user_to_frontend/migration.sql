/*
  Warnings:

  - You are about to drop the column `activated` on the `MealPrepPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MealPrepPlan" DROP COLUMN "activated";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mealPrepPlanInUseId" TEXT NOT NULL DEFAULT '';
