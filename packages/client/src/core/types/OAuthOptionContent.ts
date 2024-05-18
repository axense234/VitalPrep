import { ReactElement } from "react";

type OAuthOptionContent = {
  id?: number;
  reactIcon: ReactElement;
  optionType: "google" | "github";
  pageType?: "login" | "signup";
};

export default OAuthOptionContent;
