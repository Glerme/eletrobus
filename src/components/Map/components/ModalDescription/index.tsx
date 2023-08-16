import {
  Box,
  Flex,
  HStack,
  Image,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";

import { IMarker } from "~/interfaces/IMap";

import { Title } from "~/components/Layouts/Title";
import { ModalView } from "~/components/Layouts/ModalView";

import { THEME } from "~/styles/theme";

interface ModalDescriptionProps {
  data: IMarker | null;
  openModal: boolean;
  setOpenModal: ({
    open,
    marker,
  }: {
    open: boolean;
    marker: IMarker | null;
  }) => void;
}

export const ModalDescription = ({
  data,
  openModal,
  setOpenModal,
}: ModalDescriptionProps) => {
  const imgMarkerType = {
    point: require("~/assets/img/point.png"),
    bus: require("~/assets/img/bus.png"),
  };

  return (
    <ModalView
      visible={openModal}
      closeModal={() =>
        setOpenModal({
          marker: null,
          open: false,
        })
      }
      modalMarginTop={400}
      animationType="fade"
    >
      <ScrollView>
        <VStack px={23} mt={6} mb={4} space={2}>
          <HStack alignItems={"center"}>
            <Title size="md" textAlign={"left"}>
              {data?.title}
            </Title>

            <Spacer />

            <Image
              source={data?.type && imgMarkerType[data?.type]}
              alt={data?.title}
              style={{
                height: 35,
                width: 35,
                tintColor: THEME.colors.primary["400"],
              }}
            />
          </HStack>

          <Box
            width={"full"}
            p={2}
            borderWidth={2}
            borderRadius={4}
            borderColor={"primary.400"}
          >
            <Image
              source={{ uri: data?.image }}
              alt={data?.title}
              w={"full"}
              h={"150"}
              resizeMode={"contain"}
            />
          </Box>

          <Box width={"full"} mt={2}>
            <Flex>
              <Text bold fontSize={"md"}>
                Descrição:
              </Text>

              <Text fontSize={"md"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                excepturi odit error debitis placeat, numquam quae commodi eum
                sapiente accusamus.
              </Text>
            </Flex>

            <Flex>
              <Text bold fontSize={"md"}>
                Horários:
              </Text>

              <Text fontSize={"md"}>Lorem ipsum dolor</Text>
            </Flex>
          </Box>
        </VStack>
      </ScrollView>
    </ModalView>
  );
};
