import { useState } from "react";
import { TouchableHighlight, TouchableNativeFeedback } from "react-native";

import {
  Box,
  FlatList,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  View,
} from "native-base";

import {
  MagnifyingGlass,
  Sliders,
  Student,
  UsersThree,
} from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { RouteInterface } from "~/interfaces/Route.interface";

import { routesMock } from "~/mock/RotasMock";
import CidadesMock from "~/mock/CidadesMock";

import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { BoxButton } from "~/components/BoxButton";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";
import { CirculedIcon } from "./styles";
import { AdvancedFilters } from "~/components/AdvancedFilters";

export interface ICity {
  id: number;
  name: string;
  favorite: boolean;
}

export interface IFilters {
  kindPeople: "todos" | "estudantes";
  kindRoute: "todos" | "municipal" | "intermunicipal";
  cities: ICity[];
  district: ICity[];
  // runStarted: boolean;
  time: Date;
}

export const RoutesScreen = ({
  navigation,
  route,
}: NavigationProps<"Routes">) => {
  // const [kindPeople, setKindPeople] = useState("todos");
  const [filters, setFilters] = useState<IFilters>({
    kindPeople: "todos",
    kindRoute: "todos",
    cities: [],
    district: [],
    time: new Date(),
  });
  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  // const selectCities = (city: ICity) => {
  //   if (cities.filter((item) => item.id === city.id).length > 0) {
  //     setCities(cities.filter((item) => item.id !== city.id));
  //   } else {
  //     setCities((prevCities) => [...prevCities, city]);
  //   }
  // };

  return (
    <Background>
      <ScreenContent>
        <HStack space={1}>
          <View flex={1} alignItems={"center"}>
            <Input
              placeholder="Pesquisar"
              InputRightElement={
                <TouchableHighlight onPress={() => console.log(filters)}>
                  <Icon as={<MagnifyingGlass />} mr={2} />
                </TouchableHighlight>
              }
            />
          </View>
          <TouchableNativeFeedback
            onPress={() => setShowAdvancedFilters(!showAdvancedFilters)}
            background={TouchableNativeFeedback.Ripple("#d4d4d4", false)}
          >
            <Box p={2}>
              <Sliders
                size={28}
                color={showAdvancedFilters ? "#442ccd" : "#404040"}
              />
            </Box>
          </TouchableNativeFeedback>
        </HStack>

        {/* Filtros Avançados */}
        {showAdvancedFilters && (
          <View>
            <AdvancedFilters filters={filters} setFilters={setFilters} />
          </View>
        )}

        {/* Filtros Avançados */}

        <Box w={"140"} mt={6} mb={2}>
          <Text
            fontSize={"md"}
            color={THEME.colors.gray["800"]}
            fontWeight={"600"}
          >
            Listagem
          </Text>
        </Box>

        <FlatList
          keyExtractor={(item) => `${item.id}`}
          data={routesMock}
          renderItem={({ item }: { item: RouteInterface }) => (
            <ListItem
              item={item}
              onPress={() => {
                navigation.navigate("RouteDetails", {
                  id: `${item?.id}`,
                });
              }}
              key={item.id}
            />
          )}
        />
      </ScreenContent>
    </Background>
  );
};
