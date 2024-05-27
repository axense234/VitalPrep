/*
  Warnings:

  - You are about to drop the column `enabled` on the `Ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `enabled` on the `Utensil` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "enabled";

-- AlterTable
ALTER TABLE "Utensil" DROP COLUMN "enabled";
