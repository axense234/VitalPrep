// React Icons
import { FaGithub, FaHome, FaInfoCircle, FaQuestion } from "react-icons/fa";
import { IoIosPaper } from "react-icons/io";
import { MdCreate } from "react-icons/md";
import { CiLogout, CiSettings, CiViewList } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { TbManualGearbox } from "react-icons/tb";
import { GrContact } from "react-icons/gr";
import { FcGoogle } from "react-icons/fc";
// Types
import PageLink from "./core/types/PageLink";
import SocialMediaIconProps from "./core/interfaces/SocialMediaIconProps";
import HomeCardContent from "./core/types/HomeCardContent";
import ImageUrl from "./core/types/LogoImageUrl";
import OAuthOptionContent from "./core/types/OAuthOptionContent";
import CreateToolOption from "./core/types/CreateToolOption";
import IngredientTemplate from "./core/types/entity/ingredient/IngredientTemplate";
import UtensilTemplate from "./core/types/entity/utensil/UtensilTemplate";
import RecipeTemplate from "./core/types/entity/recipe/RecipeTemplate";
import { ImageOption } from "./core/types/ImageOption";
import DayTemplateTemplate from "./core/types/entity/dayTemplate/DayTemplateTemplate";
import InstanceTemplateTemplate from "./core/types/entity/instanceTemplate/InstanceTemplateTemplate";
import MealPrepPlanTemplate from "./core/types/entity/mealPrepPlan/MealPrepPlanTemplate";
import EntityQueryValues from "./core/types/entity/EntityQueryValues";
import EntitySortingOptions from "./core/types/entity/EntitySortingOptions";
import MealPrepLogTemplate from "./core/types/entity/mealPrepLog/MealPrepLogTemplate";
import FAQPageSection from "./core/types/FAQPageSection";
import UserType from "./core/types/entity/users/UserType";
import HomeSectionContentProps from "./core/interfaces/HomeSectionContentProps";
import PageTitleContentType from "./core/types/PageTitleContentType";
import { GettingStartedContentMapContentType } from "./core/types/GettingStartedContentMapContentType";

export const homePageUrl = "/home";
export const sitePhoneNumber = "0754 189 293(fake)";
export const siteEmail = "thisemaildoesnotexit@nothing.com";

export const langFlagsImages = [
  {
    id: 1,
    imageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716043250/Flag_of_Romania_bcoghi.png",
    imageLabel: "Romanian",
    value: "ro",
  },
  {
    id: 2,
    imageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716043251/18165_bswuth.jpg",
    imageLabel: "English",
    value: "en",
  },
  {
    id: 3,
    imageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716454499/Flag_of_France_wl0boq.png",
    imageLabel: "French",
    value: "fr",
  },
  {
    id: 4,
    imageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716455526/Flag_of_Germany__3-2_.svg_jxwz7r.png",
    imageLabel: "German",
    value: "de",
  },
];

export const gettingStartedGuideContentMapContent: GettingStartedContentMapContentType =
  [
    {
      id: 1,
      sectionLabel: "The Basics",
      sectionValue: "basics",
      sectionContent: [
        {
          orderLetter: "a",
          subsectionLabel: "Guide Goal",
          subsectionLinkDest: "#guideGoal",
        },
        {
          orderLetter: "b",
          subsectionLabel: "Create Tool Page",
          subsectionLinkDest: "#createToolPage",
        },
        {
          orderLetter: "c",
          subsectionLabel: "Multi-View Tool Page",
          subsectionLinkDest: "#multiViewToolPage",
        },
        {
          orderLetter: "d",
          subsectionLabel: "View Tool Page",
          subsectionLinkDest: "#viewToolPage",
        },
      ],
    },
    {
      id: 2,
      sectionLabel: "Entities",
      sectionValue: "entities",
      sectionContent: [
        {
          orderLetter: "a",
          subsectionLabel: "Ingredients",
          subsectionLinkDest: "#ingredients",
        },
        {
          orderLetter: "b",
          subsectionLabel: "Utensils",
          subsectionLinkDest: "#utensils",
        },
        {
          orderLetter: "c",
          subsectionLabel: "Recipes",
          subsectionLinkDest: "#recipes",
        },
        {
          orderLetter: "d",
          subsectionLabel: "Day Plans",
          subsectionLinkDest: "#dayPlans",
        },
        {
          orderLetter: "e",
          subsectionLabel: "Session Templates",
          subsectionLinkDest: "#sessionTemplates",
        },
        {
          orderLetter: "f",
          subsectionLabel: "Meal Prep Plans",
          subsectionLinkDest: "#mealPrepPlans",
        },
      ],
    },
    {
      id: 3,
      sectionLabel: "Session Logs",
      sectionValue: "logs",
      sectionContent: [
        {
          orderLetter: "a",
          subsectionLabel: "What are Session Logs?",
          subsectionLinkDest: "#whatAreSessionLogs",
        },
        {
          orderLetter: "b",
          subsectionLabel: "How to Create a Session Log?",
          subsectionLinkDest: "#createSessionLogs",
        },
        {
          orderLetter: "c",
          subsectionLabel: "How to View a Session Log?",
          subsectionLinkDest: "#viewSessionLogs",
        },
      ],
    },
    {
      id: 4,
      sectionLabel: "Profile, Settings and Extras",
      sectionValue: "extras",
      sectionContent: [
        {
          orderLetter: "a",
          subsectionLabel: "Profile Page",
          subsectionLinkDest: "#profilePage",
        },
        {
          orderLetter: "b",
          subsectionLabel: "Settings Page",
          subsectionLinkDest: "#settingsPage",
        },
        {
          orderLetter: "c",
          subsectionLabel: "Feedback",
          subsectionLinkDest: "#feedback",
        },
        {
          orderLetter: "d",
          subsectionLabel: "Notifications",
          subsectionLinkDest: "#notifications",
        },
        {
          orderLetter: "e",
          subsectionLabel: "Conclusion",
          subsectionLinkDest: "#conclusion",
        },
      ],
    },
  ];

export const pageTitleContent: PageTitleContentType[] = [
  {
    id: 1,
    specificPagePath: "/create-tool",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714922257/VitalPrep/E5CLZDMYERHVRFH2IPKEXKQSEA_a3belu.jpg",
    pageTitleTextContent: "Create Tool",
    pageSubTitleContent: "create what you need",
  },
  {
    id: 2,
    specificPagePath: "/create-log",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714922259/VitalPrep/pre_prepared_meals_pqenm1.png",
    pageTitleTextContent: "Add Session Log",
    pageSubTitleContent: "save your session log",
  },
  {
    id: 3,
    specificPagePath: "/multi-view-tool",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "Multi-View Tool",
    pageSubTitleContent: "see all the stuff you need",
  },
  {
    id: 4,
    specificPagePath: "/logs",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923610/VitalPrep/iamge6_mosykq.png",
    pageTitleTextContent: "Session Logs",
    pageSubTitleContent: "see all your logs",
  },
  {
    id: 5,
    specificPagePath: "/ingredient",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Ingredient",
    pageSubTitleContent: "the base of every recipe",
  },
  {
    id: 6,
    specificPagePath: "/utensil",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Utensil",
    pageSubTitleContent: "your cooking tool",
  },
  {
    id: 7,
    specificPagePath: "/recipe",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Recipe",
    pageSubTitleContent: "savor and enjoy",
  },
  {
    id: 8,
    specificPagePath: "/dayTemplate",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Day Plan",
    pageSubTitleContent: "your day plan",
  },
  {
    id: 9,
    specificPagePath: "/instanceTemplate",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Session Template",
    pageSubTitleContent: "your weekly session scheme",
  },
  {
    id: 10,
    specificPagePath: "/mealPrepPlan",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Meal Prep Plan",
    pageSubTitleContent: "your plan to follow",
  },
  {
    id: 11,
    specificPagePath: "/mealPrepLog",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923609/VitalPrep/iamge4_vgdmkb.png",
    pageTitleTextContent: "View Session Log",
    pageSubTitleContent: "your saved meal prep log",
  },
  {
    id: 12,
    specificPagePath: "/profile",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715149532/VitalPrep/wallpaperflare_1_mealprep_nrihvi.png",
    pageTitleTextContent: "Profile",
    pageSubTitleContent: "view your profile",
  },
  {
    id: 13,
    specificPagePath: "/settings",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715149532/VitalPrep/wallpaperflare_1_mealprep_nrihvi.png",
    pageTitleTextContent: "Settings",
    pageSubTitleContent: "update your settings",
  },
  {
    id: 14,
    specificPagePath: "/contact",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715166007/VitalPrep/wallpaperflare.com_wallpaper_koxz6s.jpg",
    pageTitleTextContent: "Contact",
    pageSubTitleContent: "get in touch with us",
  },
  {
    id: 15,
    specificPagePath: "/guide",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715168276/VitalPrep/vecteezy_ai-generated-five-different-meal-boxes-with-different-types_36807454_t02dn1.jpg",
    pageTitleTextContent: "Getting Started",
    pageSubTitleContent: "the basic guide to VitalPrep",
  },
  {
    id: 15,
    specificPagePath: "/about",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715248516/vecteezy_meatless-meal-prep-convenient-healthy-and-budget-friendly_29882198_eyphoa.jpg",
    pageTitleTextContent: "About",
    pageSubTitleContent: "find more about us and the app",
  },
  {
    id: 16,
    specificPagePath: "/faq",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715248516/vecteezy_meatless-meal-prep-convenient-healthy-and-budget-friendly_29882198_eyphoa.jpg",
    pageTitleTextContent: "FAQ",
    pageSubTitleContent: "frequently asked questions",
  },
];

export const homeSectionsContent: HomeSectionContentProps[] = [
  {
    id: 1,
    sectionTitle: "Vital Prep",
    sectionSubTitle: "meal prep helper",
    contentBackgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714932026/VitalPrep/Frame_15hmwkp5_i6n4jw.png",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714922259/VitalPrep/pre_prepared_meals_pqenm1.png",
    ctaButtonContent: "Get Started",
    position: "left",
    type: "positional",
    sectionDescription:
      "VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans.",
    sectionPaddingBasedOnWindowWidth: "",
    tabletAndPhoneRedesign: false,
    ctaButtonLinkDest: "/guide",
  },
  {
    id: 2,
    sectionTitle: "Meal Prep",
    sectionSubTitle: "what is it?",
    contentBackgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714932222/VitalPrep/Group_6LOL_kdbrjk.png",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714922258/VitalPrep/iamge2_fwhqee.png",
    ctaButtonContent: "Learn More",
    position: "right",
    type: "positional",
    sectionDescription:
      "Meal Prep, short for meal preparation, is the practice of planning and preparing meals in advance, typically for a period of several days to a week.",
    sectionPaddingBasedOnWindowWidth: "",
    tabletAndPhoneRedesign: false,
    ctaButtonLinkDest: "/faq",
  },
  {
    id: 3,
    sectionTitle: "Plan Scheme",
    sectionSubTitle: "the meal prep plan scheme?",
    sectionImage:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1716111050/mpp-scheme-en_jpit3n.jpg",
    type: "imageBased",
    position: "right",
    sectionDescriptions: [
      {
        id: 1,
        stringValue:
          "A Meal Prep Plan can be easily understood by observing the following scheme.",
      },
      {
        id: 2,
        stringValue:
          "A Meal Prep Plan can be easily understood by observing the following scheme.",
      },
      {
        id: 3,
        stringValue:
          "When you prepare said meals, you will prepare them for an interval of days. This interval of days can be represented by a Session that uses a Session Template.",
      },
      {
        id: 4,
        stringValue:
          "Each Session Template is composed of Day Plans. Day Plans represent the plan of meals for that specific day. Each meal is also represented by a Recipe that uses Ingredients w/wo Utensils.",
      },
    ],
    sectionPaddingBasedOnWindowWidth: "",
    tabletAndPhoneRedesign: false,
  },
  {
    id: 4,
    sectionTitle: "Meal Prep Benefits",
    sectionSubTitle: "what you want",
    position: "left",
    type: "middle",
    sectionItems: [
      {
        id: 1,
        imageSrc:
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1714930835/VitalPrep/128x128_fztzec.png",
        itemDescription:
          "Meal Prepping saves you time by not having to cook everyday and money since ingredients tend to cost way less compared to other options.",
        itemTitle: "Money and Time",
      },
      {
        id: 2,
        imageSrc:
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1714930846/VitalPrep/128x128_xw9f3j.png",
        itemDescription:
          "Meal Prepping tends to use ingredients that are often extremely nutritious with a high satiety index and low calorie density.",
        itemTitle: "Health",
      },
      {
        id: 3,
        imageSrc:
          "https://res.cloudinary.com/birthdayreminder/image/upload/v1714930857/VitalPrep/128x128_qr2440.png",
        itemDescription:
          "Meal Prepping leaves you with no worries about food since you have prepared meals available. Cooking in general is a very relaxing activity, reducing stress and helping manage it in the future.",
        itemTitle: "Stress Reduction",
      },
    ],
    sectionPaddingBasedOnWindowWidth: "",
    tabletAndPhoneRedesign: false,
  },
  {
    id: 5,
    sectionTitle: "Difficulties?",
    sectionSubTitle: "we can help",
    contentBackgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1715355285/difficulties_shtsqm.png",
    backgroundImageSrc:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1714923610/VitalPrep/iamge5_p2bca4.png",
    position: "left",
    type: "descriptionBased",
    sectionPaddingBasedOnWindowWidth: "",
    tabletAndPhoneRedesign: false,
  },
];

export const aboutFrontendTechnologies = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764486/Icons%20and%20Stuff/HTML5_badge_ag98vs.webp",
    logoDest: "https://www.w3schools.com/html/",
    logoLabel: "HTML",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764497/Icons%20and%20Stuff/css-118-569410_pqbfyw.webp",
    logoDest: "https://www.w3schools.com/css/",
    logoLabel: "CSS",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063331/Icons%20and%20Stuff/typescript_logo_png_kl85ny.webp",
    logoDest: "https://www.typescriptlang.org/",
    logoLabel: "Typescript(TS)",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764549/Icons%20and%20Stuff/react_js_logo_icon512_b7nzgm.webp",
    logoDest: "https://react.dev/",
    logoLabel: "React - JS/TS Framework",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063415/Icons%20and%20Stuff/sass-logo-2_xkltmh.webp",
    logoDest: "https://sass-lang.com/",
    logoLabel: "SCSS",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764511/Icons%20and%20Stuff/redux-logo_ejnmb7.webp",
    logoDest: "https://redux.js.org/",
    logoLabel: "Redux & Redux Toolkit - React State Management Library",
  },
  {
    id: 7,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674571532/Icons%20and%20Stuff/nextjs_logo_hdppif.png",
    logoDest: "https://nextjs.org/",
    logoLabel: "NextJS - React Framework",
  },
];

export const aboutBackendTechnologies = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764542/Icons%20and%20Stuff/nodejs-logo-png--435_xz77cw.webp",
    logoDest: "https://nodejs.org/en",
    logoLabel: "NodeJS",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764524/Icons%20and%20Stuff/express-js-icon-20_onazqf.webp",
    logoDest: "https://expressjs.com/",
    logoLabel: "ExpressJS - NodeJS Web Framework",
  },
  {
    id: 3,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063331/Icons%20and%20Stuff/typescript_logo_png_kl85ny.webp",
    logoDest: "https://www.typescriptlang.org/",
    logoLabel: "Typescript(TS)",
  },
  {
    id: 4,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063477/Icons%20and%20Stuff/postgresql-logo-png-transparent_zxfyrt.webp",
    logoDest: "https://www.postgresql.org/",
    logoLabel: "PostgreSQL - SQL Database",
  },
  {
    id: 5,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063521/Icons%20and%20Stuff/redis-logo_i8mudb.webp",
    logoDest: "https://redis.io/",
    logoLabel: "Redis - Cache Database",
  },
  {
    id: 6,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063501/Icons%20and%20Stuff/prisma-logo-3805665B69-seeklogo.com_cj8pk8.webp",
    logoDest: "https://www.prisma.io/",
    logoLabel: "Prisma - DB ORM",
  },
];

export const aboutCloudServices = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1668764538/Icons%20and%20Stuff/netlify-logo-png-transparent_f4eya5.webp",
    logoDest: "https://www.netlify.com/",
    logoLabel: "Netlify",
  },
  {
    id: 2,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1674063547/Icons%20and%20Stuff/render_logo_fu2pxk.webp",
    logoDest: "https://render.com/",
    logoLabel: "Render",
  },
];

export const aboutMediaManagement = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1713861293/Icons%20and%20Stuff/cloudinary_cloud_glyph_512x512_qgwst5.png",
    logoDest: "https://cloudinary.com/",
    logoLabel: "Cloudinary",
  },
];

export const aboutVCS = [
  {
    id: 1,
    logoUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1713861987/Icons%20and%20Stuff/25231_xybfm1.png",
    logoDest: "https://github.com/",
    logoLabel: "Github",
  },
];

export const faqPageContent: FAQPageSection[] = [
  {
    id: 1,
    sectionTitle: "Introduction to Meal Prep",
    sectionDescription:
      "The following are some frequently asked questions by people who are new to meal prep and do not know where/how to start.",
    sectionAccordions: [
      {
        id: 1,
        accordionTitle: "What is Meal Prepping?",
        accordionContent:
          "Meal prepping involves preparing and portioning out meals in advance, typically for several days at a time. It's a strategy for saving time during busy weeks and ensuring you have healthy, homemade meals readily available.",
      },
      {
        id: 2,
        accordionTitle: "How does Meal Prepping save time?",
        accordionContent:
          "Meal prepping saves time by allowing you to prepare multiple meals at once, usually on a designated day like a weekend. This means you can cook in bulk, reducing the overall time spent in the kitchen during the week. Additionally, having pre-made meals ready to go eliminates the need to cook from scratch every day, streamlining meal preparation and reducing decision-making time.",
      },
      {
        id: 3,
        accordionTitle: "What are the benefits of Meal Prepping?",
        accordionContent:
          "Meal prepping offers several benefits, including time-saving, healthier eating, portion control, cost-effectiveness, reduced food waste, and consistency.",
      },
      {
        id: 4,
        accordionTitle: "How do I start Meal Prepping if I'm a beginner?",
        accordionContent:
          "To start meal prepping as a beginner, begin by planning your meals, making a grocery list, setting aside dedicated time, investing in storage containers, cooking in batches, portioning out meals, storing them properly, and reheating when ready to eat.",
      },
    ],
  },
  {
    id: 2,
    sectionTitle: "Meal Prep Essentials",
    sectionDescription:
      "The following are some frequently asked questions by people who have started to meal prep and want to get more in touch with the whole process.",
    sectionAccordions: [
      {
        id: 1,
        accordionTitle: "What equipment do I need for Meal Prepping?",
        accordionContent:
          "For meal prepping, you'll need basic kitchen equipment such as knives, cutting boards, pots and pans, meal prep containers, a food scale, mixing bowls, and measuring cups and spoons.",
      },
      {
        id: 2,
        accordionTitle:
          "How long do meal-prepped meals typically last in the fridge or freezer?",
        accordionContent:
          "Meal-prepped meals typically last in the refrigerator for about 3-4 days and in the freezer for 1-2 months, depending on the type of food and how well it's packaged. Proper storage in airtight containers helps maintain freshness and extends shelf life.",
      },
      {
        id: 3,
        accordionTitle:
          "How do I ensure my meal-prepped food stays fresh throughout the week?",
        accordionContent:
          "To ensure your meal-prepped food stays fresh throughout the week, use airtight containers, refrigerate promptly, label containers with the date of preparation, portion out meals properly, and avoid opening containers unnecessarily.",
      },
      {
        id: 4,
        accordionTitle:
          "Can I customize my Meal Prep based on my nutritional goals?",
        accordionContent:
          "Yes, you can customize your meal prep based on your nutritional goals. You have the flexibility to choose recipes and ingredients that align with your dietary needs, whether you're focusing on weight loss, muscle gain, or specific nutritional requirements.",
      },
      {
        id: 5,
        accordionTitle: "How do I calculate portion sizes for Meal Prepping?",
        accordionContent:
          "To calculate portion sizes for meal prepping, start by determining your nutritional needs based on factors like age, gender, weight, and activity level. Then, use tools like food scales or measuring cups to accurately portion out ingredients according to your dietary goals. It may also be helpful to consult with a nutritionist or use online resources to guide portion size calculations based on your specific needs.",
      },
      {
        id: 6,
        accordionTitle: "How often should I Meal Prep?",
        accordionContent:
          "How often you should meal prep depends on your personal schedule and preferences. Many people find it helpful to meal prep once or twice a week, typically on weekends or whenever they have free time. This allows them to prepare meals for several days ahead, reducing the need to cook every day. However, you can adjust the frequency based on your needs and lifestyle, whether it's meal prepping for the entire week or just a few days at a time.",
      },
      {
        id: 7,
        accordionTitle: "Is Meal Prepping cost-effective?",
        accordionContent:
          "Yes, meal prepping is often cost-effective. By buying ingredients in bulk and cooking meals at home, you can save money compared to regularly eating out or purchasing pre-made meals.",
      },
    ],
  },
  {
    id: 3,
    sectionTitle: "Meal Prep Recipes and Ideas",
    sectionDescription:
      "The following are some frequently asked questions by people who have more specific questions and/or want to spice up their meal preps.",
    sectionAccordions: [
      {
        id: 1,
        accordionTitle: "What are some common Meal Prepping mistakes to avoid?",
        accordionContent:
          "Some common meal prepping mistakes to avoid include not planning ahead, using improper storage containers, neglecting variety in meals, not accounting for portion sizes, and not labeling containers with the date of preparation.",
      },
      {
        id: 2,
        accordionTitle: "What are some easy Meal Prep recipes for beginners?",
        accordionContent:
          "Some easy meal prep recipes for beginners include overnight oats, sheet pan chicken and vegetables, quinoa salad bowls, veggie stir-fry with rice, and turkey and black bean wraps. These recipes are simple to prepare in bulk and can be customized with your favorite ingredients.",
      },
      {
        id: 3,
        accordionTitle: "How do I prevent meal boredom when Meal Prepping?",
        accordionContent:
          "To prevent meal boredom when meal prepping, incorporate variety by experimenting with different recipes, flavors, and cuisines. Rotate your meal options weekly to keep things interesting, and consider trying new ingredients or cooking methods to add excitement to your meals. Additionally, you can create theme days, such as Meatless Mondays or Taco Tuesdays, to add structure and diversity to your meal prep routine.",
      },
      {
        id: 4,
        accordionTitle:
          "Can I still Meal Prep if I have dietary restrictions or food allergies?",
        accordionContent:
          "Absolutely! You can still meal prep with dietary restrictions or food allergies. Just choose recipes and ingredients that align with your dietary needs, and there are plenty of resources available to help you find suitable options.",
      },
      {
        id: 5,
        accordionTitle:
          "Can I Meal Prep for specific diets, like keto, vegan, or gluten-free?",
        accordionContent:
          "Yes, you can meal prep for specific diets like keto, vegan, or gluten-free. There are plenty of recipes and resources available tailored to these dietary preferences. Simply choose recipes and ingredients that align with your chosen diet, and you can effectively meal prep while adhering to your dietary requirements.",
      },
      {
        id: 6,
        accordionTitle: "Can I Meal Prep snacks and desserts too?",
        accordionContent:
          "Yes, you can definitely meal prep snacks and desserts. Prepare healthy snacks like fruit and nut packs, yogurt parfaits, or vegetable sticks with hummus for easy grab-and-go options. For desserts, consider making batches of healthier treats like energy balls, granola bars, or baked goods using wholesome ingredients. Meal prepping snacks and desserts can help satisfy cravings while supporting your overall dietary goals.",
      },
      {
        id: 7,
        accordionTitle:
          "How do I keep my meal-prepped meals interesting and flavorful?",
        accordionContent:
          "To keep your meal-prepped meals interesting and flavorful, experiment with a variety of herbs, spices, sauces, and marinades to add depth of flavor. Incorporate different cooking techniques such as grilling, roasting, or sautéing to enhance the taste and texture of your meals. Additionally, try incorporating a mix of colorful fruits and vegetables, whole grains, and lean proteins to create visually appealing and tasty dishes. Don't be afraid to get creative and try new recipes to keep your meals exciting and enjoyable.",
      },
    ],
  },
  {
    id: 4,
    sectionTitle: "Storage and Practical Tips",
    sectionDescription:
      "The following are some frequently asked questions by people who have questions about efficient containment, cooking time, size, reheating of meals in a meal prep.",
    sectionAccordions: [
      {
        id: 1,
        accordionTitle: "How do I store meal-prepped meals properly?",
        accordionContent:
          "After meal prepping, transfer your meals into airtight containers to maintain freshness and prevent contamination. Store them in the refrigerator at temperatures below 40°F (4°C) to slow bacterial growth and extend their shelf life. Make sure to label containers with the date of preparation to track freshness. When reheating, ensure food reaches an internal temperature of 165°F (74°C) to kill any harmful bacteria.",
      },
      {
        id: 2,
        accordionTitle:
          "What are the best containers for storing meal-prepped meals?",
        accordionContent:
          "The best containers for storing meal-prepped meals are airtight containers made of glass or BPA-free plastic. These containers help to maintain freshness, prevent leaks, and are microwave and dishwasher safe for easy reheating and cleaning. Look for containers with compartments to keep different components of your meal separate, and consider investing in a variety of sizes to accommodate different portion sizes and meal types.",
      },
      {
        id: 3,
        accordionTitle: "Can I meal prep for the whole family?",
        accordionContent:
          "Yes, you can definitely meal prep for the whole family. Simply adjust your recipes and portion sizes to accommodate the number of people you're feeding. Consider preparing larger batches of meals and using family-sized containers or multiple individual containers to store portions for everyone. Involving family members in the meal prep process can also make it a fun and collaborative activity.",
      },
      {
        id: 4,
        accordionTitle:
          "What is the ideal number of meals to include in my meal prep?",
        accordionContent:
          "The ideal number of meals to include in your meal prep depends on your personal schedule and dietary needs. Some people prefer to prep all meals for the week, including breakfast, lunch, and dinner, while others may only prep lunches or dinners. Start by considering how many meals you typically eat at home versus dining out, and then plan accordingly. You can always adjust the number of meals as needed based on your preferences and lifestyle.",
      },
      {
        id: 5,
        accordionTitle:
          "How do I reheat meal-prepped food to maintain its quality?",
        accordionContent:
          "To maintain the quality of meal-prepped food when reheating, it's best to use gentle heating methods such as microwaving, steaming, or oven reheating. Avoid overheating, which can cause the food to dry out or become rubbery. Cover the food with a microwave-safe lid or damp paper towel to retain moisture during microwaving. For oven reheating, use a lower temperature and cover the dish with aluminum foil to prevent excessive drying. Stirring or flipping halfway through can also help ensure even reheating.",
      },
      {
        id: 6,
        accordionTitle:
          "What is the recommended duration for my meal prep cooking sessions?",
        accordionContent:
          "The recommended duration for meal prep cooking sessions depends on factors such as the number of meals you're preparing, your cooking skills, and the complexity of the recipes. Generally, aim for a few hours, such as 2-3 hours, to prepare meals for the week. However, you can adjust the duration based on your schedule and preferences. Some people prefer shorter, more frequent meal prep sessions, while others may dedicate a longer block of time to prep for the entire week. Experiment to find what works best for you.",
      },
    ],
  },
];

export const notificationMessageStyles = [
  { id: 1, label: "Default", value: "default" },
  { id: 2, label: "Serious", value: "serious" },
  { id: 3, label: "Motivating", value: "motivating" },
  { id: 4, label: "Menacing", value: "menacing" },
];

export const defaultEntityQueryValues: EntityQueryValues = {
  sortByKey: "name",
  sortByOrder: "asc",
  searchByKey: "name",
  searchByValue: "",
};

export const entitySearchByOptions: EntitySortingOptions = {
  ingredient: [{ label: "Name of Ingredient", value: "name" }],
  utensil: [{ label: "Name of Utensil", value: "name" }],
  recipe: [{ label: "Name of Recipe", value: "name" }],
  dayTemplate: [{ label: "Name of Day Plan", value: "name" }],
  instanceTemplate: [{ label: "Name of Session Template", value: "name" }],
  mealPrepPlan: [{ label: "Name of Meal Prep Plan", value: "name" }],
  mealPrepLog: [{ label: "Name of Session Log", value: "name" }],
};

export const entitySortingOptions: EntitySortingOptions = {
  ingredient: [
    {
      label: "Ingredient Name",
      value: "name",
    },
    {
      label: "Commonly used Ingredients",
      value: "numberOfRecipes",
    },
  ],
  utensil: [
    {
      label: "Name of Utensils",
      value: "name",
    },
    {
      label: "Commonly used Utensils",
      value: "numberOfRecipes",
    },
  ],
  recipe: [
    {
      label: "Name of Recipes",
      value: "name",
    },
    {
      label: "Commonly used Recipes",
      value: "numberOfDayTemplates",
    },
  ],
  dayTemplate: [
    {
      label: "Name of Day Plans",
      value: "name",
    },
    {
      label: "Commonly used Day Plans",
      value: "numberOfInstanceTemplates",
    },
  ],
  instanceTemplate: [
    {
      label: "Name of Session Templates",
      value: "name",
    },
    {
      label: "Commonly used Session Templates",
      value: "numberOfMealPrepPlans",
    },
    {
      label: "Coverage Of Session Templates",
      value: "coverage",
    },
  ],
  mealPrepPlan: [
    {
      label: "Name of Meal Prep Plans",
      value: "name",
    },
  ],
  mealPrepLog: [
    { label: "Name of Session Logs", value: "name" },
    {
      label: "Completion of Session Logs",
      value: "completed",
    },
  ],
};

export const defaultCreateDayTemplateImageUrls: ImageOption[] = [
  {
    id: 1,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876222/VitalPrep/Default_Day_Instance_Image_Mon_hakwsj.jpg",
    titleContent: "Monday",
  },
  {
    id: 2,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876238/VitalPrep/Default_Day_Instance_Imagejpeg_fvlcgq.jpg",
    titleContent: "Tuesday",
  },
  {
    id: 3,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876239/VitalPrep/Default_Day_Instance_Imagejpeg-1_tgx26h.jpg",
    titleContent: "Wednesday",
  },
  {
    id: 4,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876240/VitalPrep/Default_Day_Instance_Imagejpeg-2_gz1vqx.jpg",
    titleContent: "Thursday",
  },
  {
    id: 5,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876240/VitalPrep/Default_Day_Instance_Imagejpeg-3_tswqd1.jpg",
    titleContent: "Friday",
  },
  {
    id: 6,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876241/VitalPrep/Default_Day_Instance_Imagejpeg-4_ij5ffv.jpg",
    titleContent: "Saturday",
  },
  {
    id: 7,
    imageUrl:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1711876242/VitalPrep/Default_Day_Instance_Imagejpeg-5_ikzec9.jpg",
    titleContent: "Sunday",
  },
];

export const defaultProfileImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg";

export const defaultIngredientImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636407/VitalPrep/defaultImages/carrot_xpoyp9.png";

export const defaultUtensilImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636503/VitalPrep/defaultImages/fork_lol_knepjl.png";

export const defaultRecipeImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636514/VitalPrep/defaultImages/fried_eg_qxsqu5.png";

export const defaultDayTemplateImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636544/VitalPrep/defaultImages/breakfast_fgotre.png";

export const defaultInstanceTemplateImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636577/VitalPrep/defaultImages/mushroom_yf6xcn.png";

export const defaultMealPrepPlanImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636589/VitalPrep/defaultImages/potato_teb7ko.png";

export const defaultMealPrepLogImageUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1716636620/VitalPrep/defaultImages/mushrooms_pcmyy5.png";

export const createToolOptions: CreateToolOption[] = [
  {
    id: 1,
    label: "Ingredient",
    optionValue: "ingredient",
    associatedColor: "#FFAE00",
    associatedTextColor: "#120A06",
  },
  {
    id: 2,
    label: "Utensil",
    optionValue: "utensil",
    associatedColor: "#FF6000",
    associatedTextColor: "#120A06",
  },
  {
    id: 3,
    label: "Recipe",
    optionValue: "recipe",
    associatedColor: "#8B0000",
    associatedTextColor: "#DDD9D5",
  },
  {
    id: 4,
    label: "Day Plan",
    optionValue: "dayTemplate",
    associatedColor: "#013310",
    associatedTextColor: "#DDD9D5",
  },
  {
    id: 5,
    label: "Session Template",
    optionValue: "instanceTemplate",
    associatedColor: "#012433",
    associatedTextColor: "#DDD9D5",
  },
  {
    id: 6,
    label: "Meal Prep Plan",
    optionValue: "mealPrepPlan",
    associatedColor: "#42171C",
    associatedTextColor: "#DDD9D5",
  },
];

export const defaultProfile: UserType = {
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
    allowAutomaticCreationOfLogs: true,
    allowDayReminderNotifications: true,
    allowPostSessionReminderNotifications: true,
    allowPreSessionReminderNotifications: true,
    reminderIntervalInHours: 3,
  },
  notificationSettingsId: "",
  mealPrepPlanInUseId: "",
};

export const defaultTemplateProfile = {
  username: "",
  email: "",
  password: "",
  imageUrl:
    "https://res.cloudinary.com/birthdayreminder/image/upload/v1708852560/VitalPrep/defaultprofileimage_tzrh3w.jpg",
  age: 8,
  notificationSettings: {
    allowedNotifications: true,
    notificationImageUrl: defaultInstanceTemplateImageUrl,
    notificationStyle: "default",
  },
};

export const defaultTemplateIngredient: IngredientTemplate = {
  name: "",
  imageUrl: defaultIngredientImageUrl,
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
};

export const defaultTemplateUtensil: UtensilTemplate = {
  name: "",
  imageUrl: defaultUtensilImageUrl,
};

export const defaultTemplateRecipe: RecipeTemplate = {
  name: "",
  imageUrl: defaultRecipeImageUrl,
  ingredients: [],
  utensils: [],
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
  recipeTutorial: {
    videoTutorial: "",
    writtenTutorial: "",
    id: "placeholder",
  },
};

export const defaultTemplateDayTemplate: DayTemplateTemplate = {
  name: "",
  recipes: [],
  imageUrl: defaultDayTemplateImageUrl,
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
};

export const defaultTemplateInstanceTemplate: InstanceTemplateTemplate = {
  name: "",
  dayTemplates: [],
  imageUrl: defaultInstanceTemplateImageUrl,
  coverage: 0,
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
};

export const defaultTemplateMealPrepLog: MealPrepLogTemplate = {
  name: "",
  imageUrl: defaultMealPrepLogImageUrl,
  completed: true,
  cookingDuration: 1,
  date: new Date(),
  dayTemplates: [],
  ingredients: [],
  recipes: [],
  utensils: [],
  instanceTemplate: defaultTemplateInstanceTemplate,
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
};

export const defaultTemplateMealPrepPlan: MealPrepPlanTemplate = {
  name: "",
  instanceTemplates: [],
  imageUrl: defaultMealPrepPlanImageUrl,
  instanceTemplatesTimings: [],
  macros: {
    id: "placeholder",
    calories: 200,
    carbsAmount: 20,
    proteinAmount: 20,
    fatsAmount: 2,
  },
};

export const OAuthOptionsContent: OAuthOptionContent[] = [
  {
    id: 1,
    reactIcon: FcGoogle({}),
    optionType: "google",
  },
  {
    id: 2,
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
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1709133342/VitalPrep/wallpaperflare_1_qmx5uv.png",
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

export const weekdayFormControlContent = defaultCreateDayTemplateImageUrls;

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
    linkTitle: "Session Logs",
    linkType: "normal",
  },
  {
    id: 3,
    linkDest: "/create-log",
    reactIcon: MdCreate({}),
    linkTitle: "Add Session Log",
    linkType: "normal",
  },
  {
    id: 4,
    linkDest: "/create-tool",
    reactIcon: MdCreate({}),
    linkTitle: "Create Tool",
    linkType: "normal",
  },
  {
    id: 5,
    linkDest: "/multi-view-tool",
    reactIcon: CiViewList({}),
    linkTitle: "Multi-View Tool",
    linkType: "normal",
  },
  {
    id: 6,
    linkDest: "/profile",
    reactIcon: IoPerson({}),
    linkTitle: "Profile",
    linkType: "normal",
  },
  {
    id: 7,
    linkDest: "/settings",
    reactIcon: CiSettings({}),
    linkTitle: "Settings",
    linkType: "normal",
  },
  {
    id: 8,
    linkDest: "/guide",
    reactIcon: TbManualGearbox({}),
    linkTitle: "Getting Started",
    linkType: "normal",
  },
  {
    id: 9,
    linkDest: "/faq",
    reactIcon: FaQuestion({}),
    linkTitle: "FAQ",
    linkType: "normal",
  },
  {
    id: 10,
    linkDest: "/about",
    reactIcon: FaInfoCircle({}),
    linkTitle: "About",
    linkType: "normal",
  },
  {
    id: 11,
    linkDest: "/contact",
    reactIcon: GrContact({}),
    linkTitle: "Contact",
    linkType: "normal",
  },
  {
    id: 12,
    linkDest: "/logout",
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
    linkDest: "https://github.com/axense234/VitalPrep",
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

export const APP_NAME = "VitalPrep";
export const APP_DEFAULT_TITLE = "VitalPrep - Meal Prep Helper";
export const APP_TITLE_TEMPLATE = "%s - PWA App";
export const APP_DESCRIPTION =
  "VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans.";
export const APP_KEYWORDS =
  "monorepo, html, css, typescript, next, react, express, node, meal prep, planner, helper, simple";
export const APP_ICON =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1719327525/VitalPrep/brandmark-design-16x16_btxkmi.png";
