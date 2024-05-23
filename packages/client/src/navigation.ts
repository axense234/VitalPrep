import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";

export const locales = ["en", "ro", "fr", "de"] as const;
export const localePrefix = "always";

export const pathnames = {
  "/login": {
    ro: "/conectare",
    en: "/login",
    fr: "/connecter",
    de: "/anmeldung",
  },
  "/home": {
    ro: "/acasa",
    en: "/home",
    fr: "/maison",
    de: "/heim",
  },
  "/logs": {
    ro: "/jurnale",
    en: "/logs",
    fr: "/journaux",
    de: "/zeitschriften",
  },
  "/create-log": {
    ro: "/creaza-jurnal",
    en: "/create-log",
    fr: "/creer-journal",
    de: "/tagebuch-erstellen",
  },
  "/create-tool": {
    ro: "/unealta-de-creare",
    en: "/create-tool",
    fr: "/loutil-de-creation",
    de: "/das-werkzeug-der-schopfung",
  },
  "/multi-view-tool": {
    ro: "/unealta-multi-vizualizare",
    en: "/multi-view-tool",
    fr: "/outil-multi-vue",
    de: "/werkzeug-multi-vue",
  },
  "/profile": {
    ro: "/profil",
    en: "/profile",
    fr: "/profil",
    de: "/profil",
  },
  "/settings": {
    ro: "/setari",
    en: "/settings",
    fr: "/parametres",
    de: "/einstellungen",
  },
  "/guide": {
    ro: "/ghid",
    en: "/guide",
    fr: "/guide",
    de: "/fuhrung",
  },
  "/faq": "/faq",
  "/about": {
    ro: "/despre",
    en: "/about",
    fr: "/environ",
    de: "/um",
  },
  "/contact": "/contact",

  "/ingredient/[id]": {
    ro: "/ingredient/[id]",
    en: "/ingredient/[id]",
    fr: "/ingredient/[id]",
    de: "/zutat/[id]",
  },
  "/utensil/[id]": {
    ro: "/ustensila/[id]",
    en: "/utensil/[id]",
    fr: "/ustensile/[id]",
    de: "/gerat/[id]",
  },
  "/recipe/[id]": {
    ro: "/reteta/[id]",
    en: "/recipe/[id]",
    fr: "/recette/[id]",
    de: "/rezept/[id]",
  },
  "/dayTemplate/[id]": {
    ro: "/planDeZi/[id]",
    en: "/dayTemplate/[id]",
    fr: "/planDeJournee/[id]",
    de: "/tagesVorlage/[id]",
  },
  "/instanceTemplate/[id]": {
    ro: "/modelDeSesiune/[id]",
    en: "/sessionTemplate/[id]",
    fr: "/modeleDeSeance/[id]",
    de: "/instanzVorlage/[id]",
  },
  "/mealPrepPlan/[id]": {
    ro: "/planMealPrep/[id]",
    en: "/mealPrepPlan/[id]",
    fr: "/preparationDesRepas/[id]",
    de: "/pahlzeitPrepPlan/[id]",
  },
  "/mealPrepLog/[id]": {
    ro: "/jurnalDeSesiune/[id]",
    en: "/sessionLog/[id]",
    fr: "/journalDeSession/[id]",
    de: "/sitzungsProtokoll/[id]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
