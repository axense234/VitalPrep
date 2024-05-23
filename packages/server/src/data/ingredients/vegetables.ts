const defaultVegetablesTranslations = {
  tomato: {
    en: "Tomato",
    ro: "Roșie",
    fr: "Tomate",
    de: "Tomate",
  },
  carrot: {
    en: "Carrot",
    ro: "Morcov",
    fr: "Carotte",
    de: "Karotte",
  },
  potato: {
    en: "Potato",
    ro: "Cartof",
    fr: "Pomme de terre",
    de: "Kartoffel",
  },
  cucumber: {
    en: "Cucumber",
    ro: "Castravete",
    fr: "Concombre",
    de: "Gurke",
  },
  broccoli: {
    en: "Broccoli",
    ro: "Brocoli",
    fr: "Brocoli",
    de: "Brokkoli",
  },
  spinach: {
    en: "Spinach",
    ro: "Spanac",
    fr: "Épinard",
    de: "Spinat",
  },
  onions: {
    en: "Onions",
    ro: "Ceapă",
    fr: "Oignons",
    de: "Zwiebeln",
  },
  peppers: {
    en: "Bell Peppers",
    ro: "Ardei Gras",
    fr: "Poivrons",
    de: "Paprika",
  },
  lettuce: {
    en: "Lettuce",
    ro: "Salată Verde",
    fr: "Laitue",
    de: "Kopfsalat",
  },
  cabbage: {
    en: "Cabbage",
    ro: "Varză",
    fr: "Chou",
    de: "Kohl",
  },
  cauliflower: {
    en: "Cauliflower",
    ro: "Conopidă",
    fr: "Chou-fleur",
    de: "Blumenkohl",
  },
  garlic: {
    en: "Garlic",
    ro: "Usturoi",
    fr: "Ail",
    de: "Knoblauch",
  },
  zucchini: {
    en: "Zucchini",
    ro: "Zucchini",
    fr: "Courgettes",
    de: "Zucchini",
  },
  eggplant: {
    en: "Eggplant",
    ro: "Vânătă",
    fr: "Aubergine",
    de: "Aubergine",
  },
  greenBeans: {
    en: "Green Beans",
    ro: "Fasole Verde",
    fr: "Haricots Verts",
    de: "Grüne Bohnen",
  },
};

export const defaultVegetables = (locale: string) => [
  {
    name: defaultVegetablesTranslations.tomato[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492355/ingredientImages/948f3e78-8804-48b1-9272-6e7161150980.png",
    enabled: true,
    macros: {
      create: {
        calories: 18,
        proteinAmount: 0.9,
        carbsAmount: 3.9,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.carrot[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492380/ingredientImages/4d113262-33e7-45d7-9bbc-4c66b4d4380e.png",
    enabled: true,
    macros: {
      create: {
        calories: 35,
        proteinAmount: 0.8,
        carbsAmount: 8.2,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.potato[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492404/ingredientImages/4a15a4f1-2629-4fe2-8061-7cec86c04ced.png",
    enabled: true,
    macros: {
      create: {
        calories: 93,
        proteinAmount: 2.5,
        carbsAmount: 21,
        fatsAmount: 0.1,
      },
    },
  },

  {
    name: defaultVegetablesTranslations.cucumber[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492430/ingredientImages/e0f40f52-8fe2-4b78-86e9-d2c3edb01266.png",
    enabled: true,
    macros: {
      create: {
        calories: 15,
        proteinAmount: 0.7,
        carbsAmount: 3.6,
        fatsAmount: 0.1,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.broccoli[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492462/ingredientImages/299ad582-f583-4aac-97f9-36b3bb30e1b6.png",
    enabled: true,
    macros: {
      create: {
        calories: 35,
        proteinAmount: 2.4,
        carbsAmount: 7.2,
        fatsAmount: 0.4,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.spinach[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492492/ingredientImages/06623957-b630-4ea9-b6ff-f7eb3afcde47.png",
    enabled: true,
    macros: {
      create: {
        calories: 23,
        proteinAmount: 3,
        carbsAmount: 3.8,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.onions[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492525/ingredientImages/c22016e1-1dac-485a-b024-2ca33bf06fbc.png",
    enabled: true,
    macros: {
      create: {
        calories: 44,
        proteinAmount: 1.4,
        carbsAmount: 10,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.peppers[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492554/ingredientImages/33e7dd0c-2e44-4082-99bb-39ad6de79b38.png",
    enabled: true,
    macros: {
      create: {
        calories: 28,
        proteinAmount: 1,
        carbsAmount: 6.6,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.lettuce[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492580/ingredientImages/a4c5a704-f097-4c3a-bd3a-60afdae635ce.png",
    enabled: true,
    macros: {
      create: {
        calories: 17,
        proteinAmount: 1.2,
        carbsAmount: 3.3,
        fatsAmount: 0.3,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.cabbage[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492615/ingredientImages/80de166b-c38e-4555-8546-67ae66e23eeb.png",
    enabled: true,
    macros: {
      create: {
        calories: 23,
        proteinAmount: 1.3,
        carbsAmount: 5.5,
        fatsAmount: 0.1,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.cauliflower[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492662/ingredientImages/8c944ae0-af7c-4c8d-bf43-ceaf33c0f573.png",
    enabled: true,
    macros: {
      create: {
        calories: 23,
        proteinAmount: 1.8,
        carbsAmount: 4.1,
        fatsAmount: 0.5,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.garlic[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492694/ingredientImages/b7ea5c34-4872-42e7-a266-4f43dc1119c6.png",
    enabled: true,
    macros: {
      create: {
        calories: 149,
        proteinAmount: 6.4,
        carbsAmount: 33,
        fatsAmount: 0.5,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.zucchini[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492732/ingredientImages/5c4396dc-43eb-4f62-815e-5dea1381a385.png",
    enabled: true,
    macros: {
      create: {
        calories: 15,
        proteinAmount: 1.1,
        carbsAmount: 2.7,
        fatsAmount: 0.4,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.eggplant[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492765/ingredientImages/d30cb29f-fc53-4f52-af4b-8a4a7faefe54.png",
    enabled: true,
    macros: {
      create: {
        calories: 35,
        proteinAmount: 0.8,
        carbsAmount: 8.7,
        fatsAmount: 0.2,
      },
    },
  },
  {
    name: defaultVegetablesTranslations.greenBeans[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716492803/ingredientImages/fa288655-a642-47ce-97c9-e24b79f09847.png",
    enabled: true,
    macros: {
      create: {
        calories: 35,
        proteinAmount: 1.9,
        carbsAmount: 7.9,
        fatsAmount: 0.3,
      },
    },
  },
];
