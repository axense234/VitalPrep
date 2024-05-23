const defaultDairyTranslations = {
  milk: {
    en: "Milk",
    ro: "Lapte",
    fr: "Lait",
    de: "Milch",
  },
  cheddar: {
    en: "Cheddar",
    ro: "Cașcaval",
    fr: "Fromage",
    de: "Käse",
  },
  yogurt: {
    en: "Yogurt",
    ro: "Iaurt",
    fr: "Yaourt",
    de: "Joghurt",
  },
  butter: {
    en: "Butter",
    ro: "Unt",
    fr: "Beurre",
    de: "Butter",
  },
  cream: {
    en: "Cream",
    ro: "Cremă",
    fr: "Crème",
    de: "Creme",
  },
  ghee: {
    en: "Ghee",
    ro: "Ghee",
    fr: "Ghee",
    de: "Ghee",
  },
  creamCheese: {
    en: "Cream Cheese",
    ro: "Cremă de Brânză",
    fr: "Fromage Frais",
    de: "Frischkäse",
  },
  cottageCheese: {
    en: "Cottage Cheese",
    ro: "Brânză de Vacă",
    fr: "Fromage Blanc",
    de: "Hüttenkäse",
  },
  sourCream: {
    en: "Sour Cream",
    ro: "Smântână",
    fr: "Crème Aigre",
    de: "Sauerrahm",
  },
  iceCream: {
    en: "Ice Cream",
    ro: "Înghețată",
    fr: "Glace",
    de: "Eiscreme",
  },
};

export const defaultDairy = (locale: string) => [
  {
    name: defaultDairyTranslations.milk[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716489578/ingredientImages/bf3282f5-69a9-4093-9cb3-9b572a2b4115.png",
    enabled: true,
    macros: {
      create: {
        calories: 50,
        proteinAmount: 3.3,
        carbsAmount: 4.8,
        fatsAmount: 2,
      },
    },
  },
  {
    name: defaultDairyTranslations.cheddar[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716489845/ingredientImages/150b9b4c-d4a5-4f80-8fac-d6657745d739.png",
    enabled: true,
    macros: {
      create: {
        calories: 404,
        proteinAmount: 23,
        carbsAmount: 3.1,
        fatsAmount: 33,
      },
    },
  },
  {
    name: defaultDairyTranslations.yogurt[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716489878/ingredientImages/05ded6b9-9f47-42f2-a411-6cc532064ca0.png",
    enabled: true,
    macros: {
      create: {
        calories: 64,
        proteinAmount: 5.3,
        carbsAmount: 7.2,
        fatsAmount: 1.6,
      },
    },
  },
  {
    name: defaultDairyTranslations.butter[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716489902/ingredientImages/618acb09-cbe9-404c-840e-2e00298c8e4b.png",
    enabled: true,
    macros: {
      create: {
        calories: 724,
        proteinAmount: 0.9,
        carbsAmount: 0.1,
        fatsAmount: 85.2,
      },
    },
  },
  {
    name: defaultDairyTranslations.cream[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490248/ingredientImages/c0578287-1d99-4867-813e-e7d051eb318a.png",
    enabled: true,
    macros: {
      create: {
        calories: 333,
        proteinAmount: 2.8,
        carbsAmount: 2.7,
        fatsAmount: 36.3,
      },
    },
  },
  {
    name: defaultDairyTranslations.ghee[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490085/ingredientImages/185a6647-60d5-4bd5-8328-ecd71681fec1.png",
    enabled: true,
    macros: {
      create: {
        calories: 896,
        proteinAmount: 0.3,
        carbsAmount: 0,
        fatsAmount: 104,
      },
    },
  },
  {
    name: defaultDairyTranslations.creamCheese[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490136/ingredientImages/399bd4a5-2a27-4caa-8088-a24d88f83818.png",
    enabled: true,
    macros: {
      create: {
        calories: 357,
        proteinAmount: 6.3,
        carbsAmount: 5.6,
        fatsAmount: 35,
      },
    },
  },
  {
    name: defaultDairyTranslations.cottageCheese[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490217/ingredientImages/b224ed68-8a89-4781-b9f2-27e6106b4a17.png",
    enabled: true,
    macros: {
      create: {
        calories: 107,
        proteinAmount: 12,
        carbsAmount: 3.7,
        fatsAmount: 4.7,
      },
    },
  },
  {
    name: defaultDairyTranslations.sourCream[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490248/ingredientImages/c0578287-1d99-4867-813e-e7d051eb318a.png",
    enabled: true,
    macros: {
      create: {
        calories: 201,
        proteinAmount: 2.4,
        carbsAmount: 4.7,
        fatsAmount: 19.3,
      },
    },
  },
  {
    name: defaultDairyTranslations.iceCream[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490277/ingredientImages/f8cddb15-5002-46bd-b5b3-1f9732a3fef9.png",
    enabled: true,
    macros: {
      create: {
        calories: 218,
        proteinAmount: 3.7,
        carbsAmount: 24.8,
        fatsAmount: 12,
      },
    },
  },
];
