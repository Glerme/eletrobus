import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextFinalize } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import { Dispatch, useState } from "react";
import { Modal } from "~/components/Modal";
import { Title } from "~/components/Layouts/Title";
import { THEME } from "~/styles/theme";
import { useModal } from "~/hooks/useModal";
import { ModalStatement } from "~/components/ModalStatement";
import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";
import { EStatusRun } from "~/enum/EStatusRun";

interface finalizeInterface {
  setBusRoute: Dispatch<RoutesBusStopsInterface | null>;
  setIsRunning: Dispatch<boolean>;
  cleanParams: () => void;
  courseId: string;
}

export const FinalizeButton = ({
  setIsRunning,
  setBusRoute,
  cleanParams,
  courseId,
}: finalizeInterface) => {
  const [time, setTime] = useState<number>(0);
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

  const fnStatement = async () => {
    await postChangeStatusCourse(courseId, EStatusRun.Finalizado.id);
    setIsRunning(false);
    setBusRoute(null);
    cleanParams();
  };
  return (
    <>
      <Container>
        <TextFinalize onPress={handleOpenModal}>
          <Text lineHeight={15} color="white">
            Finalizar percurso
          </Text>
        </TextFinalize>
      </Container>
      <ModalStatement
        title="Finalizar percurso"
        description="Deseja Finalizar o corrida?"
        handleCloseModal={handleCloseModal}
        modalRef={modalRef}
        fnStatement={fnStatement}
      />
      {/* <Modal
        forwardedRef={modalRef}
        HeaderComponent={
          <VStack px={23} mt={6}>
            <Title size="md" textAlign={"left"}>
              Finalizar percurso
            </Title>
          </VStack>
        }
      >
        <VStack px={23} mt={6} mb={6}>
          <Text fontSize="md" color="black">
            Deseja Finalizar o corrida?
          </Text>

          <HStack space={2} mt={2}>
            <Button
              flex={1}
              h={12}
              colorScheme="primary"
              bg="red.600"
              onPress={handleCloseModal}
            >
              <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                Não
              </Text>
            </Button>
            <Button
              flex={1}
              h={12}
              colorScheme="primary"
              bg={THEME.colors.primary["500"]}
              onPress={() => {
                setIsRunning(false);
                setBusRoute(null);
                cleanParams();
              }}
            >
              <HStack space={1} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                  Sim
                </Text>
              </HStack>
            </Button>
          </HStack>
        </VStack>
      </Modal> */}
    </>
  );
};
