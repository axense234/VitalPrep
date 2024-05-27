const defaultProteinsTranslations = {
  chickenBreast: {
    en: "Chicken Breast",
    ro: "Piept de Pui",
    fr: "Poitrine de Poulet",
    de: "Hühnerbrust",
  },
  chickenThighs: {
    en: "Chicken Thighs",
    ro: "Pulpe de Pui",
    fr: "Cuisses de Poulet",
    de: "Hühnerschenkel",
  },
  chickenWings: {
    en: "Chicken Wings",
    ro: "Aripioare de Pui",
    fr: "Ailes de Poulet",
    de: "Hühnerflügel",
  },
  groundChicken: {
    en: "Ground Chicken",
    ro: "Pui Măcinat",
    fr: "Poulet Haché",
    de: "Gemahlenes Huhn",
  },
  beefSteak: {
    en: "Beef Steak",
    ro: "Friptura de Vita",
    fr: "Steak de Bœuf",
    de: "Rindersteak",
  },
  groundBeef: {
    en: "Ground Beef",
    ro: "Carne de Vită",
    fr: "Le bœuf haché",
    de: "Hackfleisch",
  },
  beefRoasts: {
    en: "Beef Roasts",
    ro: "Fripturi de Vită",
    fr: "Rôtis de Boeuf",
    de: "Rinderbraten",
  },
  salmon: {
    en: "Salmon",
    ro: "Somon",
    fr: "Saumon",
    de: "Lachs",
  },
  tuna: {
    en: "Tuna",
    ro: "Ton",
    fr: "Thon",
    de: "Thunfisch",
  },
  cod: {
    en: "Cod",
    ro: "Cod",
    fr: "La Morue",
    de: "Kabeljau",
  },
  tilapia: {
    en: "Tilapia",
    ro: "Tilapia",
    fr: "Tilapia",
    de: "Tilapia",
  },
  porkChops: {
    en: "Pork Chops",
    ro: "Cotlete de Porc",
    fr: "Côtes de Porc",
    de: "Schweinekoteletts",
  },
  porkLoin: {
    en: "Pork Loin",
    ro: "Cotlet de Porc",
    fr: "Longe de Porc",
    de: "Schweinelende",
  },
  groundPork: {
    en: "Ground Pork",
    ro: "Carne de Porc Macinata",
    fr: "Porc Haché",
    de: "Mett",
  },
  bacon: {
    en: "Bacon",
    ro: "Slănină",
    fr: "Lard",
    de: "Speck",
  },
  wholeEggs: {
    en: "Whole Eggs",
    ro: "Ouă întregi",
    fr: "Oeufs Entiers",
    de: "Ganze Eier",
  },
  eggWhites: {
    en: "Egg Whites",
    ro: "Albușuri de Ou",
    fr: "Blancs D'oeufs",
    de: "Eiweiß",
  },
  tofu: {
    en: "Tofu",
    ro: "Tofu",
    fr: "Tofu",
    de: "Tofu",
  },
  groundTurkey: {
    en: "Ground Turkey",
    ro: "Curcan Măcinat",
    fr: "Dinde Hachée",
    de: "Putenhackfleisch",
  },
  turkeyBreast: {
    en: "Turkey Breast",
    ro: "Piept de Curcan",
    fr: "Poitrine de Dinde",
    de: "Truthahnbrust",
  },
  wholeTurkey: {
    en: "Whole Turkey",
    ro: "Curcan întreg",
    fr: "Dinde Entière",
    de: "Ganzer Truthahn",
  },
};

export const defaultProteins = (locale: string) => [
  {
    name: defaultProteinsTranslations.chickenBreast[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491455/ingredientImages/f13e520a-fed6-4a6f-92ee-669f748b2fd4.png",
    macros: {
      create: {
        calories: 158,
        proteinAmount: 29.6,
        carbsAmount: 0,
        fatsAmount: 3.4,
      },
    },
  },
  {
    name: defaultProteinsTranslations.chickenThighs[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491487/ingredientImages/41e8b1fc-99e8-4ca8-a0d7-6c205449e552.png",
    macros: {
      create: {
        calories: 208,
        proteinAmount: 23.3,
        carbsAmount: 0.1,
        fatsAmount: 13.5,
      },
    },
  },
  {
    name: defaultProteinsTranslations.chickenWings[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491519/ingredientImages/b90b4285-e339-4730-8dad-dbf7cf998450.png",
    macros: {
      create: {
        calories: 352,
        proteinAmount: 18,
        carbsAmount: 10.4,
        fatsAmount: 26,
      },
    },
  },
  {
    name: defaultProteinsTranslations.groundChicken[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491563/ingredientImages/bcb1895a-e874-4b35-b993-bb6ecdb88378.png",
    macros: {
      create: {
        calories: 193,
        proteinAmount: 24,
        carbsAmount: 0,
        fatsAmount: 1.2,
      },
    },
  },
  {
    name: defaultProteinsTranslations.beefSteak[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491623/ingredientImages/da08d933-c8ed-4536-a864-27e04d905d74.png",
    macros: {
      create: {
        calories: 276,
        proteinAmount: 26.1,
        carbsAmount: 0,
        fatsAmount: 18.5,
      },
    },
  },
  {
    name: defaultProteinsTranslations.groundBeef[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491628/ingredientImages/b9f257ca-827d-400f-9fa8-3edc74915364.png",
    macros: {
      create: {
        calories: 284,
        proteinAmount: 28.7,
        carbsAmount: 0,
        fatsAmount: 18.5,
      },
    },
  },
  {
    name: defaultProteinsTranslations.beefRoasts[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491659/ingredientImages/a09c478c-06ea-4f08-a1c0-bc487658af63.png",
    macros: {
      create: {
        calories: 299,
        proteinAmount: 30.3,
        carbsAmount: 0,
        fatsAmount: 18.7,
      },
    },
  },
  {
    name: defaultProteinsTranslations.salmon[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491694/ingredientImages/576f4de3-8baf-4a44-a803-51b538953565.png",
    macros: {
      create: {
        calories: 210,
        proteinAmount: 22.5,
        carbsAmount: 0,
        fatsAmount: 12.6,
      },
    },
  },
  {
    name: defaultProteinsTranslations.tuna[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491716/ingredientImages/8dc77fda-903f-4fc5-9651-330de8bce1ed.png",
    macros: {
      create: {
        calories: 129,
        proteinAmount: 29.2,
        carbsAmount: 0,
        fatsAmount: 0.6,
      },
    },
  },
  {
    name: defaultProteinsTranslations.cod[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491797/ingredientImages/9a6330d6-f3ff-40c9-897f-e64dcd9fabfe.png",
    macros: {
      create: {
        calories: 104,
        proteinAmount: 22.6,
        carbsAmount: 0,
        fatsAmount: 0.8,
      },
    },
  },
  {
    name: defaultProteinsTranslations.tilapia[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491827/ingredientImages/96239537-45a0-47d3-a47a-77696d103300.png",
    macros: {
      create: {
        calories: 130,
        proteinAmount: 26.4,
        carbsAmount: 0,
        fatsAmount: 2.7,
      },
    },
  },
  {
    name: defaultProteinsTranslations.porkChops[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491865/ingredientImages/410869e4-c20c-4339-85b9-0a64a14679de.png",
    macros: {
      create: {
        calories: 213,
        proteinAmount: 26,
        carbsAmount: 0,
        fatsAmount: 11.1,
      },
    },
  },
  {
    name: defaultProteinsTranslations.porkLoin[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491902/ingredientImages/ad3676d9-8c6d-4d97-a3c5-360918e31c3c.png",
    macros: {
      create: {
        calories: 190,
        proteinAmount: 25.7,
        carbsAmount: 0,
        fatsAmount: 8.8,
      },
    },
  },
  {
    name: defaultProteinsTranslations.groundPork[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491938/ingredientImages/e6875e92-28f1-4a8b-9242-b4de28b9826f.png",
    macros: {
      create: {
        calories: 294,
        proteinAmount: 25.7,
        carbsAmount: 0,
        fatsAmount: 21,
      },
    },
  },
  {
    name: defaultProteinsTranslations.bacon[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491965/ingredientImages/1018333a-15c2-429d-be1e-a31198d44bcf.png",
    macros: {
      create: {
        calories: 472,
        proteinAmount: 35.5,
        carbsAmount: 1.7,
        fatsAmount: 35.2,
      },
    },
  },
  {
    name: defaultProteinsTranslations.wholeEggs[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492014/ingredientImages/157629d1-cd3f-47a9-89eb-1d13813a4473.png",
    macros: {
      create: {
        calories: 144,
        proteinAmount: 12.6,
        carbsAmount: 0.7,
        fatsAmount: 9.6,
      },
    },
  },
  {
    name: defaultProteinsTranslations.eggWhites[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492072/ingredientImages/8acf73d2-9cb0-4ee6-9f1f-c1f37031dbd1.png",
    macros: {
      create: {
        calories: 51,
        proteinAmount: 10.8,
        carbsAmount: 0.7,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultProteinsTranslations.tofu[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492101/ingredientImages/b337fc36-94ad-487d-acf4-40dff43d972a.png",
    macros: {
      create: {
        calories: 83.6,
        proteinAmount: 10,
        carbsAmount: 1.2,
        fatsAmount: 5.3,
      },
    },
  },
  {
    name: defaultProteinsTranslations.groundTurkey[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492134/ingredientImages/9227c6a3-1d20-471f-8ed0-19e7bfb014f8.png",
    macros: {
      create: {
        calories: 255,
        proteinAmount: 24.5,
        carbsAmount: 0,
        fatsAmount: 17.5,
      },
    },
  },
  {
    name: defaultProteinsTranslations.turkeyBreast[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492196/ingredientImages/12a1bf10-ad22-4c90-adef-0efb2a70d186.png",
    macros: {
      create: {
        calories: 145,
        proteinAmount: 30.3,
        carbsAmount: 0,
        fatsAmount: 2.1,
      },
    },
  },
  {
    name: defaultProteinsTranslations.wholeTurkey[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492218/ingredientImages/40c02d77-5d90-4aba-a4ff-6061ee7d04bb.png",
    macros: {
      create: {
        calories: 192,
        proteinAmount: 28.8,
        carbsAmount: 0.1,
        fatsAmount: 7.6,
      },
    },
  },
];
