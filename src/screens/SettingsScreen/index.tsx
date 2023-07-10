import { useEffect, useState } from "react";
import { ScrollView, Icon, VStack, Divider } from "native-base";

import {
  requestForegroundPermissionsAsync,
  hasServicesEnabledAsync,
} from "expo-location";

import { SignOut } from "phosphor-react-native";

import { Title } from "~/components/Layouts/Title";
import { Button } from "~/components/Form/Button";
import { Switch } from "~/components/Form/Switch";
import { ModalView } from "~/components/Layouts/ModalView";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const SettingsScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

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
    <Background>
      <ScrollView>
        <ScreenContent>
          <Title size="md">Configurações</Title>

          <VStack alignItems={"baseline"} mt={4}>
            <Button
              title="Editar Perfil"
              onPress={() => {}}
              variant="link"
              fontColor={THEME.colors.gray["900"]}
            />

            <Switch
              label="Localização está ativa?"
              onValueChange={() => setIsEnabled(!isEnabled)}
              value={isEnabled}
              disabled
            />

            <Divider mt={"full"} />

            <Button
              display={"flex"}
              alignItems={"center"}
              title="Sair"
              onPress={() => setOpenModal(true)}
              variant="link"
              fontColor={THEME.colors.danger["500"]}
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

            <ModalView
              visible={openModal}
              closeModal={() => setOpenModal(false)}
              modalHeight={600}
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
                    onPress={() => setOpenModal(false)}
                    fontColor={THEME.colors.white}
                    bg={THEME.colors.primary["900"]}
                    variant={"outline"}
                  />
                </VStack>
              </VStack>
            </ModalView>
          </VStack>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
