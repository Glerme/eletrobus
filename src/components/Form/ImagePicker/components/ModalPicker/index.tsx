import { Dimensions, TouchableOpacity } from "react-native";

import { Box, HStack, Icon, Text } from "native-base";
import { Camera, ImageSquare } from "phosphor-react-native";

import { ModalView } from "~/components/Layouts/ModalView";

import { THEME } from "~/styles/theme";

interface ModalPickerProps {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  openCamera: () => Promise<void>;
  openGallery: () => Promise<void>;
}

export const ModalPicker = ({
  openCamera,
  openGallery,
  openModal,
  setOpenModal,
}: ModalPickerProps) => {
  return (
    <ModalView
      closeModal={() => setOpenModal(false)}
      visible={openModal}
      modalMarginTop={650}
    >
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
        space={"10"}
      >
        <TouchableOpacity onPress={openCamera}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderColor={"primary.800"}
            borderWidth={2}
            borderRadius={8}
            p={4}
            w={Dimensions.get("window").width / 2 - 40}
          >
            <Box
              borderRadius={50}
              p={2}
              borderWidth={1}
              borderColor={"fuchsia.100"}
              background={"fuchsia.100"}
            >
              <Icon
                as={<Camera size={50} color={THEME.colors.primary["800"]} />}
              />
            </Box>
            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.900"}>
              Câmera
            </Text>
          </Box>
        </TouchableOpacity>

        <TouchableOpacity onPress={openGallery}>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderColor={"primary.800"}
            borderWidth={2}
            borderRadius={8}
            p={4}
            w={Dimensions.get("window").width / 2 - 40}
          >
            <Box
              borderRadius={50}
              p={2}
              borderWidth={1}
              borderColor={"fuchsia.100"}
              background={"fuchsia.100"}
            >
              <Icon
                as={
                  <ImageSquare size={50} color={THEME.colors.primary["800"]} />
                }
              />
            </Box>

            <Text fontSize={"md"} fontWeight={"bold"} color={"gray.900"}>
              Galeria
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>
    </ModalView>
  );
};
