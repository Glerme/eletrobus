import { Modalize } from "react-native-modalize";
import { HStack, Text, VStack } from "native-base";
import { Bus } from "phosphor-react-native";

import { getColorFromState } from "~/utils/getColorFromState";

import { Modal } from "~/components/Modal";

interface ModalDescriptionProps {
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
  course: any;
}

export const ModalDescriptionBus = ({
  forwardedRef,
  onClose,
  course,
}: ModalDescriptionProps) => {
  return (
    <Modal
      forwardedRef={forwardedRef}
      modalHeight={400}
      adjustToContentHeight={false}
      onClose={onClose}
    >
      <VStack px={23} mt={6} space={2}>
        <HStack space={2} alignItems="center">
          <Bus color={getColorFromState(course?.status)} weight="duotone" />
          <Text fontSize="lg" fontWeight={"600"}>
            Veículo: {course?.vehicle?.plate ?? "-"}
          </Text>
        </HStack>

        <VStack
          borderBottomColor={"primary.500"}
          borderBottomWidth={"1px"}
          p={2}
        >
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.800"}>
            Placa:{" "}
            <Text color={"secondary.500"}>{course?.vehicle?.plate ?? "-"}</Text>
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.800"}>
            Status:{" "}
            <Text color={getColorFromState(course?.status)}>
              {course?.status ?? "Sem Status"}
            </Text>
          </Text>
        </VStack>
      </VStack>
    </Modal>
  );
};
