import { ReactElement } from "react";

type OAuthOptionContent = {
  id?: number;
  reactIcon: ReactElement;
  signupTextContent: string;
  loginTextContent: string;
  optionType: "google" | "github";
  pageType?: "login" | "signup";
};

export default OAuthOptionContent;
