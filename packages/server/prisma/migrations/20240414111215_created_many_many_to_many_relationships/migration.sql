-- CreateTable
CREATE TABLE "_MealPrepPlanToUtensil" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MealPrepPlanToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InstanceTemplateToUtensil" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_InstanceTemplateToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToIngredient" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToUtensil" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToMealPrepPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToInstanceTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToMealPrepPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MealPrepPlanToUtensil_AB_unique" ON "_MealPrepPlanToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPrepPlanToUtensil_B_index" ON "_MealPrepPlanToUtensil"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MealPrepPlanToRecipe_AB_unique" ON "_MealPrepPlanToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_MealPrepPlanToRecipe_B_index" ON "_MealPrepPlanToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InstanceTemplateToUtensil_AB_unique" ON "_InstanceTemplateToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_InstanceTemplateToUtensil_B_index" ON "_InstanceTemplateToUtensil"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InstanceTemplateToRecipe_AB_unique" ON "_InstanceTemplateToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_InstanceTemplateToRecipe_B_index" ON "_InstanceTemplateToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToIngredient_AB_unique" ON "_DayTemplateToIngredient"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToIngredient_B_index" ON "_DayTemplateToIngredient"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToUtensil_AB_unique" ON "_DayTemplateToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToUtensil_B_index" ON "_DayTemplateToUtensil"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToMealPrepPlan_AB_unique" ON "_DayTemplateToMealPrepPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToMealPrepPlan_B_index" ON "_DayTemplateToMealPrepPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToInstanceTemplate_AB_unique" ON "_IngredientToInstanceTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToInstanceTemplate_B_index" ON "_IngredientToInstanceTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToMealPrepPlan_AB_unique" ON "_IngredientToMealPrepPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToMealPrepPlan_B_index" ON "_IngredientToMealPrepPlan"("B");

-- AddForeignKey
ALTER TABLE "_MealPrepPlanToUtensil" ADD CONSTRAINT "_MealPrepPlanToUtensil_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPrepPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepPlanToUtensil" ADD CONSTRAINT "_MealPrepPlanToUtensil_B_fkey" FOREIGN KEY ("B") REFERENCES "Utensil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepPlanToRecipe" ADD CONSTRAINT "_MealPrepPlanToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "MealPrepPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MealPrepPlanToRecipe" ADD CONSTRAINT "_MealPrepPlanToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToUtensil" ADD CONSTRAINT "_InstanceTemplateToUtensil_A_fkey" FOREIGN KEY ("A") REFERENCES "InstanceTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToUtensil" ADD CONSTRAINT "_InstanceTemplateToUtensil_B_fkey" FOREIGN KEY ("B") REFERENCES "Utensil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToRecipe" ADD CONSTRAINT "_InstanceTemplateToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "InstanceTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToRecipe" ADD CONSTRAINT "_InstanceTemplateToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToIngredient" ADD CONSTRAINT "_DayTemplateToIngredient_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToIngredient" ADD CONSTRAINT "_DayTemplateToIngredient_B_fkey" FOREIGN KEY ("B") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToUtensil" ADD CONSTRAINT "_DayTemplateToUtensil_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToUtensil" ADD CONSTRAINT "_DayTemplateToUtensil_B_fkey" FOREIGN KEY ("B") REFERENCES "Utensil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToMealPrepPlan" ADD CONSTRAINT "_DayTemplateToMealPrepPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToMealPrepPlan" ADD CONSTRAINT "_DayTemplateToMealPrepPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPrepPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToInstanceTemplate" ADD CONSTRAINT "_IngredientToInstanceTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToInstanceTemplate" ADD CONSTRAINT "_IngredientToInstanceTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "InstanceTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMealPrepPlan" ADD CONSTRAINT "_IngredientToMealPrepPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToMealPrepPlan" ADD CONSTRAINT "_IngredientToMealPrepPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPrepPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
