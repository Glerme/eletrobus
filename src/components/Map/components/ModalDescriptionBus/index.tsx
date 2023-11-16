import { Modalize } from "react-native-modalize";
import { HStack, Text, VStack } from "native-base";
import { Bus, Path } from "phosphor-react-native";

import { getColorFromState } from "~/utils/getColorFromState";

import { Modal } from "~/components/Modal";
import { ICourse } from "~/interfaces/RoutesBusStops.interface";

interface ModalDescriptionProps {
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
  course: ICourse;

  routeActive: any;
}

export const ModalDescriptionBus = ({
  forwardedRef,
  onClose,
  routeActive,
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
          <Path color="#46B99E" weight="duotone" />
          <Text fontSize="md" fontWeight={"600"}>
            {routeActive?.name}
          </Text>
        </HStack>
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
