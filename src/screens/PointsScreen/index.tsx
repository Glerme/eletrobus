import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight,
  TouchableNativeFeedback,
} from "react-native";

import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass, Sliders } from "phosphor-react-native";
import { Box, Center, FlatList, HStack, Icon, Text, View } from "native-base";

import { NavigationProps } from "~/routes";

import { api } from "~/services/axios";

import { useAuth } from "~/contexts/AuthContext";

import { CourseProps } from "~/interfaces/Course.interface";
import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { Alert } from "~/components/Alert";
import { Input } from "~/components/Form/Input";
import { ListItem } from "~/components/ListItem";
import { StatusBar } from "~/components/StatusBar";
import { ListCourses } from "~/components/ListCourses";
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
  const { user } = useAuth();

  const [filters, setFilters] = useState<IFilters>({
    kindRoute: "todos",
    cities: [],
    district: [],
    time: new Date(),
  });

  const [showAdvancedFilters, setShowAdvancedFilters] =
    useState<boolean>(false);

  const [courses, setCourses] = useState<CourseProps[] | null>(null);
  const [busStops, setBusStops] = useState<BusStopInterface[] | null>(null);

  const { isLoading, isError, error, refetch, isRefetching } = useQuery<
    BusStopInterface[] | CourseProps[]
  >({
    queryKey: ["bus-stop"],
    queryFn: async () => {
      if (user?.driver) {
        const { data } = await api.get<CourseProps[]>("/course");
        setCourses(data);
        return data;
      } else {
        const { data } = await api.get<BusStopInterface[]>("/bus-stop");
        setBusStops(data);
        return data;
      }
    },
  });

  if (isLoading) {
    return (
      <Background>
        <ScreenContent>
          <Center flex={1}>
            <ActivityIndicator
              size={"large"}
              color={THEME.colors.primary["900"]}
            />
          </Center>
        </ScreenContent>
      </Background>
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

  switch (user?.driver) {
    case true:
      return (
        <>
          <StatusBar />
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
              </HStack>

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
                keyExtractor={(item) => `${item?.vehicle_id}`}
                data={courses}
                refreshControl={
                  <RefreshControl
                    onRefresh={refetch}
                    refreshing={isRefetching}
                  />
                }
                renderItem={({ item }: { item: CourseProps }) => (
                  <ListCourses
                    item={item}
                    onPress={() => {
                      navigation.navigate("CouseDetails", {
                        id: `${item?.vehicle_id}`,
                      });
                    }}
                    key={item?.vehicle_id}
                  />
                )}
              />
            </ScreenContent>
          </Background>
        </>
      );

    default:
      return (
        <>
          <StatusBar />
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
                data={busStops}
                refreshControl={
                  <RefreshControl
                    onRefresh={refetch}
                    refreshing={isRefetching}
                  />
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
        </>
      );
  }
};
