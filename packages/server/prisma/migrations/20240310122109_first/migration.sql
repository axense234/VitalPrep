-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'Username',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg',
    "email" TEXT NOT NULL DEFAULT 'exampleemail@provider.com',
    "password" TEXT NOT NULL DEFAULT 'password',
    "age" INTEGER NOT NULL DEFAULT 0,
    "notificationSettingsId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationSettings" (
    "id" TEXT NOT NULL,
    "allowedNotifications" BOOLEAN NOT NULL DEFAULT true,
    "notificationImageUrl" TEXT NOT NULL DEFAULT '',
    "notificationStyle" TEXT NOT NULL DEFAULT 'Default',

    CONSTRAINT "NotificationSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPrepLog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Meal Prep Log',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708849818/VitalPrep/vector-set-foam-container_60352-1353_or48cz.jpg',
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "cookingDuration" INTEGER NOT NULL DEFAULT 0,
    "instanceTemplateId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "MealPrepLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPrepPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Meal Prep Plan',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708851067/VitalPrep/Default_Day_Instance_Image_Plan_obbwd9.jpg',
    "activated" BOOLEAN NOT NULL DEFAULT true,
    "instanceTemplatesTimings" TIMESTAMP(3)[],
    "macrosId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "MealPrepPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstanceTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Instance Template',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708849818/VitalPrep/vector-set-foam-container_60352-1353_or48cz.jpg',
    "macrosId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "InstanceTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Day Template',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708849436/VitalPrep/Default_Day_Instance_Image_xs53xh.jpg',
    "macrosId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "DayTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Recipe',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708848563/VitalPrep/depositphotos_86878174-stock-illustration-simple-doodle-of-a-bowl_skeven.webp',
    "macrosId" TEXT NOT NULL,
    "recipeTutorialId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeTutorial" (
    "id" TEXT NOT NULL,
    "writtenTutorial" TEXT NOT NULL DEFAULT '',
    "videoTutorial" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "RecipeTutorial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Ingredient',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708848204/VitalPrep/doodle-carrot-hand-drawn-black-white-outline-carrot-line-art-vegetable-stock-vector_502320-1096_oenebb.jpg',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "macrosId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Macros" (
    "id" TEXT NOT NULL,
    "calories" INTEGER NOT NULL DEFAULT 0,
    "proteinAmount" INTEGER NOT NULL DEFAULT 0,
    "carbsAmount" INTEGER NOT NULL DEFAULT 0,
    "fatsAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Macros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utensil" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Utensil',
    "imageUrl" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/birthdayreminder/image/upload/v1708848218/VitalPrep/frying-pan-with-food-hand-drawn-doodle-vector-41700255_ni2nh1.jpg',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT,

    CONSTRAINT "Utensil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InstanceTemplateToMealPrepPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DayTemplateToInstanceTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToUtensil" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_notificationSettingsId_key" ON "User"("notificationSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "MealPrepPlan_macrosId_key" ON "MealPrepPlan"("macrosId");

-- CreateIndex
CREATE UNIQUE INDEX "InstanceTemplate_macrosId_key" ON "InstanceTemplate"("macrosId");

-- CreateIndex
CREATE UNIQUE INDEX "DayTemplate_macrosId_key" ON "DayTemplate"("macrosId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_macrosId_key" ON "Recipe"("macrosId");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_recipeTutorialId_key" ON "Recipe"("recipeTutorialId");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_macrosId_key" ON "Ingredient"("macrosId");

-- CreateIndex
CREATE UNIQUE INDEX "_InstanceTemplateToMealPrepPlan_AB_unique" ON "_InstanceTemplateToMealPrepPlan"("A", "B");

-- CreateIndex
CREATE INDEX "_InstanceTemplateToMealPrepPlan_B_index" ON "_InstanceTemplateToMealPrepPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToRecipe_AB_unique" ON "_DayTemplateToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToRecipe_B_index" ON "_DayTemplateToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DayTemplateToInstanceTemplate_AB_unique" ON "_DayTemplateToInstanceTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_DayTemplateToInstanceTemplate_B_index" ON "_DayTemplateToInstanceTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUtensil_AB_unique" ON "_RecipeToUtensil"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToUtensil_B_index" ON "_RecipeToUtensil"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToRecipe_AB_unique" ON "_IngredientToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToRecipe_B_index" ON "_IngredientToRecipe"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_notificationSettingsId_fkey" FOREIGN KEY ("notificationSettingsId") REFERENCES "NotificationSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPrepLog" ADD CONSTRAINT "MealPrepLog_instanceTemplateId_fkey" FOREIGN KEY ("instanceTemplateId") REFERENCES "InstanceTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPrepLog" ADD CONSTRAINT "MealPrepLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPrepPlan" ADD CONSTRAINT "MealPrepPlan_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPrepPlan" ADD CONSTRAINT "MealPrepPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstanceTemplate" ADD CONSTRAINT "InstanceTemplate_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstanceTemplate" ADD CONSTRAINT "InstanceTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayTemplate" ADD CONSTRAINT "DayTemplate_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DayTemplate" ADD CONSTRAINT "DayTemplate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeTutorialId_fkey" FOREIGN KEY ("recipeTutorialId") REFERENCES "RecipeTutorial"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "Macros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Utensil" ADD CONSTRAINT "Utensil_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToMealPrepPlan" ADD CONSTRAINT "_InstanceTemplateToMealPrepPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "InstanceTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstanceTemplateToMealPrepPlan" ADD CONSTRAINT "_InstanceTemplateToMealPrepPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPrepPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToRecipe" ADD CONSTRAINT "_DayTemplateToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToRecipe" ADD CONSTRAINT "_DayTemplateToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToInstanceTemplate" ADD CONSTRAINT "_DayTemplateToInstanceTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "DayTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DayTemplateToInstanceTemplate" ADD CONSTRAINT "_DayTemplateToInstanceTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "InstanceTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUtensil" ADD CONSTRAINT "_RecipeToUtensil_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUtensil" ADD CONSTRAINT "_RecipeToUtensil_B_fkey" FOREIGN KEY ("B") REFERENCES "Utensil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToRecipe" ADD CONSTRAINT "_IngredientToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
