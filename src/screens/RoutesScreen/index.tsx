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
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} from "react-native";

import {
  MagnifyingGlass,
  Student,
  UsersThree,
  Star,
} from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { Title } from "~/components/Layouts/Title";
import { Input } from "~/components/Form/Input";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";
import { CirculedIcon } from "./styles";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { BoxButton } from "~/components/BoxButton";

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

// export const RoutesScreen = ({
//
// }: NavigationProps<"Routes">) => {

interface ICity {
  id: number;
  name: string;
  favorite: boolean;
}

export const RoutesScreen = ({
  navigation,
  route,
}: NavigationProps<"Routes">) => {
  const [kindPeople, setKindPeople] = useState("todos");
  const [cities, setCities] = useState<ICity[]>([]);

  const selectCities = (city: ICity) => {
    if (cities.filter((item) => item.id === city.id).length > 0) {
      setCities(cities.filter((item) => item.id !== city.id));
    } else {
      setCities((prevCities) => [...prevCities, city]);
    }
  };

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
          <TouchableNativeFeedback
            onPress={() => setKindPeople("todos")}
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon
                borderColor={
                  kindPeople == "todos"
                    ? THEME.colors.primary["500"]
                    : undefined
                }
              >
                <UsersThree
                  size={22}
                  color={
                    kindPeople == "todos"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                />
              </CirculedIcon>

              <Text
                fontSize="md"
                fontFamily="medium"
                color={
                  kindPeople == "todos"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              >
                Todos
              </Text>
            </Flex>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => setKindPeople("estudantes")}
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Flex flexDirection={"row"} alignItems={"center"} p={1}>
              <CirculedIcon
                borderColor={
                  kindPeople == "estudantes"
                    ? THEME.colors.primary["500"]
                    : undefined
                }
              >
                <Student
                  size={22}
                  color={
                    kindPeople == "estudantes"
                      ? THEME.colors.primary["500"]
                      : THEME.colors.gray["800"]
                  }
                />
              </CirculedIcon>
              <Text
                fontSize="md"
                fontFamily="medium"
                color={
                  kindPeople == "estudantes"
                    ? THEME.colors.primary["500"]
                    : THEME.colors.gray["800"]
                }
              >
                Estudantes
              </Text>
            </Flex>
          </TouchableNativeFeedback>
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
              <BoxButton
                item={item}
                isActive={
                  cities.filter((city) => city.id === item.id).length > 0
                }
                onPress={() => selectCities(item)}
                key={item.id}
              />
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
                navigation.navigate("RouteDetails", {
                  id: `${item?.id}`,
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
