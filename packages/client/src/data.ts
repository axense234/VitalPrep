// React Icons
import { FaHome, FaInfoCircle, FaQuestion } from "react-icons/fa";
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

export const homePageUrl = "/";
export const sitePhoneNumber = "0754189293(fake)";
export const siteEmail = "thisemaildoesnotexit@nothing.com";

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
export const logoReservedDimensions = 100;
export const logoUrl =
  "https://res.cloudinary.com/birthdayreminder/image/upload/v1709049629/VitalPrep/Ellipse_1_sevedf.png";

export const metaDefaultProps: MetaProps = {
  title: "VitalPrep - Meal Prep Helper",
  desc: "VitalPrep is a complex meal prep helper app that helps people create meal prep plans and to follow those respective plans.",
  keywords:
    "monorepo, html, css, typescript, next, react, express, node, meal prep, planner, helper, simple",
};
