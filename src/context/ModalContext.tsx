import React, { createContext } from "react";
import AppointmentModal from "../components/AppointmentModal";
import { ModalContent, useModal } from "../hooks/useModal";

type ModalContextType = {
  showModal: boolean;
  handleModal: (content: ModalContent) => void;
  modalContent: ModalContent;
};

export const ModalContext = createContext<ModalContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
  const { showModal, handleModal, modalContent } = useModal();
  return (
    <ModalContext.Provider value={{ showModal, handleModal, modalContent }}>
      <AppointmentModal />
      {children}
    </ModalContext.Provider>
  );
};
