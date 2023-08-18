import { useRef } from "react";
import { Modalize } from "react-native-modalize";

export const useModal = () => {
  const modalRef = useRef<Modalize>(null);

  const handleOpenModal = () => {
    modalRef.current?.open();
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
  };

  return { handleOpenModal, handleCloseModal, modalRef };
};
