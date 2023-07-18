import { useState, useEffect } from "react";

import { Box, Image } from "native-base";

import * as ExpoImagePicker from "expo-image-picker";

import { Button } from "../Button";

export const ImagePicker = ({}) => {
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

  //! envolver o Image em um touchableOpacity
  //! Abrir um modal em baixo perguntando se quer abrir a câmera ou a galeria
  //! utilizar o modal view

  return (
    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Image
        source={{
          uri:
            selectedImage ??
            "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-27.jpg",
        }}
        alt="Foto de perfil"
        w={150}
        h={150}
        rounded={100}
      />

      <Box>
        <Button title="Abrir Câmera" onPress={openCamera} mb={2} mt={2} />
        <Button title="Abrir Galeria" onPress={openGallery} />
      </Box>
    </Box>
  );
};
