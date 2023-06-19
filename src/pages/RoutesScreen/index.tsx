import {
  Box,
  FlatList,
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

import { Title } from "~/components/Title";
import { Input } from "~/components/Input";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";

const mockedData = [
  {
    id: 1,
    name: "Bauru",
  },
  {
    id: 2,
    name: "São Paulo",
  },
  {
    id: 3,
    name: "Rio de Janeiro",
  },
  {
    id: 4,
    name: "Belo Horizonte",
  },
  {
    id: 5,
    name: "Porto Alegre",
  },
  {
    id: 6,
    name: "Porto Alegre",
  },
  {
    id: 7,
    name: "Porto Alegre",
  },
  {
    id: 8,
    name: "Porto Alegre",
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

        <HStack space={4} paddingY={2}>
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

        <VStack mt={1}>
          <Box w={"140"} mb={2}>
            <Title size="sm">Intermunicipais</Title>
          </Box>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            alwaysBounceVertical={false}
          >
            <FlatList
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={Math.ceil(mockedData?.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              data={mockedData}
              keyExtractor={(item) => `${item.id}`}
              renderItem={({ item }) => (
                <>
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
                          margin: 2,
                          transform: [
                            {
                              scale: isPressed ? 0.96 : 1,
                            },
                          ],
                        }}
                      >
                        <Text fontSize="sm">{item?.name}</Text>
                      </Box>
                    )}
                  </Pressable>
                </>
              )}
            />
          </ScrollView>
        </VStack>

        <Box w={"140"} mt={4}>
          <Title size="sm">Listagem</Title>
        </Box>

        <FlatList
          data={mockedData}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <Pressable onPress={() => console.log("aqui")} key={item?.id}>
              {({ isPressed }) => (
                <Box
                  bg={isPressed ? "coolGray.200" : "white"}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={2}>
                    <Text
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      bold
                    >
                      {item.name}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.name}
                    </Text>
                  </HStack>
                </Box>
              )}
            </Pressable>
          )}
        />
      </ScreenContent>
    </Background>
  );
};
