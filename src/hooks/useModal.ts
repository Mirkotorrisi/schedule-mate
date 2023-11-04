import { Dayjs } from "dayjs";
import { useState } from "react";
import { Slot } from "../components/Day/useDay";

export type ModalContent = {
  selectedDate: Dayjs | null;
  selectedSlot: Slot | null;
} | null;

export const useModal = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<ModalContent>({
    selectedDate: null,
    selectedSlot: null,
  });

  const handleModal = (content: ModalContent = null) => {
    setShowModal(!showModal);
    if (content) {
      setModalContent(content);
    }
  };

  return { showModal, handleModal, modalContent };
};
