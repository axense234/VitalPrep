const defaultFruitsTranslations = {
  apple: {
    en: "Apple",
    ro: "Măr",
    fr: "Pomme",
    de: "Apfel",
  },
  banana: {
    en: "Banana",
    ro: "Banană",
    fr: "Banane",
    de: "Banane",
  },
  orange: {
    en: "Orange",
    ro: "Portocale",
    fr: "Orange",
    de: "Orange",
  },
  strawberries: {
    en: "Strawberries",
    ro: "Căpșune",
    fr: "Des Fraises",
    de: "Erdbeeren",
  },
  grapes: {
    en: "Grapes",
    ro: "Struguri",
    fr: "Raisins",
    de: "Trauben",
  },
  pineapple: {
    en: "Pineapple",
    ro: "Ananas",
    fr: "Ananas",
    de: "Ananas",
  },
  blueberries: {
    en: "Blueberries",
    ro: "Afine",
    fr: "Myrtilles",
    de: "Blaubeeren",
  },
  mangoes: {
    en: "Mangoes",
    ro: "Mango",
    fr: "Mangues",
    de: "Mangos",
  },
  cherries: {
    en: "Cherries",
    ro: "Cireșe",
    fr: "Cerises",
    de: "Kirschen",
  },
  watermelon: {
    en: "Watermelon",
    ro: "Pepene",
    fr: "Pastèque",
    de: "Wassermelone",
  },
  lemon: {
    en: "Lemon",
    ro: "Lămâie",
    fr: "Citron",
    de: "Zitrone",
  },
  lime: {
    en: "Lime",
    ro: "Lămâie Verde",
    fr: "Citron Vert",
    de: "Kalk",
  },
  kiwi: {
    en: "Kiwi",
    ro: "Kiwi",
    fr: "Kiwi",
    de: "Kiwi",
  },
  pears: {
    en: "Pears",
    ro: "Pere",
    fr: "Des Poires",
    de: "Birnen",
  },
  peaches: {
    en: "Peaches",
    ro: "Piersici",
    fr: "Les Pêches",
    de: "Pfirsiche",
  },
};

export const defaultFruits = (locale: string) => [
  {
    name: defaultFruitsTranslations.apple[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490419/ingredientImages/067f5b82-9798-4836-b073-0eea78ec8dd9.png",
    enabled: true,
    macros: {
      create: {
        calories: 52,
        proteinAmount: 0.3,
        carbsAmount: 14,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultFruitsTranslations.banana[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490453/ingredientImages/7994ec20-156a-4617-bed0-489d783604d5.png",
    enabled: true,
    macros: {
      create: {
        calories: 89,
        proteinAmount: 1.1,
        carbsAmount: 23,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultFruitsTranslations.orange[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490479/ingredientImages/82cf0a07-db9e-4c60-b835-346e8ddf71c8.png",
    enabled: true,
    macros: {
      create: {
        calories: 49,
        proteinAmount: 0.9,
        carbsAmount: 13,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultFruitsTranslations.strawberries[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490525/ingredientImages/88b0c108-e19e-4136-bcd2-01597215ed6b.png",
    enabled: true,
    macros: {
      create: {
        calories: 32,
        proteinAmount: 0.7,
        carbsAmount: 7.7,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultFruitsTranslations.grapes[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490556/ingredientImages/82eaa74c-de3a-4e07-900f-b9b457fbd42b.png",
    enabled: true,
    macros: {
      create: {
        calories: 34,
        proteinAmount: 0.4,
        carbsAmount: 8.9,
        fatsAmount: 0.1,
      },
    },
  },
  {
    name: defaultFruitsTranslations.pineapple[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490579/ingredientImages/dfeefde5-55ba-466c-b060-4f68eda9c37b.png",
    enabled: true,
    macros: {
      create: {
        calories: 41,
        proteinAmount: 0.5,
        carbsAmount: 11,
        fatsAmount: 0.1,
      },
    },
  },
  {
    name: defaultFruitsTranslations.blueberries[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490635/ingredientImages/547e9b6a-53a9-456f-b71e-421a056df077.png",
    enabled: true,
    macros: {
      create: {
        calories: 56,
        proteinAmount: 0.7,
        carbsAmount: 14.4,
        fatsAmount: 0,
      },
    },
  },
  {
    name: defaultFruitsTranslations.mangoes[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490663/ingredientImages/76b2b4bd-b922-4a1b-9a17-69aed70f1c9e.png",
    enabled: true,
    macros: {
      create: {
        calories: 62,
        proteinAmount: 0.9,
        carbsAmount: 15.5,
        fatsAmount: 0.4,
      },
    },
  },
  {
    name: defaultFruitsTranslations.cherries[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490702/ingredientImages/bbed345b-bdb8-45fb-b5ad-84c630eb6a90.png",
    enabled: true,
    macros: {
      create: {
        calories: 67,
        proteinAmount: 1.2,
        carbsAmount: 16.9,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultFruitsTranslations.watermelon[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490735/ingredientImages/1ff4c6ca-56d4-45cf-9f4c-6285bfc0e062.png",
    enabled: true,
    macros: {
      create: {
        calories: 34,
        proteinAmount: 0.7,
        carbsAmount: 8.8,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultFruitsTranslations.lemon[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490758/ingredientImages/c61f368c-5e46-43a0-a583-5aaa388e7593.png",
    enabled: true,
    macros: {
      create: {
        calories: 28,
        proteinAmount: 1.1,
        carbsAmount: 9.4,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultFruitsTranslations.lime[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490803/ingredientImages/88556338-e54c-4862-a57a-6007d1e5375d.png",
    enabled: true,
    macros: {
      create: {
        calories: 30,
        proteinAmount: 0.7,
        carbsAmount: 10.6,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultFruitsTranslations.kiwi[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490830/ingredientImages/5451cb08-7752-4385-bc7c-5796879a63e8.png",
    enabled: true,
    macros: {
      create: {
        calories: 58,
        proteinAmount: 1.1,
        carbsAmount: 14,
        fatsAmount: 0.5,
      },
    },
  },
  {
    name: defaultFruitsTranslations.pears[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490865/ingredientImages/db20acb7-0d9c-42e5-a129-bc2285d53bd1.png",
    enabled: true,
    macros: {
      create: {
        calories: 60,
        proteinAmount: 0.4,
        carbsAmount: 16.2,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultFruitsTranslations.peaches[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716490900/ingredientImages/6e4adc68-ece0-48cc-9ac3-e22d576e7072.png",
    enabled: true,
    macros: {
      create: {
        calories: 40,
        proteinAmount: 1,
        carbsAmount: 10.2,
        fatsAmount: 0.3,
      },
    },
  },
];
