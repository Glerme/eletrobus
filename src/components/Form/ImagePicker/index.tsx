import { useState, useEffect, useRef } from "react";

import { Modalize } from "react-native-modalize";
import { Box, Skeleton, VStack } from "native-base";
import * as ExpoImagePicker from "expo-image-picker";

import { useQuery } from "@tanstack/react-query";

import { UserGoogleProps } from "~/interfaces/User.interface";

import { api } from "~/services/axios";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";

interface ImagePickerProps {
  user: UserGoogleProps | null;
}

export const ImagePicker = ({ user }: ImagePickerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<Modalize>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["getPhoto"],
    queryFn: async () => {
      if (!user) return "";

      const { data } = await api.get(
        `/users/${user?.given_name === "Guilherme" ? "glerme" : "thiag-o"}`
      );

      return data?.avatar_url;
    },
  });

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

  if (!user) {
    return (
      <Box w={"100%"} display={"flex"} alignItems={"center"}>
        <ButtonOpenModal
          avatarUrl={require("~/assets/img/user-profile-light.png")}
          handleOpenModal={handleOpenModal}
        />
      </Box>
    );
  }

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
