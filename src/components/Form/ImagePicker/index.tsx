import { useState, useEffect } from "react";

import * as ExpoImagePicker from "expo-image-picker";
import { Box, Skeleton, VStack } from "native-base";

import { useQuery } from "@tanstack/react-query";

import { api } from "~/services/axios";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";

export const ImagePicker = ({}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  if (error) {
    return (
      <Box w={"100%"} display={"flex"} alignItems={"center"}>
        <ButtonOpenModal
          avatarUrl={"~/assets/user-profile.svg"}
          setOpenModal={() => setOpenModal(true)}
        />

        <ModalPicker
          openCamera={openCamera}
          openGallery={openGallery}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Box>
    );
  }

  return (
    <>
      <ButtonOpenModal
        avatarUrl={data}
        setOpenModal={() => setOpenModal(true)}
      />

      <ModalPicker
        openCamera={openCamera}
        openGallery={openGallery}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
