import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { Box, FlatList, HStack, Icon, Text, View } from "native-base";

import { NavigationProps } from "~/routes";

import { api } from "~/services/axios";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { Background } from "~/components/Layouts/Background";
import { AdvancedFilters } from "~/components/AdvancedFilters";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

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

export const PointsScreen = ({
  navigation,
  route,
}: NavigationProps<"Points">) => {
  const [filters, setFilters] = useState<IFilters>({
    kindPeople: "todos",
    kindRoute: "todos",
    cities: [],
    district: [],
    time: new Date(),
  });

  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery<
    BusStopInterface[]
  >({
    queryKey: ["bus-stop"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface[]>("/bus-stop");
      return data;
    },
  });

  if (isLoading) {
    return (
      <Box
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
        backgroundColor={"gray.400"}
      >
        <ActivityIndicator size={"large"} color={THEME.colors.primary["900"]} />
      </Box>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <Background>
        <ScreenContent>
          <Alert status="error" />
        </ScreenContent>
      </Background>
    );
  }

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

        {showAdvancedFilters && (
          <View>
            <AdvancedFilters filters={filters} setFilters={setFilters} />
          </View>
        )}

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
          keyExtractor={(item) => `${item?.id}`}
          data={data}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
          }
          renderItem={({ item }: { item: BusStopInterface }) => (
            <ListItem
              item={item}
              onPress={() => {
                navigation.navigate("PointDetails", {
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
