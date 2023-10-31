import { useState } from "react";

import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { Box, Center, Icon, IconButton, VStack, View } from "native-base";
import {
  Envelope,
  Key,
  User,
  ArrowLeft,
  Eye,
  EyeSlash,
} from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationProps } from "~/routes";

import IconSvg from "~/assets/svg/icon.svg";
import GoogleIcon from "~/assets/svg/googleIcon.svg";

import { api } from "~/services/axios";

import { useAuth } from "~/contexts/AuthContext";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

export const LoginScreen = ({
  navigation,
  route,
}: NavigationProps<"Login">) => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(true);

  const { handleGoogleLogin, signIn, loading } = useAuth();

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const [registerFields, setRegisterFields] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    if (!loginFields.email || !loginFields.password) {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Informe seu email e senha",
      });

      return;
    }

    const user = await signIn({
      email: loginFields.email,
      password: loginFields.password,
    });

    if (user) {
      navigation.navigate("Home");
    }
  };

  const handleGoogleSignIn = async () => {
    const user = await handleGoogleLogin();
    if (user) {
      navigation.navigate("Home");
    } else {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Tente novamente mais tarde",
      });
    }
  };

  const handleRegister = async () => {
    if (
      !registerFields.email ||
      !registerFields.password ||
      !registerFields.name
    ) {
      Toast.show({
        type: "warning",
        text1: "Atenção",
        text2: "Informe seu nome, email e senha",
      });

      return;
    }
    try {
      const { status } = await api.post("/user", {
        name: registerFields.name,
        email: registerFields.email,
        password: registerFields.password,
      });

      if (status) {
        setStep(1);

        Toast.show({
          type: "success",
          text1: "Sucesso",
          text2: "Usuário registrado com sucesso",
        });

        return;
      }
    } catch (error) {
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Erro ao fazer registro",
      });
    }
  };

  return (
    <>
      <View
        background={"primary.500"}
        flex={1}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          style={{ borderRadius: 8 }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
          enableAutomaticScroll={Platform.OS === "ios"}
        >
          <Box bg="white" p={5} borderRadius={"md"}>
            {step === 1 && (
              <VStack space={2} justifyItems={"center"}>
                <Center mb={"-15%"}>
                  <IconSvg width={300} height={300} />
                </Center>
                <VStack space={2}>
                  <Input
                    placeholder="E-mail"
                    InputLeftElement={<Icon as={<Envelope />} ml={2} />}
                    onChangeText={(text) =>
                      setLoginFields((state) => ({ ...state, email: text }))
                    }
                    keyboardType="email-address"
                  />

                  <Input
                    placeholder="Senha"
                    InputLeftElement={<Icon as={<Key />} ml={2} />}
                    onChangeText={(text) =>
                      setLoginFields((state) => ({ ...state, password: text }))
                    }
                    secureTextEntry={showPassword}
                    type={showPassword ? "text" : "password"}
                    InputRightElement={
                      <IconButton
                        onPress={() => setShowPassword(!showPassword)}
                        borderRadius={"full"}
                        mr={2}
                        p={2}
                      >
                        <Icon
                          as={showPassword ? <Eye /> : <EyeSlash />}
                          mr={2}
                        />
                      </IconButton>
                    }
                  />

                  <Button
                    title="Entrar"
                    onPress={handleSignIn}
                    isLoading={loading}
                    background={"primary.400"}
                    fontColor="white"
                    _pressed={{
                      backgroundColor: "primary.700",
                    }}
                  />

                  <Button
                    title="Entrar com o Google"
                    onPress={handleGoogleSignIn}
                    isLoading={loading}
                    background={"transparent"}
                    borderWidth={1}
                    borderColor={"red.400"}
                    fontColor={"red.400"}
                    leftIcon={<Icon as={<GoogleIcon />} />}
                  />

                  <Box>
                    <Button
                      title="Registre-se"
                      onPress={() => setStep(2)}
                      isLoading={loading}
                      variant={"link"}
                      borderColor={"primary.400"}
                      fontColor={"primary.400"}
                    />
                  </Box>
                </VStack>
              </VStack>
            )}

            {step === 2 && (
              <VStack space={2} justifyItems={"center"}>
                <Center mb={"-15%"}>
                  <IconSvg width={300} height={300} />
                </Center>

                <Input
                  placeholder="Nome"
                  InputLeftElement={<Icon as={<User />} ml={2} />}
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, name: text }))
                  }
                  keyboardType="default"
                />

                <Input
                  placeholder="E-mail"
                  InputLeftElement={<Icon as={<Envelope />} ml={2} />}
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, email: text }))
                  }
                  keyboardType="email-address"
                />

                <Input
                  placeholder="Senha"
                  InputLeftElement={<Icon as={<Key />} ml={2} />}
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, password: text }))
                  }
                  secureTextEntry={showPassword}
                  type={showPassword ? "text" : "password"}
                  InputRightElement={
                    <IconButton
                      onPress={() => setShowPassword(!showPassword)}
                      borderRadius={"full"}
                      mr={2}
                      p={2}
                    >
                      <Icon as={showPassword ? <Eye /> : <EyeSlash />} />
                    </IconButton>
                  }
                />

                <Button
                  title="Registrar"
                  onPress={handleRegister}
                  isLoading={loading}
                  background={"primary.400"}
                  fontColor="white"
                  _pressed={{
                    backgroundColor: "primary.700",
                  }}
                />

                <Button
                  onPress={() => setStep(1)}
                  title="Logar"
                  variant={"link"}
                  leftIcon={<Icon as={<ArrowLeft color="#4d34dd" />} />}
                  isLoading={loading}
                  borderColor={"primary.400"}
                  fontColor={"primary.400"}
                />
              </VStack>
            )}
          </Box>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};
