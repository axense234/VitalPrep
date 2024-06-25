"use server";
// Next
import { Metadata } from "next";
// Global SCSS
import "@/scss/abstracts/globals.scss";
// Data
import { metaDefaultProps } from "@/data";
// Providers
import ReduxProvider from "@/components/others/ReduxProvider";
// Next Intl stuff
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...metaDefaultProps,
    manifest: "./public/manifest.json",
    icons:
      "https://res.cloudinary.com/birthdayreminder/image/upload/v1719327525/VitalPrep/brandmark-design-16x16_btxkmi.png",
  };
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) => {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <div className="app-container">
          <NextIntlClientProvider messages={messages}>
            <ReduxProvider>{children}</ReduxProvider>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
