import { ReactElement } from "react";

type OAuthOptionContent = {
  id?: number;
  reactIcon: ReactElement;
  textContent: string;
  optionType: "google" | "github";
};

export default OAuthOptionContent;
