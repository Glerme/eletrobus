import { useState, useEffect } from "react";

import { Box } from "native-base";
import Toast from "react-native-toast-message";
import { useMutation } from "@tanstack/react-query";
import * as ExpoImagePicker from "expo-image-picker";

import { MyQueryInterface } from "~/interfaces/User.interface";

import { useAuth } from "~/contexts/AuthContext";

import api, { setSignOutFunction } from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { ModalPicker } from "./components/ModalPicker";
import { ButtonOpenModal } from "./components/ButtonOpenModal";

const updateAvatar = async (formData: any) => {
  const { data } = await api.put("/user", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });

  return data;
};

export const ImagePicker = () => {
  const { updateUser, user, getRefreshToken } = useAuth();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { handleOpenModal, handleCloseModal, modalRef } = useModal();

  const { mutate, isLoading } = useMutation(updateAvatar, {
    onMutate: async () => {
      setSignOutFunction(getRefreshToken);
    },
    onSuccess: async (updatedUser) => {
      if (updatedUser) {
        const { data } = await api.get<MyQueryInterface>("/user/my");

        updateUser(data);

        setSelectedImage(data?.data?.avatar);

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Usuário atualizado com sucesso",
        });
      }
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        setSignOutFunction(getRefreshToken);
      }
    },
  });

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
        const formData: any = new FormData();

        formData.append("avatar", {
          type: "image/jpeg",
          name: "avatar.jpg",
          uri: result?.assets[0]?.uri,
        });

        mutate(formData);
        handleCloseModal();
      }
    } else {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Ative a permissão para acessar a câmera",
      });

      handleCloseModal();
    }
  };

  const openGallery = async () => {
    const result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData: any = new FormData();

      formData.append("avatar", {
        type: "image/jpeg",
        name: "avatar.jpg",
        uri: result?.assets[0]?.uri,
      });

      mutate(formData);
      handleCloseModal();
    } else {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Ative a permissão para acessar a galeria",
      });

      handleCloseModal();
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
        isLoading={isLoading}
      />

      <ModalPicker
        openCamera={openCamera}
        openGallery={openGallery}
        forwardedRef={modalRef}
      />
    </>
  );
};
