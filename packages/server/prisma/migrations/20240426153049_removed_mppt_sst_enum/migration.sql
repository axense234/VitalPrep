/*
  Warnings:

  - Changed the type of `weekday` on the `MealPrepPlanTiming` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MealPrepPlanTiming" DROP COLUMN "weekday",
ADD COLUMN     "weekday" TEXT NOT NULL;

-- DropEnum
DROP TYPE "WeekdayValues";
