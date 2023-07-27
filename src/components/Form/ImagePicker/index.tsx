import { useState, useEffect } from "react";
import { Dimensions, TouchableOpacity } from "react-native";

import * as ExpoImagePicker from "expo-image-picker";
import { Avatar, Box, HStack, Icon, Text, VStack } from "native-base";

import { ImageSquare, Camera, PencilSimple } from "phosphor-react-native";

import { ModalView } from "~/components/Layouts/ModalView";

import { THEME } from "~/styles/theme";

export const ImagePicker = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permissão para acessar a galeria foi negada!");
      }
    })();
  }, []);

  const openCamera = async () => {
    const { status } = await ExpoImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result?.assets[0]?.uri);
      }
    } else {
      alert("Permissão para acessar a câmera foi negada!");
    }
  };

  const openGallery = async () => {
    const { status } =
      await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result?.assets[0]?.uri);
      }
    } else {
      alert("Permissão para acessar a galeria foi negada!");
    }
  };

  console.log(selectedImage);

  return (
    <>
      <Box w={"100%"} display={"flex"} alignItems={"center"}>
        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <VStack space="5">
            <Avatar
              bg="lightBlue.400"
              source={{
                uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
              }}
              size="2xl"
            >
              <Avatar.Badge
                bg="primary.500"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                size={"10"}
              >
                <Icon
                  as={<PencilSimple size={22} color={THEME.colors.white} />}
                />
              </Avatar.Badge>
            </Avatar>
          </VStack>
        </TouchableOpacity>
      </Box>

      <ModalView
        closeModal={() => setOpenModal(false)}
        visible={openModal}
        modalHeight={650}
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
                    <ImageSquare
                      size={50}
                      color={THEME.colors.primary["800"]}
                    />
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
    </>
  );
};
