import { useState, useEffect } from "react";

import { Box } from "native-base";
import Toast from "react-native-toast-message";
import * as ExpoImagePicker from "expo-image-picker";

import { MyQueryInterface } from "~/interfaces/User.interface";

import { useAuth } from "~/contexts/AuthContext";

import { api } from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";

export const ImagePicker = () => {
  const { updateUser, user } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

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
      setLoading(true);
      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        try {
          const formData: any = new FormData();

          formData.append("avatar", {
            type: "image/jpeg",
            name: "avatar.jpg",
            uri: result?.assets[0]?.uri,
          });

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

            setSelectedImage(data?.data?.avatar);
          }
        } catch (error) {
          const err = axiosErrorHandler(error);
          console.error(err);

          Toast.show({
            type: "error",
            text1: "Erro",
            text2: "Ocorreu um erro ao atualizar o usuário",
          });
        } finally {
          setLoading(false);
          handleCloseModal();
        }
      } else {
        setLoading(false);
      }
    } else {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Ative a permissão para acessar a galeria",
      });

      handleCloseModal();
      setLoading(false);
    }
  };

  const openGallery = async () => {
    setLoading(true);

    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const formData: any = new FormData();

        formData.append("avatar", {
          type: "image/jpeg",
          name: "avatar.jpg",
          uri: result?.assets[0]?.uri,
        });

        const { data } = await api.put("/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        });

        updateUser(data);

        setSelectedImage(data?.data?.avatar);

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Usuário atualizado com sucesso",
        });
      } catch (error) {
        const err = axiosErrorHandler(error);
        console.error(err);

        Toast.show({
          type: "error",
          text1: "Erro",
          text2: "Ocorreu um erro ao atualizar o usuário",
        });
      } finally {
        handleCloseModal();
        setLoading(false);
      }
    } else {
      handleCloseModal();
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedImage(user?.user?.avatar ?? "");
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
        isLoading={loading}
      />

      <ModalPicker
        openCamera={openCamera}
        openGallery={openGallery}
        forwardedRef={modalRef}
      />
    </>
  );
};
