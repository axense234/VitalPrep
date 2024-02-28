// Next
import { Metadata } from "next";
// Global SCSS
import "@/scss/abstracts/globals.scss";
// Data
import { metaDefaultProps } from "@/data";
// Redux
import ReduxProvider from "@/components/others/ReduxProvider";
// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return metaDefaultProps;
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
