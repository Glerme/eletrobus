import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, FlatList, HStack, Modal, Pressable, Text } from "native-base";
import { useState } from "react";
import { EStateRun } from "~/enum/EStateRun";
import { getColorFromState } from "~/utils/colorState";

export const StateButton = ({ busRoute, setBusRoute }: any) => {
  const [time, setTime] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

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
              backgroundColor={`${getColorFromState(EStateRun.EmCorrida)}`}
            ></Box>
            <Text lineHeight={15}>{EStateRun.EmCorrida}</Text>
          </HStack>
        </HStack>
      </Container>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Selecione o estado da corrida</Modal.Header>
          <Modal.Body>
            {/* <FlatList
            
             
            /> */}
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};
