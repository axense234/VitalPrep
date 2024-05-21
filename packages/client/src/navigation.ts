import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from "next-intl/navigation";

export const locales = ["en", "ro"] as const;
export const localePrefix = "always";

export const pathnames = {
  "/login": {
    ro: "/conectare",
    en: "/login",
  },
  "/home": {
    ro: "/acasa",
    en: "/home",
  },
  "/logs": {
    ro: "/jurnale",
    en: "/logs",
  },
  "/create-log": {
    ro: "/creaza-jurnal",
    en: "/create-log",
  },
  "/create-tool": {
    ro: "/unealta-de-creare",
    en: "/create-tool",
  },
  "/multi-view-tool": {
    ro: "/unealta-multi-vizualizare",
    en: "/multi-view-tool",
  },
  "/profile": {
    ro: "/profil",
    en: "/profile",
  },
  "/settings": {
    ro: "/setari",
    en: "/settings",
  },
  "/guide": {
    ro: "/ghid",
    en: "/guide",
  },
  "/faq": "/faq",
  "/about": {
    ro: "/despre",
    en: "/about",
  },
  "/contact": "/contact",

  "/ingredient/[id]": {
    ro: "/ingredient/[id]",
    en: "/ingredient/[id]",
  },
  "/utensil/[id]": {
    ro: "/ustensila/[id]",
    en: "/utensil/[id]",
  },
  "/recipe/[id]": {
    ro: "/reteta/[id]",
    en: "/recipe/[id]",
  },
  "/dayTemplate/[id]": {
    ro: "/planDeZi/[id]",
    en: "/dayTemplate/[id]",
  },
  "/instanceTemplate/[id]": {
    ro: "/modelDeSesiune/[id]",
    en: "/sessionTemplate/[id]",
  },
  "/mealPrepPlan/[id]": {
    ro: "/planMealPrep/[id]",
    en: "/mealPrepPlan/[id]",
  },
  "/mealPrepLog/[id]": {
    ro: "/jurnalDeSesiune/[id]",
    en: "/sessionLog/[id]",
  },
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
