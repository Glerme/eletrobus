import { Dispatch, useEffect, useMemo, useState } from "react";

import { HStack, Text } from "native-base";
import Toast from "react-native-toast-message";

import { EStatusRun } from "~/enum/EStatusRun";

import { IStatus } from "~/interfaces/Status.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";

import { useModal } from "~/hooks/useModal";

import { formatTemp } from "~/utils/format";

import { ModalStatement } from "~/components/ModalStatement";

import { Container, TextStart } from "./styles";

interface runningInterface {
  setIsRunning: Dispatch<boolean>;
  isRunning: boolean;
  busRoute: RoutesBusStopsInterface | null;
  courseId: string;
  allStatus: IStatus[] | null;
}

export const StartRunButton = ({
  setIsRunning,
  isRunning,
  busRoute,
  courseId,
  allStatus,
}: runningInterface) => {
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();
  const [intervalRef, setIntervalRef] = useState<any>(null);
  const [time, setTime] = useState<number>(0);

  const getStatusCorrida = useMemo(() => {
    return () => {
      const status = allStatus?.find(
        (status) => status.status === EStatusRun.EmCorrida
      );
      return status;
    };
  }, [allStatus]);

  const startCourse = async () => {
    try {
      const statusCorrida = getStatusCorrida();

      if (!statusCorrida) return;

      await postChangeStatusCourse(courseId, statusCorrida.id);

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
          </TextStart>
        </HStack>
      </Container>

      <ModalStatement
        title="Confirmação de percurso"
        description={`Deseja começar o percurso? ${busRoute?.name}`}
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        fnStatement={startCourse}
      />
    </>
  );
};
