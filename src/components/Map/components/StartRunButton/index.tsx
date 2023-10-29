import { Platform, TouchableNativeFeedback } from "react-native";

import { Plus, Minus, X } from "phosphor-react-native";
import { Container, TextItem } from "./styles";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { Box, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import { Dispatch, useState } from "react";
import { useModal } from "~/hooks/useModal";
import { Title } from "~/components/Layouts/Title";
import { Modal } from "~/components/Modal";

interface runningInterface {
  setIsRunning: Dispatch<boolean>;
  isRunning: boolean;
}
export const StartRunButton = ({ setIsRunning, isRunning }: any) => {
  const [time, setTime] = useState<number>(0);
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();
  if (isRunning)
    return (
      <Container>
        <HStack
          space={2}
          alignItems={"center"}
          backgroundColor="white"
          borderRadius={4}
          padding={2}
        >
          <Text lineHeight={15}>time</Text>
        </HStack>
      </Container>
    );
  return (
    <>
      <Container>
        <HStack>
          <TextItem
            onPress={() => {
              console.log("teste");
            }}
          >
            <Text lineHeight={15} color="white">
              Começar Rota
            </Text>
            {/* <Plus color="white" /> */}
          </TextItem>
        </HStack>
      </Container>

      <Modal
        forwardedRef={modalRef}
        HeaderComponent={
          <VStack px={23} mt={6}>
            <Title size="md" textAlign={"left"}>
              Pontos
            </Title>
          </VStack>
        }
      >
        <VStack px={23} mt={6} mb={6}></VStack>
      </Modal>
    </>
  );
};
