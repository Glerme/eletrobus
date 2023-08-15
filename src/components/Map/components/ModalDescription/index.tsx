import { VStack } from "native-base";

import { IMarker } from "~/interfaces/IMap";

import { Title } from "~/components/Layouts/Title";
import { ModalView } from "~/components/Layouts/ModalView";

interface ModalDescriptionProps {
  data: IMarker | null;
  openModal: boolean;
  setOpenModal: ({
    open,
    marker,
  }: {
    open: boolean;
    marker: IMarker | null;
  }) => void;
}

export const ModalDescription = ({
  data,
  openModal,
  setOpenModal,
}: ModalDescriptionProps) => {
  return (
    <ModalView
      visible={openModal}
      closeModal={() =>
        setOpenModal({
          marker: null,
          open: false,
        })
      }
      modalMarginTop={600}
      animationType="fade"
    >
      <VStack px={23} mt={6}>
        <Title size="md" textAlign={"left"}>
          {data?.title}
        </Title>
      </VStack>
    </ModalView>
  );
};
