import { useState } from "react";

import { Alert } from "react-native";
import { Box, Center, Icon, VStack, View } from "native-base";
import { Envelope, Key, User, ArrowLeft } from "phosphor-react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationProps } from "~/routes";

import IconSvg from "~/assets/svg/icon.svg";
import GoogleIcon from "~/assets/svg/googleIcon.svg";

import { api } from "~/services/axios";

import { useAuth } from "~/contexts/AuthContext";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Form/Button";

import { THEME } from "~/styles/theme";
import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

export const LoginScreen = ({
  navigation,
  route,
}: NavigationProps<"Login">) => {
  const [step, setStep] = useState(1);

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
      return Alert.alert("Entrar", "Informe seu email e senha");
    }

    const user = await signIn({
      email: loginFields.email,
      password: loginFields.password,
    });

    // if (user) {
    //   navigation.navigate("Home");
    // }
  };

  const handleRegister = async () => {
    if (
      !registerFields.email ||
      !registerFields.password ||
      !registerFields.name
    ) {
      return Alert.alert("Registrar", "Informe seu nome, email e senha ");
    }
    try {
      const { status } = await api.post("/user", {
        name: registerFields.name,
        email: registerFields.email,
        password: registerFields.password,
      });

      if (status) {
        setStep(1);
        return Alert.alert("Sucesso", "Usuário registrado com sucesso");
      }
    } catch (error) {
      const errorMessage = axiosErrorHandler(error);

      console.error(errorMessage);

      Alert.alert("Erro ao fazer registro", errorMessage?.message);
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
        <KeyboardAwareScrollView enableOnAndroid style={{ borderRadius: 8 }}>
          <Box bg="white" p={5} borderRadius={"md"}>
            {step === 1 && (
              <VStack space={2} justifyItems={"center"}>
                <Center mb={"-15%"}>
                  <IconSvg width={300} height={300} />
                </Center>
                <VStack space={2}>
                  <Input
                    placeholder="E-mail"
                    InputLeftElement={<Icon as={<Envelope />} ml={4} />}
                    onChangeText={(text) =>
                      setLoginFields((state) => ({ ...state, email: text }))
                    }
                    keyboardType="email-address"
                  />

                  <Input
                    placeholder="Senha"
                    InputLeftElement={<Icon as={<Key />} ml={4} />}
                    secureTextEntry
                    onChangeText={(text) =>
                      setLoginFields((state) => ({ ...state, password: text }))
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
                    title="Entrar com o google"
                    onPress={handleGoogleLogin}
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
                  InputLeftElement={<Icon as={<User />} ml={4} />}
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, name: text }))
                  }
                  keyboardType="default"
                />

                <Input
                  placeholder="E-mail"
                  InputLeftElement={<Icon as={<Envelope />} ml={4} />}
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, email: text }))
                  }
                  keyboardType="email-address"
                />

                <Input
                  placeholder="Senha"
                  InputLeftElement={<Icon as={<Key />} ml={4} />}
                  secureTextEntry
                  onChangeText={(text) =>
                    setRegisterFields((state) => ({ ...state, password: text }))
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
