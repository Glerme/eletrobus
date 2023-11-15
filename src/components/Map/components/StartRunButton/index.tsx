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
import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";
import { EStatusRun } from "~/enum/EStatusRun";
import Toast from "react-native-toast-message";

interface runningInterface {
  setIsRunning: Dispatch<boolean>;
  isRunning: boolean;
  busRoute: RoutesBusStopsInterface | null;
  courseId: string;
}
export const StartRunButton = ({
  setIsRunning,
  isRunning,
  busRoute,
  courseId,
}: runningInterface) => {
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [time, setTime] = useState<number>(0);

  const fnStatement = async () => {
    try {
      await postChangeStatusCourse(courseId, EStatusRun.EmCorrida.id);
      setIsRunning(true);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Erro ao iniciar corrida",
        text2: "Tente novamente mais tarde",
      });
    }
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
