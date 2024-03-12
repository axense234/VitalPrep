// React Icons
import { FaGithub, FaHome, FaInfoCircle, FaQuestion } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdCreate } from "react-icons/md";
import { CiLogout, CiSettings, CiViewList } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { TbManualGearbox } from "react-icons/tb";
import { GrContact } from "react-icons/gr";
// Types
import MetaProps from "./core/interfaces/MetaProps";
import PageLink from "./core/types/PageLink";
import SocialMediaIconProps from "./core/interfaces/SocialMediaIconProps";
import HomeCardContent from "./core/types/HomeCardContent";
import ImageUrl from "./core/types/LogoImageUrl";
import OAuthOptionContent from "./core/types/OAuthOptionContent";
import { FcGoogle } from "react-icons/fc";

export const homePageUrl = "/home";
export const sitePhoneNumber = "0754189293(fake)";
export const siteEmail = "thisemaildoesnotexit@nothing.com";

export const defaultProfile = {
  id: "",
  username: "",
  email: "",
  password: "",
  imageUrl:
    "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg",
  age: 8,
  ingredients: [],
  utensils: [],
  recipes: [],
  dayTemplates: [],
  instanceTemplates: [],
  mealPrepPlans: [],
  mealPrepLogs: [],
  notificationSettings: {
    id: "",
    allowedNotifications: true,
    notificationImageUrl: "",
    notificationStyle: "default",
  },
  notificationSettingsId: "",
};

export const defaultTemplateProfile = {
  username: "",
  email: "",
  password: "",
  imageUrl:
    "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg",
  age: 8,
};

export const OAuthOptionsContent: OAuthOptionContent[] = [
  {
    id: 1,
    textContent: "Sign In with Google",
    reactIcon: FcGoogle({}),
    optionType: "google",
  },
  {
    id: 2,
    textContent: "Sign In with Github",
    reactIcon: FaGithub({}),
    optionType: "github",
  },
];

export const authFormPageTemplateImageUrls: ImageUrl[] = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709992754/VitalPrep/wallpaperflare.com_wallpaper_3_dss9dm.jpg",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1710063057/VitalPrep/bamboo-bamboo-whisk-board-bowls_dehtz1.jpg",
  },
];

export const homeCardsContent: HomeCardContent[] = [
  {
    id: 1,
    information:
      "VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans.",
    title: "What is Vital Prep??",
    type: "introduction",
    backgroundColor: "#422c17",
  },
  {
    id: 2,
    information:
      "Meal Prep, short for meal preparation, is the practice of planning and preparing meals in advance, typically for a period of several days to a week.",
    title: "What is a Meal Prep?",
    type: "generic",
    backgroundColor: "#432517",
  },
  {
    id: 3,
    information:
      "Meal Prep saves time, money, and ensures healthier eating habits by preparing meals in advance for convenience and consistency. It also helps those who want to lose/gain weight by making them prepare their own meals, which on average are way healthier than processed foods.",
    title: "Why would i want to meal prep?",
    type: "generic",
    backgroundColor: "#423217",
  },
  {
    id: 4,
    information:
      "Meal Prep difficulty varies based on complexity, dietary needs and kitchen skills. \n If you have never done a meal prep before please checkout the Getting Started Page. If you want to get started right away you can do so by adding a few Ingredients then creating a Recipe using the Create Tool Page.",
    title: "How hard is it to Meal Prep?",
    type: "withLinks",
    withLinksCardReferenceId: 1,
    backgroundColor: "#421d17",
  },
];

export const pageLinks: PageLink[] = [
  {
    id: 1,
    linkDest: homePageUrl,
    reactIcon: FaHome({}),
    linkTitle: "Home",
    linkType: "normal",
  },
  {
    id: 2,
    linkDest: "/logs",
    reactIcon: IoIosPaper({}),
    linkTitle: "Meal Prep Logs",
    linkType: "normal",
  },
  {
    id: 3,
    linkDest: "/create-log",
    reactIcon: MdCreate({}),
    linkTitle: "Create Log",
    linkType: "normal",
  },
  {
    id: 4,
    linkDest: "/multi-view-tool",
    reactIcon: CiViewList({}),
    linkTitle: "Multi-View Tool",
    linkType: "normal",
  },
  {
    id: 5,
    linkDest: "/profile",
    reactIcon: IoPerson({}),
    linkTitle: "Profile",
    linkType: "normal",
  },
  {
    id: 6,
    linkDest: "/settings",
    reactIcon: CiSettings({}),
    linkTitle: "Settings",
    linkType: "normal",
  },
  {
    id: 7,
    linkDest: "/guide",
    reactIcon: TbManualGearbox({}),
    linkTitle: "Getting Started",
    linkType: "normal",
  },
  {
    id: 8,
    linkDest: "/faq",
    reactIcon: FaQuestion({}),
    linkTitle: "FAQ",
    linkType: "normal",
  },
  {
    id: 9,
    linkDest: "/about",
    reactIcon: FaInfoCircle({}),
    linkTitle: "About",
    linkType: "normal",
  },
  {
    id: 10,
    linkDest: "/contact",
    reactIcon: GrContact({}),
    linkTitle: "Contact",
    linkType: "normal",
  },
  {
    id: 11,
    linkDest: "",
    reactIcon: CiLogout({}),
    linkTitle: "Logout",
    linkType: "logout",
  },
];

export const socialMediaIcons: SocialMediaIconProps[] = [
  {
    id: 1,
    linkIconUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709127454/VitalPrep/Facebook_Logo_2023_1_tmhpp1.png",
    linkDest: "https://www.facebook.com",
    linkTitle: "Facebook",
  },
  {
    id: 2,
    linkIconUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709127441/VitalPrep/1384060_1_uocfj1.png",
    linkDest: "https://www.youtube.com",
    linkTitle: "Youtube",
  },
  {
    id: 3,
    linkIconUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709127467/VitalPrep/Instagram_icon_1_tghefy.png",
    linkDest: "https://instagram.com",
    linkTitle: "Instagram",
  },
  {
    id: 4,
    linkIconUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709127466/VitalPrep/github_1_alafgo.png",
    linkDest: "https://github.com",
    linkTitle: "Github",
  },
];

export const socialMediaIconReservedDimensions = 35;
export const logoUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1709049629/VitalPrep/Ellipse_1_sevedf.png";

export const logoImageUrls: ImageUrl[] = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709049629/VitalPrep/Ellipse_1_sevedf.png",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709916489/VitalPrep/Ellipse_2_nsiztb.png",
  },
];

export const metaDefaultProps: MetaProps = {
  title: "VitalPrep - Meal Prep Helper",
  desc: "VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans.",
  keywords:
    "monorepo, html, css, typescript, next, react, express, node, meal prep, planner, helper, simple",
};
