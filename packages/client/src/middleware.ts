import createMiddleware from "next-intl/middleware";
import { localePrefix, locales, pathnames } from "./navigation";

export default createMiddleware({
  locales,
  localePrefix,
  pathnames,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(ro|en)/:path*"],
};
