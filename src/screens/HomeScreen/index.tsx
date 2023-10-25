import { ActivityIndicator } from "react-native";

import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import {
  Box,
  Button,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useMultipleQueryRefetch } from "~/hooks/useMultipleQueryRefetch";

import { useAuth } from "~/contexts/AuthContext";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { api } from "~/services/axios";

import { Alert } from "~/components/Alert";
import { StatusBar } from "~/components/StatusBar";
import { CoursesCards } from "./components/CoursesCards";
import { BusStopsCards } from "./components/BusStopsCards";
import { FavoritesCards } from "./components/FavoritesCards";
import { Background } from "~/components/Layouts/Background";
import { ListRouteCards } from "~/components/ListRouteCards";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  const { user } = useAuth();

  const favoritesQuery = useQuery({
    queryKey: ["favorites-home", user?.token],
    queryFn: async () => {
      if (user?.token) {
        const { data } = await api.get<any[]>("/user/favorite-route", {
          headers: {
            authorization: `Bearer ${user?.token}`,
          },
        });
        return data;
      }

      return [];
    },
    initialData: [],
    placeholderData: [],
  });
  const busStopsQuery = useQuery({
    queryKey: ["busStops-home", user?.token],
    queryFn: async () => {
      // const { data } = await api.get("/bus-stop/home");
      return [];
    },
    initialData: [],
    placeholderData: [],
  });
  const coursesQuery = useQuery({
    queryKey: ["courses-home", user?.token],
    queryFn: async () => {
      // const { data } = await api.get("/course/home");
      return [];
    },
    initialData: [],
    placeholderData: [],
  });

  const refetchQueries = useMultipleQueryRefetch();

  const handleUpdateData = async () => {
    refetchQueries(["favorites-home", "busStops-home", "courses-home"]);
  };

  if (
    favoritesQuery.isLoading ||
    busStopsQuery.isLoading ||
    coursesQuery.isLoading
  ) {
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

  if (favoritesQuery.error || busStopsQuery.error || coursesQuery.error) {
    const errorMessage = axiosErrorHandler(
      favoritesQuery.error || busStopsQuery.error || coursesQuery.error
    );

    console.error(errorMessage);

    return (
      <Background>
        <ScreenContent>
          <ScrollView
            refreshControl={
              <RefreshControl
                onRefresh={handleUpdateData}
                refreshing={
                  favoritesQuery.isRefetching ||
                  busStopsQuery.isRefetching ||
                  coursesQuery.isRefetching
                }
              />
            }
          >
            <Alert status="error" />
          </ScrollView>
        </ScreenContent>
      </Background>
    );
  }

  return (
    <>
      <StatusBar />
      <Background>
        <ScreenContent>
          {user?.user?.driver ? (
            <ScrollView>
              <Box
                display={"flex"}
                justifyItems={"center"}
                alignItems={"center"}
              >
                <LottieView
                  autoPlay
                  loop
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  source={require("~/assets/animations/driver.json")}
                />
              </Box>

              <VStack alignItems="center" mb="3" mt="2" space={2}>
                <Button
                  h={12}
                  w={"full"}
                  colorScheme="primary"
                  bg={THEME.colors.primary["500"]}
                  onPress={() => navigation.navigate("Points" as any)}
                >
                  <HStack space={1} alignItems={"center"}>
                    <MagnifyingGlass size={20} color="white" />
                    <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                      Iniciar rota
                    </Text>
                  </HStack>
                </Button>

                <Button
                  h={12}
                  w={"full"}
                  colorScheme="secondary"
                  bg={THEME.colors.secondary["500"]}
                  onPress={() => navigation.navigate("Points" as any)}
                >
                  <HStack space={1} alignItems={"center"}>
                    <MagnifyingGlass size={20} color="white" />
                    <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                      Buscar rotas
                    </Text>
                  </HStack>
                </Button>
              </VStack>
            </ScrollView>
          ) : (
            <ScrollView>
              <ListRouteCards
                description="Pontos de ônibus"
                data={busStopsQuery.data}
                cardComponent={BusStopsCards}
                onPressCard={(item) =>
                  navigation.navigate("PointDetails", {
                    id: `${item?.id}`,
                  })
                }
              />

              <ListRouteCards
                description="Percursos"
                data={coursesQuery.data}
                cardComponent={CoursesCards}
                onPressCard={(item) =>
                  // navigation.navigate("PointDetails", {
                  //   id: `${item?.id}`,
                  // })

                  console.log(item)
                }
              />

              {user?.token && (
                <ListRouteCards
                  description="Favoritos"
                  data={favoritesQuery?.data}
                  cardComponent={FavoritesCards}
                  onPressCard={(item) =>
                    navigation.navigate("PointDetails", {
                      id: `${item?.id}`,
                    })
                  }
                />
              )}

              <Text>{JSON.stringify(user, null, 2)}</Text>
            </ScrollView>
          )}
        </ScreenContent>
      </Background>
    </>
  );
};
