import { useState, useEffect, useRef } from "react";

import { Box } from "native-base";
import { Modalize } from "react-native-modalize";
import * as ExpoImagePicker from "expo-image-picker";

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
        console.log(result?.assets);

        // const formData = new FormData();

        // const {data} =await  api.post("/user/avatar", formData)

        setSelectedImage(result?.assets[0]?.uri);
      }
    } else {
      alert("Permissão para acessar a galeria foi negada!");
    }
  };

  const handleOpenModal = () => {
    modalRef?.current?.open();
  };

  if (!user) {
    return (
      <Box w={"100%"} display={"flex"} alignItems={"center"}>
        <ButtonOpenModal
          avatarUrl={require("~/assets/img/avatar-not-found.png")}
          handleOpenModal={handleOpenModal}
        />
      </Box>
    );
  }

  return (
    <>
      <ButtonOpenModal
        avatarUrl={
          selectedImage
            ? { uri: selectedImage }
            : require("~/assets/img/avatar-not-found.png")
        }
        handleOpenModal={handleOpenModal}
      />

      <ModalPicker
        openCamera={openCamera}
        openGallery={openGallery}
        forwardedRef={modalRef}
      />
    </>
  );
};
