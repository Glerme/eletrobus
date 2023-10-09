import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native";

import { Icon, VStack, Text, HStack, Avatar } from "native-base";

import {
  requestForegroundPermissionsAsync,
  hasServicesEnabledAsync,
} from "expo-location";

import { PencilSimple, SignOut, HardDrive } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useModal } from "~/hooks/useModal";
import { useAuth } from "~/contexts/AuthContext";

import { Modal } from "~/components/Modal";
import { Switch } from "~/components/Form/Switch";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const SettingsScreen = ({
  navigation,
  route,
}: NavigationProps<"Settings">) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { handleGoogleLogin, user } = useAuth();

  const { handleCloseModal, handleOpenModal, modalRef } = useModal();

  const checkLocationStatus = async () => {
    try {
      const { status } = await requestForegroundPermissionsAsync();
      const isLocationEnabled = await hasServicesEnabledAsync();

      if (status === "granted" && isLocationEnabled) {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    } catch (error) {
      console.log("Erro ao verificar a localização: ", error);
    }
  };

  useEffect(() => {
    checkLocationStatus();
  }, []);

  return (
    <>
      <Background>
        <ScreenContent>
          <Text
            color={THEME.colors.gray["800"]}
            fontSize={"lg"}
            fontWeight={"600"}
          >
            Configurações
          </Text>

          <VStack space={2} alignItems={"baseline"} mt={2}>
            {/* <Switch
              color={THEME.colors.gray["800"]}
              label="Localização está ativa?"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
              disabled
            /> */}

            <TouchableHighlight
              onPress={() => navigation.navigate("Profile", { userId: "123" })}
              underlayColor={THEME.colors.gray["200"]}
            >
              <HStack space={2} alignItems={"center"}>
                <PencilSimple color={THEME.colors.gray["800"]} size={16} />
                <Text color={THEME.colors.gray["800"]}>Editar Perfil</Text>
              </HStack>
            </TouchableHighlight>

            <TouchableHighlight underlayColor={THEME.colors.gray["200"]}>
              <HStack space={2} alignItems={"center"}>
                <HardDrive color={THEME.colors.gray["800"]} size={16} />
                <Text color={THEME.colors.gray["800"]}>Sou Motorista</Text>
              </HStack>
            </TouchableHighlight>

            <Button
              onPress={handleGoogleLogin}
              title="Sou motorista"
              fontColor="white"
            />

            {/* <Avatar
              source={{
                uri: user?.picture,
              }}
            />

            <Text>{user?.name}</Text>
            <Text>{user?.email}</Text> */}
          </VStack>

          <Button
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            title="Sair"
            onPress={handleOpenModal}
            variant="link"
            fontColor={THEME.colors.danger["500"]}
            mt={"auto"}
            rightIcon={
              <Icon
                as={
                  <SignOut
                    color={THEME.colors.danger["500"]}
                    weight="bold"
                    size={18}
                  />
                }
              />
            }
          />
        </ScreenContent>
      </Background>

      <Modal
        forwardedRef={modalRef}
        modalHeight={200}
        adjustToContentHeight={false}
      >
        <VStack px={23} mt={6}>
          <Title size="sm" textAlign={"left"}>
            Deseja realmente sair?
          </Title>
          <VStack space={2} mt={2}>
            <Button
              title="Sim, desejo sair."
              onPress={() => {
                console.log("saiu");
              }}
              fontColor={THEME.colors.white}
              bg={THEME.colors.danger["600"]}
            />

            <Button
              title="Não, irei continuar no aplicativo."
              onPress={handleCloseModal}
              fontColor={THEME.colors.white}
              bg={THEME.colors.primary["900"]}
              variant={"outline"}
            />
          </VStack>
        </VStack>
      </Modal>
    </>
  );
};
