import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  Text,
  VStack,
} from "native-base";

import { Button } from "~/components/Button";
import { SafeAreaView } from "~/components/SafeAreaView";

export const Login: React.FC = () => {
  return (
    <SafeAreaView>
      <Container p="4">
        <HStack direction="row" space={2} mb={4}>
          <Center>
            <Text>Icone</Text>
          </Center>

          <Center>
            <Text>EletroBus</Text>
          </Center>
        </HStack>

        <Box mb={5}>
          <Heading width={"200px"} fontWeight={"bold"}>
            Mantenha-se informado sobre as rotas e horários dos ônibus na palma
            da sua mão.
          </Heading>
        </Box>

        <VStack space={4} bg="white" w={""} h={"md"} p="5" borderRadius={"md"}>
          <Box>
            <Heading fontSize={"md"}>Escolha uma opção: </Heading>
          </Box>

          <VStack space={2}>
            <Button onPress={() => console.log("oi")}>teste</Button>
            <Button onPress={() => console.log("oi")}>teste</Button>
          </VStack>
        </VStack>
      </Container>
    </SafeAreaView>
  );
};
