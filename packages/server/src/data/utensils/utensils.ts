const defaultUtensilsTranslations = {
  knife: {
    en: "Knife",
    ro: "Cuţit",
    fr: "Couteau",
    de: "Messer",
  },
  cuttingBoard: {
    en: "Cutting Board",
    ro: "Placă de tăiat",
    fr: "Planche à Découper",
    de: "Schneidbrett",
  },
  spoon: {
    en: "Spoon",
    ro: "Linguriţă",
    fr: "Cuillère",
    de: "Löffel",
  },
  fork: {
    en: "Fork",
    ro: "Furculiţă",
    fr: "Fourchette",
    de: "Gabel",
  },
  spatula: {
    en: "Spatula",
    ro: "Spatula",
    fr: "Spatule",
    de: "Spatel",
  },
  tongs: {
    en: "Spatula",
    ro: "Clești",
    fr: "Pinces",
    de: "Zange",
  },
  whisk: {
    en: "Whisk",
    ro: "Tel",
    fr: "Fouet",
    de: "Schneebesen",
  },
  peeler: {
    en: "Peeler",
    ro: "Decojitor",
    fr: "Éplucheuse",
    de: "Schäler",
  },
  grater: {
    en: "Grater",
    ro: "Răzătoare",
    fr: "Râpe",
    de: "Reibe",
  },
  measuringCups: {
    en: "Measuring Cups",
    ro: "Cani de masurare",
    fr: "Tasses à mesurer",
    de: "Messbecher",
  },
  measuringSpoons: {
    en: "Measuring Spoons",
    ro: "Linguri de masurare",
    fr: "Cuillères à Mesurer",
    de: "Messlöffel",
  },
  canOpener: {
    en: "Can Opener",
    ro: "Deschizator de conserve",
    fr: "Ouvre-boîte",
    de: "Can Opener",
  },
  colander: {
    en: "Colander",
    ro: "Strecurătoare",
    fr: "Passoire",
    de: "Sieb",
  },
  mixingBowls: {
    en: "Mixing Bowls",
    ro: "Boluri pentru amestecare",
    fr: "Bols à mélanger",
    de: "Rührschüsseln",
  },
  rollingPin: {
    en: "Rolling Pin",
    ro: "Vergea",
    fr: "Rouleau à pâtisserie",
    de: "Nudelholz",
  },
  ladle: {
    en: "Ladle",
    ro: "Oală",
    fr: "Louche",
    de: "Kelle",
  },
  sieve: {
    en: "Sieve",
    ro: "Sită",
    fr: "Tamis",
    de: "Sieb",
  },
  potatoMasher: {
    en: "Potato Masher",
    ro: "Masina de cartofi",
    fr: "Presse-purée",
    de: "Kartoffelstampfer",
  },
};

export const defaultUtensilsBasic = (locale: string) => [
  {
    name: defaultUtensilsTranslations.knife[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487129/VitalPrep/images/knife-png-27810_jifa7t.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.cuttingBoard[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487212/VitalPrep/images/cutting-board_gmqpm8.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.spoon[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487259/VitalPrep/images/spoon_xf1pls.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.fork[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487298/VitalPrep/images/fork_fzwpj2.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.spatula[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487326/VitalPrep/images/spatula_hihmxl.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.whisk[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487724/VitalPrep/images/whisk_smkwe5.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.peeler[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487725/VitalPrep/images/peeler_hnwbo3.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.grater[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487633/VitalPrep/images/grater_zilrwt.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.measuringCups[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487954/VitalPrep/images/measuring-cup_a4gdmc.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.canOpener[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487952/VitalPrep/images/can-opener_eomfbq.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.measuringSpoons[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487955/VitalPrep/images/measuring-spoons_g3pjom.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.colander[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487953/VitalPrep/images/colander_ndwxmm.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.mixingBowls[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487956/VitalPrep/images/mixing-bowl_grydgo.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.rollingPin[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716488239/VitalPrep/images/rolling-pin_mpzd6w.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.ladle[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716488238/VitalPrep/images/ladle_s8und6.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.sieve[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716488339/VitalPrep/images/sieve_zwf3r8.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.potatoMasher[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716488336/VitalPrep/images/potato-masher_qrgdic.png",
    enabled: true,
  },
  {
    name: defaultUtensilsTranslations.tongs[locale],
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716487726/VitalPrep/images/tongs_cdhygg.png",
    enabled: true,
  },
];
