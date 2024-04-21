-- CreateTable
CREATE TABLE "_MealPrepLogToUtensil" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealPrepLogToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToMealPrepLog" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToMealPrepLog" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealPrepLogToUtensil_AB_unique" ON "_MealPrepLogToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPrepLogToUtensil_B_index" ON "_MealPrepLogToUtensil"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealPrepLogToRecipe_AB_unique" ON "_MealPrepLogToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPrepLogToRecipe_B_index" ON "_MealPrepLogToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToMealPrepLog_AB_unique" ON "_DayTemplateToMealPrepLog"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToMealPrepLog_B_index" ON "_DayTemplateToMealPrepLog"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToMealPrepLog_AB_unique" ON "_IngredientToMealPrepLog"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToMealPrepLog_B_index" ON "_IngredientToMealPrepLog"("B");

-- AddForeignKey
ALTER TABLE "_MealPrepLogToUtensil" ADD CONSTRAINT "_MealPrepLogToUtensil_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPrepLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepLogToUtensil" ADD CONSTRAINT "_MealPrepLogToUtensil_B_fkey" FOREIGN KEY ("B") REFERENCES "Utensil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepLogToRecipe" ADD CONSTRAINT "_MealPrepLogToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPrepLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepLogToRecipe" ADD CONSTRAINT "_MealPrepLogToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToMealPrepLog" ADD CONSTRAINT "_DayTemplateToMealPrepLog_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToMealPrepLog" ADD CONSTRAINT "_DayTemplateToMealPrepLog_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPrepLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMealPrepLog" ADD CONSTRAINT "_IngredientToMealPrepLog_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMealPrepLog" ADD CONSTRAINT "_IngredientToMealPrepLog_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPrepLog"("id") ON DELETE CASCADE ON UPDATE CASCADE;
