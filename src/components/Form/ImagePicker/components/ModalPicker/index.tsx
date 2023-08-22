import { Dimensions, TouchableOpacity } from "react-native";

import { Modalize } from "react-native-modalize";
import { Box, HStack, Icon, Text } from "native-base";
import { Camera, ImageSquare } from "phosphor-react-native";

import { Modal } from "~/components/Modal";

import { THEME } from "~/styles/theme";

interface ModalPickerProps {
  openCamera: () => Promise<void>;
  openGallery: () => Promise<void>;
  forwardedRef: React.RefObject<Modalize>;
}

export const ModalPicker = ({
  openCamera,
  openGallery,
  forwardedRef,
}: ModalPickerProps) => {
  return (
    <Modal forwardedRef={forwardedRef}>
      <HStack justifyContent={"space-around"} alignItems={"center"} p={4}>
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
    </Modal>
  );
};
