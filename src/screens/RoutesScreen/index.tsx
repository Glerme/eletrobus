import {
  Box,
  FlatList,
  Flex,
  HStack,
  Heading,
  Icon,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { TouchableHighlight, View } from "react-native";

import {
  MagnifyingGlass,
  Student,
  UsersThree,
  Star,
} from "phosphor-react-native";

import { Title } from "~/components/Title";
import { Input } from "~/components/Input";
import { Background } from "~/components/Background";
import { ScreenContent } from "~/components/ScreenContent";
import { CirculedIcon } from "./styles";
import { THEME } from "~/styles/theme";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "~/constants/routes";

const mockedData = [
  {
    id: 1,
    name: "Bauru",
    favorite: true,
  },
  {
    id: 2,
    name: "São Paulo",
    favorite: false,
  },
  {
    id: 3,
    name: "Rio de Janeiro",
    favorite: true,
  },
  {
    id: 4,
    name: "Belo Horizonte",
    favorite: false,
  },
  {
    id: 5,
    name: "Porto Alegre1",
    favorite: true,
  },
  {
    id: 6,
    name: "Porto Alegre2",
    favorite: false,
  },
  {
    id: 7,
    name: "Porto Alegre3",
    favorite: true,
  },
  {
    id: 8,
    name: "Porto Alegre4",
    favorite: false,
  },
  {
    id: 9,
    name: "Porto Alegre5",
    favorite: false,
  },
  {
    id: 10,
    name: "Porto Alegre6",
    favorite: false,
  },
  {
    id: 11,
    name: "Porto Alegre7",
    favorite: false,
  },
  {
    id: 12,
    name: "Porto Alegre8",
    favorite: false,
  },
  {
    id: 13,
    name: "Porto Alegre9",
    favorite: false,
  },
];

export const RoutesScreen = ({}) => {
  const navigation = useNavigation<any>();

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
              <CirculedIcon>
                <UsersThree size={22} color={THEME.colors.gray["800"]} />
              </CirculedIcon>

              <Text fontSize="md" fontFamily="medium" color="gray.800">
                Todos
              </Text>
            </Flex>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => console.log("clicado")}>
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon>
                <Student size={22} color={THEME.colors.gray["800"]} />
              </CirculedIcon>
              <Text fontSize="md" fontFamily="medium" color="gray.800">
                Estudantes
              </Text>
            </Flex>
          </TouchableHighlight>
        </HStack>

        <VStack mt={1}>
          <Box w={"140"} mb={2}>
            <Title size="sm">Intermunicipais</Title>
          </Box>

          <FlatList
            horizontal
            contentContainerStyle={{ alignSelf: "flex-start" }}
            showsVerticalScrollIndicator={false}
            data={mockedData}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
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
            )}
          />
        </VStack>

        <Box w={"140"} mt={4}>
          <Title size="sm">Listagem</Title>
        </Box>

        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={mockedData}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate(ROUTES.ROUTE_DETAILS, {
                  id: item?.id,
                })
              }
              key={item?.id}
            >
              {({ isPressed }) => (
                <Box
                  bg={isPressed ? "coolGray.200" : "white"}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  py="2"
                >
                  <HStack space={2} alignItems={"center"} py="2">
                    <Star
                      size={14}
                      weight="fill"
                      color={item.favorite ? "#E9C25F" : "#9C9C9C"}
                    />

                    <Heading
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      size="sm"
                    >
                      {item.name}
                    </Heading>
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
