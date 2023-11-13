import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, FlatList, HStack, Modal, Pressable, Text } from "native-base";
import { Dispatch, useState } from "react";
import { EStatusRun } from "~/enum/EStatusRun";
import { getColorFromState } from "~/utils/getColorFromState";
import { getAllStatusService } from "~/services/StatusServices/getAllStatusService";
import { useQuery } from "@tanstack/react-query";
import { ListStatusItem } from "../ListStatusItem";
import { IStatus } from "~/interfaces/Status.interface";
import { postChangeStatusCourse } from "~/services/StatusServices/postChangeStatusCourse";

interface StatusButtonProps {
  setStatusActive: Dispatch<IStatus>;
  statusActive: IStatus | undefined;
  busRoute: RoutesBusStopsInterface | null;
}
export const StatusButton = ({
  statusActive,
  setStatusActive,
  busRoute,
}: StatusButtonProps) => {
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const data = await getAllStatusService();
      setStatusActive(data[0]);
      return data;
    },
    initialData: [],
    placeholderData: [],
  });

  const changeStatus = async (status: IStatus) => {
    if (!busRoute || !statusActive) return;
    try {
      await postChangeStatusCourse(busRoute.id, status.id);
      setStatusActive(status);
    } catch (e) {
      console.log(e);
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
            {/* <Plus color="white" /> */}
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
                statusActive && `${getColorFromState(statusActive?.status)}`
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
            {data.map((item) => (
              <ListStatusItem
                onPress={async () => {
                  await changeStatus(item);
                  setShowModal(false);
                }}
                item={item}
              />
            ))}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
