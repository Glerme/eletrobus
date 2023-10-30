import { TouchableHighlight } from "react-native";

import LottieView from "lottie-react-native";
import { Icon, VStack, Text, HStack, Divider } from "native-base";

import { PencilSimple, SignOut } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useModal } from "~/hooks/useModal";
import { useAuth } from "~/contexts/AuthContext";

import { Modal } from "~/components/Modal";
import { StatusBar } from "~/components/StatusBar";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const SettingsScreen = ({
  navigation,
  route,
}: NavigationProps<"Settings">) => {
  const { user, signOut } = useAuth();

  const { handleCloseModal, handleOpenModal, modalRef } = useModal();

  const handleSingOut = async () => {
    handleCloseModal();
    signOut();
    navigation.navigate("Settings");
  };

  return (
    <>
      <StatusBar />
      <Background>
        <ScreenContent>
          <Text
            color={THEME.colors.gray["800"]}
            fontSize={"lg"}
            fontWeight={"600"}
          >
            Configurações
          </Text>

          {user?.user ? (
            <>
              <VStack alignItems={"center"}>
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("~/assets/animations/settings.json")}
                />
              </VStack>

              <Divider bg={"gray.500"} thickness={1} />

              <VStack space={2} alignItems={"baseline"} mt={4} w={"100%"}>
                <TouchableHighlight
                  onPress={() => navigation.navigate("Profile")}
                  underlayColor={THEME.colors.gray["200"]}
                  style={{
                    width: "100%",
                  }}
                >
                  <HStack space={2} alignItems={"center"} p={2} w={"full"}>
                    <PencilSimple color={THEME.colors.gray["800"]} size={16} />
                    <Text color={THEME.colors.gray["800"]}>Editar Perfil</Text>
                  </HStack>
                </TouchableHighlight>
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
                borderTopColor={THEME.colors.error["500"]}
                borderTopWidth={1}
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
            </>
          ) : (
            <VStack alignItems={"center"} flex={1}>
              <LottieView
                autoPlay
                loop
                style={{
                  width: 500,
                  height: 500,
                }}
                source={require("~/assets/animations/login.json")}
              />
              <Button
                onPress={() => navigation.navigate("Login")}
                title="Faça Login"
                fontColor="white"
              />
            </VStack>
          )}
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
              onPress={() => handleSingOut()}
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
