import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextStart } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import {
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { Dispatch, useEffect, useState } from "react";
import { useModal } from "~/hooks/useModal";
import { Title } from "~/components/Layouts/Title";
import { Modal } from "~/components/Modal";
import { THEME } from "~/styles/theme";
import { formatTemp } from "~/utils/format";

interface runningInterface {
  setIsRunning: Dispatch<boolean>;
  isRunning: boolean;
  busRoute: RoutesBusStopsInterface | null;
}
export const StartRunButton = ({
  setIsRunning,
  isRunning,
  busRoute,
}: runningInterface) => {
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    clearInterval(intervalRef);
    setTime(0);
    if (isRunning) {
      setIntervalRef(
        setInterval(() => {
          setTime((prev) => prev + 1);
        }, 1000)
      );
    }
  }, [isRunning]);
  if (isRunning)
    return (
      <Container>
        <HStack
          space={2}
          alignItems={"center"}
          backgroundColor="white"
          borderRadius={4}
          borderWidth={1}
          borderColor={"gray.400"}
          padding={2}
        >
          <Text lineHeight={15}>Corrida iniciada: {formatTemp(time)}</Text>
        </HStack>
      </Container>
    );
  return (
    <>
      <Container>
        <HStack>
          <TextStart onPress={handleOpenModal}>
            <Text lineHeight={15} color="white">
              Começar Percurso
            </Text>
            {/* <Plus color="white" /> */}
          </TextStart>
        </HStack>
      </Container>

      <Modal
        forwardedRef={modalRef}
        HeaderComponent={
          <VStack px={23} mt={6}>
            <Title size="md" textAlign={"left"}>
              Confirmação de percurso
            </Title>
          </VStack>
        }
      >
        <VStack px={23} mt={6} mb={6}>
          <Text fontSize="md" color="black">
            Deseja começar o percurso? nome percurso
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
                setIsRunning(true);
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
      </Modal>
    </>
  );
};
