import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { Link } from "./navigation";

const locales = ["en", "ro"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    defaultTranslationValues: {
      span: (chunks: React.ReactNode) => <span>{chunks}</span>,
      profile: (chunks: React.ReactNode) => (
        <Link href="/profile">{chunks}</Link>
      ),
      createTool: (chunks: React.ReactNode) => (
        <Link href="/create-tool">{chunks}</Link>
      ),
      multiViewTool: (chunks: React.ReactNode) => (
        <Link href="/multi-view-tool">{chunks}</Link>
      ),
      settings: (chunks: React.ReactNode) => (
        <Link href="/settings">{chunks}</Link>
      ),
      faq: (chunks: React.ReactNode) => <Link href="/faq">{chunks}</Link>,
      contact: (chunks: React.ReactNode) => (
        <Link href="/contact">{chunks}</Link>
      ),
    },
  };
});
