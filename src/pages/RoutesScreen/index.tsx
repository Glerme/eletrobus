import {
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { TouchableHighlight } from "react-native";

import { Users, GraduationCap, MagnifyingGlass } from "phosphor-react-native";

import { Input } from "~/components/Input";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";

const mockedData = [
  {
    id: 1,
    name: "Bauru - SP",
  },
  {
    id: 2,
    name: "São Paulo - SP",
  },
  {
    id: 3,
    name: "Rio de Janeiro - RJ",
  },
  {
    id: 4,
    name: "Belo Horizonte - MG",
  },
  {
    id: 5,
    name: "Porto Alegre - RS",
  },
];

export const RoutesScreen = ({}) => {
  return (
    <Background>
      <ScreenContent>
        <Input
          placeholder="Pesquisar"
          InputRightElement={
            <TouchableHighlight onPress={() => console.log("pesquisar")}>
              <Icon as={<MagnifyingGlass />} mr={2} />
            </TouchableHighlight>
          }
        />

        <HStack space={4} p={2}>
          <TouchableHighlight onPress={() => console.log("clicado")}>
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <Icon as={<Users />} mr={1} />
              <Heading size="sm">Todos</Heading>
            </Flex>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => console.log("clicado")}>
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <Icon as={<GraduationCap />} mr={1} />
              <Heading size="sm">Estudantes</Heading>
            </Flex>
          </TouchableHighlight>
        </HStack>

        <Box>
          <Heading size="sm">Intermunicipais</Heading>

          <HStack collapsable>
            {mockedData?.map((item) => (
              <Pressable onPress={() => console.log("aqui")} key={item?.id}>
                {({ isPressed }) => (
                  <Box
                    bg={isPressed ? "coolGray.200" : "white"}
                    maxW={150}
                    minW={50}
                    p="2"
                    rounded="8"
                    borderColor={"coolGray.200"}
                    borderWidth={1}
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                  >
                    <Text fontSize="sm">Bauru - SP</Text>
                  </Box>
                )}
              </Pressable>
            ))}
          </HStack>
        </Box>
      </ScreenContent>
    </Background>
  );
};
