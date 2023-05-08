import { Box, Center, HStack, Heading, Text, VStack } from "native-base";
import { ImageBackground } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { CardButton } from "./components/CardButton";

export const ChooseUser: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={{
        uri: "https://i.pinimg.com/736x/83/2f/4e/832f4e154589539b1f9a994bba57fc19.jpg",
      }}
      alt="background"
      style={{ flex: 1 }}
    >
      <VStack p={4} mt={4} mb={4} flex={1} space={4}>
        <HStack space={2}>
          <Center>
            <Text>Icone</Text>
          </Center>

          <Center>
            <Heading fontSize={16}>EletroBus</Heading>
          </Center>
        </HStack>

        <Box mb={5}>
          <Heading width={"250px"} fontWeight={"bold"}>
            Mantenha-se informado sobre as rotas e horários dos ônibus na palma
            da sua mão.
          </Heading>
        </Box>

        <VStack space={4} bg="white" p="5" borderRadius={"md"} flex={1}>
          <Box>
            <Heading fontSize={"md"}>Escolha uma opção: </Heading>
          </Box>

          <VStack space={2}>
            <CardButton
              name="Sou Motorista"
              onPress={() =>
                navigation.navigate("login", {
                  screen: "driver",
                })
              }
              icon="bus-alt"
            />
            <CardButton
              name="Sou Passageiro"
              onPress={() =>
                navigation.navigate("login", {
                  screen: "passenger",
                })
              }
              icon="seat-passenger"
            />
          </VStack>
        </VStack>
      </VStack>
    </ImageBackground>
  );
};
