import { ReactElement } from "react";

type OAuthOptionContent = {
  id?: number;
  reactIcon: ReactElement;
  signUpTextContent: string;
  logInTextContent: string;
  optionType: "google" | "github";
  pageType?: "login" | "signup";
};

export default OAuthOptionContent;
