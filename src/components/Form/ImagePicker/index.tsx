import { useState, useEffect, useRef } from "react";

import { Box } from "native-base";
import Toast from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { Modalize } from "react-native-modalize";
import * as ExpoImagePicker from "expo-image-picker";

import { MyQueryInterface } from "~/interfaces/User.interface";

import { useAuth } from "~/contexts/AuthContext";

import { api } from "~/services/axios";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";

export const ImagePicker = () => {
  const { updateUser, user } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<Modalize>(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "warning",
          text1: "Atenção",
          text2: "Ative a permissão para acessar a galeria",
        });
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
        if (result?.assets[0]?.uri) {
          try {
            const formData = new FormData();

            const blob = await FileSystem.readAsStringAsync(
              result?.assets[0]?.uri,
              {
                encoding: FileSystem.EncodingType.Base64,
              }
            );

            const blobData = `data:image/jpg;base64,${blob}`;

            formData?.append("avatar", blobData);

            const { status } = await api.put("/user", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            });

            if (status === 200) {
              const { data } = await api.get<MyQueryInterface>("/user/my");

              updateUser(data);

              Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: "Usuário atualizado com sucesso",
              });

              setSelectedImage(result?.assets[0]?.uri);
            }
          } catch (error) {
            const err = axiosErrorHandler(error);
            console.error(err);

            Toast.show({
              type: "error",
              text1: "Erro",
              text2: "Ocorreu um erro ao atualizar o usuário",
            });
          }
        }
      }
    } else {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Ative a permissão para acessar a galeria",
      });
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
        if (result?.assets[0]?.uri) {
          try {
            const formData = new FormData();

            const blob = await FileSystem.readAsStringAsync(
              result?.assets[0]?.uri,
              {
                encoding: FileSystem.EncodingType.Base64,
              }
            );

            const blobData = `data:image/jpg;base64,${blob}`;

            formData?.append("avatar", blobData);

            const { status } = await api.put("/user", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
              },
            });

            if (status === 200) {
              const { data } = await api.get<MyQueryInterface>("/user/my");

              updateUser(data);

              Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: "Usuário atualizado com sucesso",
              });

              setSelectedImage(result?.assets[0]?.uri);
            }
          } catch (error) {
            const err = axiosErrorHandler(error);
            console.error(err);

            Toast.show({
              type: "error",
              text1: "Erro",
              text2: "Ocorreu um erro ao atualizar o usuário",
            });
          }
        }
      }
    } else {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Ative a permissão para acessar a galeria",
      });
    }
  };

  const handleOpenModal = () => {
    modalRef?.current?.open();
  };

  useEffect(() => {
    setSelectedImage(
      user?.user?.avatar ?? require("~/assets/img/avatar-not-found.png")
    );
  }, [user?.user?.avatar]);

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
