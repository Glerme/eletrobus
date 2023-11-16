import { Dispatch } from "react";

import { Text } from "native-base";

import { useModal } from "~/hooks/useModal";

import { EStatusRun } from "~/enum/EStatusRun";

import { IStatus } from "~/interfaces/Status.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";

import { ModalStatement } from "~/components/ModalStatement";

import { Container, TextFinalize } from "./styles";
interface finalizeInterface {
  setBusRoute: Dispatch<RoutesBusStopsInterface | null>;
  setIsRunning: Dispatch<boolean>;
  cleanParams: () => void;
  courseId: string;
  allStatus: IStatus[] | null;
}

export const FinalizeButton = ({
  setIsRunning,
  setBusRoute,
  cleanParams,
  courseId,
  allStatus,
}: finalizeInterface) => {
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

  const finishCourse = async () => {
    try {
      if (!allStatus) return;
      const statusFinalizado = allStatus.find(
        (status) => status.status === EStatusRun.Finalizado
      );
      if (!statusFinalizado) return;
      await postChangeStatusCourse(courseId, statusFinalizado.id);
      setIsRunning(false);
      setBusRoute(null);
      cleanParams();
    } catch (e) {
      console.log(e);
    }
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
        fnStatement={finishCourse}
      />
    </>
  );
};
