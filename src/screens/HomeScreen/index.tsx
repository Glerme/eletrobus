import { ActivityIndicator } from "react-native";

import LottieView from "lottie-react-native";
import { useQuery } from "@tanstack/react-query";
import { RefreshControl } from "react-native-gesture-handler";
import {
  Box,
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { MagnifyingGlass } from "phosphor-react-native";

import { NavigationProps } from "~/routes";

import { useMultipleQueryRefetch } from "~/hooks/useMultipleQueryRefetch";

import { useAuth } from "~/contexts/AuthContext";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import api from "~/services/axios";

import { Alert } from "~/components/Alert";
import { Button } from "~/components/Form/Button";
import { Avatar } from "~/components/Form/Avatar";
import { StatusBar } from "~/components/StatusBar";
import { CoursesCards } from "./components/CoursesCards";
import { BusStopsCards } from "./components/BusStopsCards";
import { FavoritesCards } from "./components/FavoritesCards";
import { Background } from "~/components/Layouts/Background";
import { ListHomeCards } from "~/components/ListHomeCards";
import { ListFavorites } from "~/components/ListFavorites";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

export const HomeScreen = ({ navigation, route }: NavigationProps<"Home">) => {
  const { user } = useAuth();

  // const busStopsQuery = useQuery({
  //   queryKey: ["busStops-home", user?.token],
  //   queryFn: async () => {
  //     const { data } = await api.get("/bus-stop/");
  //     return data;
  //   },
  //   initialData: [],
  //   placeholderData: [],
  // });

  // const coursesQuery = useQuery({
  //   queryKey: ["courses-home", user?.token],
  //   queryFn: async () => {
  //     const { data } = await api.get("/course/");
  //     return data;
  //   },
  //   initialData: [],
  //   placeholderData: [],
  // });

  const refetchQueries = useMultipleQueryRefetch();

  const handleUpdateData = async () => {
    refetchQueries(["favorites-home", "busStops-home", "courses-home"]);
  };

  // if (busStopsQuery.isLoading || coursesQuery.isLoading) {
  //   return (
  //     <Background>
  //       <ScreenContent>
  //         <Center flex={1}>
  //           <ActivityIndicator
  //             size={"large"}
  //             color={THEME.colors.primary["900"]}
  //           />
  //         </Center>
  //       </ScreenContent>
  //     </Background>
  //   );
  // }

  // if (busStopsQuery.error || coursesQuery.error) {
  //   const errorMessage = axiosErrorHandler(
  //     busStopsQuery.error || coursesQuery.error
  //   );

  //   console.error(errorMessage);

  //   return (
  //     <Background>
  //       <ScreenContent>
  //         <ScrollView
  //           refreshControl={
  //             <RefreshControl
  //               onRefresh={handleUpdateData}
  //               refreshing={
  //                 busStopsQuery.isRefetching || coursesQuery.isRefetching
  //               }
  //             />
  //           }
  //         >
  //           <Alert status="error" />
  //         </ScrollView>
  //       </ScreenContent>
  //     </Background>
  //   );
  // }

  return (
    <>
      <StatusBar />
      <Background>
        {user?.user ? (
          <HStack alignItems="center" space={2} mx={1} p={1}>
            <Avatar
              bg="blue.500"
              size="md"
              source={{
                uri: user?.user?.avatar,
              }}
            />
            <VStack>
              <Text fontSize="sm" fontWeight="bold" color={"white"}>
                Seja bem vindo(a)!
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={"white"}>
                {user?.user?.name}
              </Text>
            </VStack>
          </HStack>
        ) : (
          <HStack alignItems="center" space={2} mx={1} p={1}>
            <VStack>
              <Text fontSize="xl" fontWeight="bold" color={"white"}>
                Seja bem vindo(a)!
              </Text>
            </VStack>
          </HStack>
        )}

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
                  title="Iniciar rota"
                  leftIcon={
                    <Icon as={<MagnifyingGlass size={20} color="white" />} />
                  }
                />

                <Button
                  h={12}
                  w={"full"}
                  colorScheme="secondary"
                  bg={THEME.colors.secondary["500"]}
                  onPress={() => navigation.navigate("Points" as any)}
                  leftIcon={
                    <Icon as={<MagnifyingGlass size={20} color="white" />} />
                  }
                  title="Buscar rotas"
                />
              </VStack>
            </ScrollView>
          ) : (
            <ScrollView>
              <VStack flex={1}>
                <Center ml={"20"}>
                  <LottieView
                    autoPlay
                    loop={false}
                    style={{
                      width: 300,
                      height: 300,
                    }}
                    source={require("~/assets/animations/home.json")}
                  />
                </Center>

                {/* {user?.token && (
                  <ListHomeCards
                    description="Favoritos"
                    data={user?.user?.favorite_bus_stop}
                    cardComponent={ListFavorites}
                    onPressCard={(item) =>
                      navigation.navigate("PointDetails", {
                        id: `${item?.id}`,
                      })
                    }
                  />
                )} */}

                <Text>{JSON.stringify(user, null, 2)}</Text>
              </VStack>
            </ScrollView>
          )}
        </ScreenContent>
      </Background>
    </>
  );
};
