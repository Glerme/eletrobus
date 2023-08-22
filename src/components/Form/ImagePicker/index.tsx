import { useState, useEffect, useRef } from "react";

import * as ExpoImagePicker from "expo-image-picker";
import { Box, Skeleton, VStack, View } from "native-base";
import { Modalize } from "react-native-modalize";

import { useQuery } from "@tanstack/react-query";

import { api } from "~/services/axios";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";
import { Host } from "react-native-portalize";

export const ImagePicker = ({}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<Modalize>(null);

  const { data, isLoading, error } = useQuery(["getPhoto"], () =>
    api.get("/users/thiag-o").then(({ data }) => data.avatar_url)
  );

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

      // FAZER A REQUEST NOVAMENTE PARA ATUALIZAR A IMAGEM
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

      // FAZER A REQUEST NOVAMENTE PARA ATUALIZAR A IMAGEM
    } else {
      alert("Permissão para acessar a galeria foi negada!");
    }
  };

  const handleOpenModal = () => {
    modalRef?.current?.open();
  };

  const handleCloseModal = () => {
    modalRef?.current?.close();
  };

  if (isLoading) {
    return (
      <Box w={"100%"} display={"flex"} alignItems={"center"}>
        <VStack space="5">
          <Skeleton
            borderWidth={1}
            borderColor="primary.50"
            endColor="primary.50"
            size="130px"
            rounded="full"
          />
        </VStack>
      </Box>
    );
  }

  // if (error) {
  //   return (
  //     <Box w={"100%"} display={"flex"} alignItems={"center"}>
  //       <ButtonOpenModal
  //         avatarUrl={"~/assets/user-profile.svg"}
  //         handleOpenModal={handleOpenModal}
  //       />

  //       <ModalPicker
  //         openCamera={openCamera}
  //         openGallery={openGallery}
  //         forwardedRef={modalRef}
  //         closeModal={handleCloseModal}
  //       />
  //     </Box>
  //   );
  // }

  return (
    <>
      <ButtonOpenModal avatarUrl={data} handleOpenModal={handleOpenModal} />

      <ModalPicker
        openCamera={openCamera}
        openGallery={openGallery}
        forwardedRef={modalRef}
      />
    </>
  );
};
