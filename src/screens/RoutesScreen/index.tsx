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
import { ListItem } from "~/components/ListItem";
import CidadesMock from "~/mock/CidadesMock";
import RotasMock from "~/mock/RotasMock";

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
            data={CidadesMock}
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

        <Box w={"140"} mt={4} mb={2}>
          <Title size="sm">Listagem</Title>
        </Box>

        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={RotasMock}
          renderItem={({ item }) => (
            <ListItem item={item} navigation={navigation} key={item.id} />
          )}
        />
      </ScreenContent>
    </Background>
  );
};
