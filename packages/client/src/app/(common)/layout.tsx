"use client";

// Components
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Sidebar from "@/components/shared/Sidebar";
import PopupModal from "@/components/shared/modals/PopupModal";
// Redux
import {
  changeShowGeneralModal,
  selectIsModalUsedWhenLoading,
  selectShowGeneralModal,
  selectTemplateModalMessage,
  signupUserOAuth,
} from "@/redux/slices/generalSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// React
import { useEffect } from "react";

const SpecialLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const showGeneralModal = useAppSelector(selectShowGeneralModal);
  const isModalUsedWhenLoading = useAppSelector(selectIsModalUsedWhenLoading);
  const modalMessage = useAppSelector(selectTemplateModalMessage);

  useEffect(() => {
    const createVitalPrepAccount = localStorage.getItem(
      "createVitalPrepAccount"
    );
    if (createVitalPrepAccount === "create") {
      localStorage.removeItem("createVitalPrepAccount");
      dispatch(signupUserOAuth());
    }
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <PopupModal
        modalColor="#cfbea7"
        textColor="#120a06"
        hasBorder={true}
        closeModal={() => dispatch(changeShowGeneralModal(false))}
        modalType="general"
        showModal={showGeneralModal}
        isModalUsedWhenLoading={isModalUsedWhenLoading}
        modalMessage={modalMessage}
      />
      {children}
      <Footer />
    </>
  );
};

export default SpecialLayout;
