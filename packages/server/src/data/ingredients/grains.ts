const defaultGrainsTranslations = {
  wheat: {
    en: "Wheat",
    ro: "Grâu",
    fr: "Blé",
    de: "Weizen",
  },
  whiteRice: {
    en: "White Rice",
    ro: "Orez Alb",
    fr: "Riz Blanc",
    de: "Weißer Reis",
  },
  brownRice: {
    en: "Brown Rice",
    ro: "Orez Brun",
    fr: "Riz Brun",
    de: "Brauner Reis",
  },
  corn: {
    en: "Corn",
    ro: "Porumb",
    fr: "Maïs",
    de: "Mais",
  },
  oats: {
    en: "Oats",
    ro: "Ovăz",
    fr: "Avoine",
    de: "Hafer",
  },
  barley: {
    en: "Barley",
    ro: "Orz",
    fr: "Orge",
    de: "Gerste",
  },
  quinoa: {
    en: "Quinoa",
    ro: "Quinoa",
    fr: "Quinoa",
    de: "Quinoa",
  },
  sorghum: {
    en: "Sorghum",
    ro: "Sorg",
    fr: "Sorgho",
    de: "Sorghum",
  },
  millet: {
    en: "Millet",
    ro: "Mei",
    fr: "Millet",
    de: "Hirse",
  },
  rye: {
    en: "Rye",
    ro: "Secară",
    fr: "Seigle",
    de: "Roggen",
  },
  triticale: {
    en: "Triticale",
    ro: "Triticale",
    fr: "Triticale",
    de: "Triticale",
  },
};

export const defaultGrains = (locale: string) => [
  {
    name: defaultGrainsTranslations.wheat[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491032/ingredientImages/065e321a-4f53-4f76-adfe-9d0754d8e74c.png",
    enabled: true,
    macros: {
      create: {
        calories: 316,
        proteinAmount: 15,
        carbsAmount: 65.5,
        fatsAmount: 1.9,
      },
    },
  },
  {
    name: defaultGrainsTranslations.whiteRice[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491053/ingredientImages/2261a648-0d8d-461b-aa09-d73609a72b8e.png",
    enabled: true,
    macros: {
      create: {
        calories: 133,
        proteinAmount: 2.8,
        carbsAmount: 29.3,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultGrainsTranslations.brownRice[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491090/ingredientImages/fd321911-da4a-4c6b-9e08-009dba22f492.png",
    enabled: true,
    macros: {
      create: {
        calories: 109,
        proteinAmount: 2.3,
        carbsAmount: 23,
        fatsAmount: 0.8,
      },
    },
  },
  {
    name: defaultGrainsTranslations.corn[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491115/ingredientImages/4c827000-97e2-44bf-9bb3-4e506d4c74a3.png",
    enabled: true,
    macros: {
      create: {
        calories: 99,
        proteinAmount: 3.5,
        carbsAmount: 22,
        fatsAmount: 1.5,
      },
    },
  },
  {
    name: defaultGrainsTranslations.oats[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491148/ingredientImages/85380bb4-6d22-406f-b5cd-611493367c7c.png",
    enabled: true,
    macros: {
      create: {
        calories: 367,
        proteinAmount: 12.7,
        carbsAmount: 64.8,
        fatsAmount: 6.2,
      },
    },
  },
  {
    name: defaultGrainsTranslations.barley[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491169/ingredientImages/7f5fb707-3c9d-47fc-8582-513078917cf8.png",
    enabled: true,
    macros: {
      create: {
        calories: 125.5,
        proteinAmount: 2.3,
        carbsAmount: 28.6,
        fatsAmount: 0.4,
      },
    },
  },
  {
    name: defaultGrainsTranslations.quinoa[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491196/ingredientImages/1581a803-e486-41e8-9c04-c5ce336dfb6f.png",
    enabled: true,
    macros: {
      create: {
        calories: 122,
        proteinAmount: 4.5,
        carbsAmount: 22,
        fatsAmount: 2,
      },
    },
  },
  {
    name: defaultGrainsTranslations.sorghum[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491228/ingredientImages/b1cf998a-c23b-4e7e-b7f7-038a12b00cef.png",
    enabled: true,
    macros: {
      create: {
        calories: 73,
        proteinAmount: 2.4,
        carbsAmount: 16,
        fatsAmount: 0.8,
      },
    },
  },
  {
    name: defaultGrainsTranslations.millet[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491284/ingredientImages/e7a6b0df-9828-4fbd-881b-ac142a724fa9.png",
    enabled: true,
    macros: {
      create: {
        calories: 124,
        proteinAmount: 3.7,
        carbsAmount: 24.6,
        fatsAmount: 1,
      },
    },
  },
  {
    name: defaultGrainsTranslations.rye[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491308/ingredientImages/e5508d5a-31f3-4ea0-95b3-168d7ecdda15.png",
    enabled: true,
    macros: {
      create: {
        calories: 257,
        proteinAmount: 8.4,
        carbsAmount: 46.5,
        fatsAmount: 3.4,
      },
    },
  },
  {
    name: defaultGrainsTranslations.triticale[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716491343/ingredientImages/d3645d50-6bd0-4aaa-9910-e9212621af17.png",
    enabled: true,
    macros: {
      create: {
        calories: 341,
        proteinAmount: 13.4,
        carbsAmount: 74.2,
        fatsAmount: 2.1,
      },
    },
  },
];
