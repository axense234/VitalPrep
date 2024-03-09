// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";

const SpecialLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </>
  );
};

export default SpecialLayout;
