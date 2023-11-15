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
import { ModalStatement } from "~/components/ModalStatement";

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

  const fnStatement = () => {
    setIsRunning(true);
  };

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
      <ModalStatement
        title="Confirmação de percurso"
        description="Deseja começar o percurso? nome percurso"
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        fnStatement={fnStatement}
      />
    </>
  );
};
