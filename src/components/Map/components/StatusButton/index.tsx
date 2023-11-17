import { Dispatch, useState } from "react";
import { Box, HStack, Modal, Text } from "native-base";

import { useQuery } from "@tanstack/react-query";

import { getColorFromState } from "~/utils/getColorFromState";

import { EStatusRun } from "~/enum/EStatusRun";

import { IStatus } from "~/interfaces/Status.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { getAllStatusService } from "~/services/StatusServices/getAllStatusService";
import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";

import { useModal } from "~/hooks/useModal";

import { ListStatusItem } from "../ListStatusItem";
import { ModalStatement } from "~/components/ModalStatement";

import { Container, TextItem } from "./styles";

interface StatusButtonProps {
  setStatusActive: Dispatch<IStatus | undefined>;
  statusActive: IStatus | undefined;
  busRoute: RoutesBusStopsInterface | null;

  setBusRoute: Dispatch<RoutesBusStopsInterface | null>;

  setIsRunning: Dispatch<boolean>;
  courseId: string;
  cleanParams: () => void;

  allStatus: IStatus[] | null;
}

export const StatusButton = ({
  courseId,
  statusActive,
  busRoute,
  allStatus,
  setStatusActive,
  setIsRunning,
  cleanParams,
  setBusRoute,
}: StatusButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

  const getStatusCorrida = () => {
    const status = allStatus?.find(
      (status) => status.status === EStatusRun.EmCorrida
    );
    return status;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      if (getStatusCorrida()) setStatusActive(getStatusCorrida());
      const data = await getAllStatusService();
      return data;
    },
    initialData: [],
    placeholderData: [],
  });

  const finishCourse = () => {
    setIsRunning(false);
    if (getStatusCorrida()) setStatusActive(getStatusCorrida());
    setBusRoute(null);
    cleanParams();
  };

  const changeStatus = async (status: IStatus) => {
    if (!busRoute || !statusActive) return;
    try {
      await postChangeStatusCourse(courseId, status.id);
      if (
        status.status === EStatusRun.Finalizado ||
        status.status === EStatusRun.Incapacitado
      ) {
        handleOpenModal();
        setShowModal(false);
        return;
      }

      setStatusActive(status);
      setShowModal(false);
    } catch (e) {
      console.error("Erro ao mudar o status da corrida");
    }
  };

  return (
    <>
      <Container>
        <HStack>
          <TextItem onPress={() => setShowModal(true)}>
            <Text lineHeight={15} color="white">
              Estado
            </Text>
          </TextItem>

          <HStack
            space={2}
            alignItems={"center"}
            backgroundColor="white"
            borderBottomRightRadius={4}
            borderTopRightRadius={4}
            padding={2}
          >
            <Box
              height={2}
              width={4}
              backgroundColor={
                statusActive && `${getColorFromState(statusActive.status)}`
              }
            ></Box>
            {isLoading ? (
              <Text lineHeight={15}>...</Text>
            ) : (
              <Text lineHeight={15} textTransform="capitalize">
                {statusActive?.status}
              </Text>
            )}
          </HStack>
        </HStack>
      </Container>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Selecione o estado da corrida</Modal.Header>
          <Modal.Body height={400}>
            {data?.map((item) => (
              <ListStatusItem
                key={item.id}
                onPress={async () => {
                  await changeStatus(item);
                }}
                item={item}
              />
            ))}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>

      <ModalStatement
        title="Finalizar percurso"
        description="A corrida será finalizada, deseja continuar?"
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        fnStatement={finishCourse}
      />
    </>
  );
};
