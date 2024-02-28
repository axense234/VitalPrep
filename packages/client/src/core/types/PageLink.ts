import { ReactElement } from "react";

type PageLink = {
  id?: string | number;
  linkDest: string;
  reactIcon: ReactElement;
  linkTitle: string;
  linkType: "normal" | "logout";
};

export default PageLink;
