import { RefObject, useEffect } from "react";

const useScrollPopupModalIntoView = (
  modalRef: RefObject<HTMLDivElement>,
  showModal: boolean,
  modalType: "general" | "form"
) => {
  useEffect(() => {
    if (modalRef.current && showModal) {
      modalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showModal, modalRef.current, modalType]);
};

export default useScrollPopupModalIntoView;
