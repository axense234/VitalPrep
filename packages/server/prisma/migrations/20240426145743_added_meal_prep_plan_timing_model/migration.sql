/*
  Warnings:

  - You are about to drop the column `instanceTemplatesTimings` on the `MealPrepPlan` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "WeekdayValues" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- AlterTable
ALTER TABLE "MealPrepPlan" DROP COLUMN "instanceTemplatesTimings";

-- CreateTable
CREATE TABLE "MealPrepPlanTiming" (
    "id" TEXT NOT NULL,
    "weekday" "WeekdayValues" NOT NULL,
    "sessionStartingTime" TEXT NOT NULL DEFAULT '12:00',
    "mealPrepPlanId" TEXT,

    CONSTRAINT "MealPrepPlanTiming_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MealPrepPlanTiming" ADD CONSTRAINT "MealPrepPlanTiming_mealPrepPlanId_fkey" FOREIGN KEY ("mealPrepPlanId") REFERENCES "MealPrepPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
