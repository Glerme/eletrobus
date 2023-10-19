import { ActivityIndicator } from "react-native";

import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import { Box, Button, HStack, ScrollView, Text, VStack } from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useMultipleQueryRefetch } from "~/hooks/useMultipleQueryRefetch";

import { useAuth } from "~/contexts/AuthContext";

import { api } from "~/services/axios";

import { Alert } from "~/components/Alert";
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
    queryKey: ["favorites-home"],
    queryFn: async () => {
      const { data } = await api.get<any[]>("/favorites/home");
      return data;
    },
    initialData: [],
    placeholderData: [],
  });
  const busStopsQuery = useQuery({
    queryKey: ["busStops-home"],
    queryFn: async () => {
      const { data } = await api.get("/bus-stop/home");
      return data;
    },
    initialData: [],
    placeholderData: [],
  });
  const coursesQuery = useQuery({
    queryKey: ["courses-home"],
    queryFn: async () => {
      const { data } = await api.get("/course/home");
      return data;
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

  if (favoritesQuery.error || busStopsQuery.error || coursesQuery.error) {
    console.error(
      favoritesQuery.error || busStopsQuery.error || coursesQuery.error
    );

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
    <Background>
      <ScreenContent>
        <ScrollView
          showsVerticalScrollIndicator={false}
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
          <VStack flex={1} justifyContent={"space-between"}>
            {user?.driver ? (
              <>
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
                    onPress={() => navigation.navigate("Pontos" as any)}
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
                    onPress={() => navigation.navigate("Pontos" as any)}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <MagnifyingGlass size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Buscar rotas
                      </Text>
                    </HStack>
                  </Button>
                </VStack>
              </>
            ) : (
              <>
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

                <ListRouteCards
                  description="Favoritos"
                  data={favoritesQuery.data}
                  cardComponent={FavoritesCards}
                  onPressCard={(item) =>
                    navigation.navigate("PointDetails", {
                      id: `${item?.id}`,
                    })
                  }
                />

                {/* <VStack alignItems="center" mb="3" space={2}>
                  <Button
                    h={12}
                    w={"full"}
                    colorScheme="primary"
                    bg={THEME.colors.primary["500"]}
                    // onPress={() => navigation.navigate("Routes")}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <MagnifyingGlass size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Buscar Rotas
                      </Text>
                    </HStack>
                  </Button>

                  <Button
                    h={12}
                    w={"full"}
                    bg={THEME.colors.secondary["500"]}
                    colorScheme="secondary"
                    onPress={() => navigation.navigate("Map", {})}
                  >
                    <HStack space={1} alignItems={"center"}>
                      <GlobeHemisphereWest size={20} color="white" />
                      <Text fontSize={"sm"} fontWeight={"500"} color={"white"}>
                        Descobrir
                      </Text>
                    </HStack>
                  </Button>
                </VStack> */}
              </>
            )}
          </VStack>
        </ScrollView>
      </ScreenContent>
    </Background>
  );
};
