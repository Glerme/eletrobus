import { useState } from "react";
import { ImageBackground } from "react-native";

import { Box, Icon, VStack } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { Input } from "~/components/Input";
import { Button } from "~/components/Button";

interface LoginProps {
  route: any;
}

export const Login = ({ route }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {};

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
          <Box>ICONE</Box>

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
        </VStack>
      </VStack>
    </ImageBackground>
  );
};
