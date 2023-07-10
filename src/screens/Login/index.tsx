import { useState } from "react";
import { Alert, ImageBackground } from "react-native";

import { Box, Center, Icon, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import * as AuthSession from "expo-auth-session";
import { useNavigation } from "@react-navigation/native";

import { Input } from "~/components/Form/Input";
import { Button } from "~/components/Button";

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export const Login = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    // if (!fields.email || !fields.password) {
    //   return Alert.alert("Entrar", "Informe seu email e senha");
    // }

    // setIsLoading(true);

    navigation.navigate("PHome");
  };

  const googleSignIn = async () => {
    try {
      const CLIENT_ID =
        "1086227511811-inq0ac5m2n4695e58mnb1681f01m3d1t.apps.googleusercontent.com";
      const REDIRECT_URI = "https://auth.expo.io/@glerme/eletrobus";
      const SCOPE = encodeURI("profile email");
      const RESPONSE_TYPE = "token";

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const user = await response.json();

        console.log(user);
      }
    } catch (error) {}
  };

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/83/2f/4e/832f4e154589539b1f9a994bba57fc19.jpg",
      }}
      alt="teste"
      style={{ flex: 1 }}
    >
      <VStack p={4} mt={4} mb={4} flex={1} space={4}>
        <VStack space={4} bg="white" p="5" borderRadius={"md"} flex={1}>
          <Center>ICONE</Center>

          <VStack space={2}>
            <Input
              placeholder="E-mail"
              mb={4}
              InputLeftElement={<Icon as={<Envelope />} ml={4} />}
              onChangeText={(text) => setFields({ ...fields, email: text })}
              keyboardType="email-address"
            />

            <Input
              placeholder="Senha"
              mb={4}
              InputLeftElement={<Icon as={<Key />} ml={4} />}
              secureTextEntry
              onChangeText={(text) => setFields({ ...fields, password: text })}
            />

            <Button
              title="Entrar"
              onPress={handleSignIn}
              isLoading={isLoading}
              background={"primary.400"}
              fontColor="white"
              _pressed={{
                backgroundColor: "primary.700",
              }}
            />

            <Button
              title="Registre-se"
              onPress={handleSignIn}
              isLoading={isLoading}
              background={"transparent"}
              borderWidth={1}
              borderColor={"primary.400"}
              fontColor={"primary.400"}
            />
          </VStack>
          <Box>
            <Button
              title="Esqueci minha senha"
              onPress={handleSignIn}
              isLoading={isLoading}
              variant={"link"}
            />
          </Box>

          {/* <Box>
            <SocialButton title="Entrar com o Google" onPress={googleSignIn} />
          </Box> */}
        </VStack>
      </VStack>
    </ImageBackground>
  );
};
