import { useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import {
  Box,
  Center,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { Info, Path } from "phosphor-react-native";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "~/contexts/AuthContext";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { api } from "~/services/axios";

import { NavigationProps } from "~/routes";

import { Alert } from "~/components/Alert";
import { ListBusStops } from "~/components/ListBusStops";
import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { TypeRoute } from "~/components/TypeRoute";
import { StatusBar } from "~/components/StatusBar";
import { ListRoutes } from "~/components/ListRoutes";
import { Background } from "~/components/Layouts/Background";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { ScrollViewContainer } from "~/components/Layouts/ScrollViewContainer";

import { THEME } from "~/styles/theme";
import { CourseInterface, CourseProps } from "~/interfaces/Course.interface";

export const CourseDetailsScreen = ({
  navigation,
  route,
}: NavigationProps<"CouseDetails">) => {
  const { user } = useAuth();

  const [favorite, setFavorite] = useState<boolean>(false);

  const courseMock: CourseProps = {
    route_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
    initial_hour: "2023-10-08T17:03:21.204Z",
    final_hour: "2023-10-08T17:03:21.204Z",
    vehicle_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
    route_name: "Rota 1",
    user_id: "ea17daf1-6de0-4f46-b0e7-4ee9207a1af6",
  };

  const routeIdMock = "651327d4b937f4bb0215d6e8";
  const {
    data: point,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery<BusStopInterface>({
    queryKey: ["course-details", route.params.id],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface>(
        `/course/${route.params.id}`
      );

      return data;
    },
  });

  // if (isLoading) {
  //   return (
  // <Background>
  //   <ScreenContent>
  //     <Center flex={1}>
  //       <ActivityIndicator size={"large"} color={THEME.colors.primary["900"]} />
  //     </Center>
  //   </ScreenContent>
  // </Background>;
  //   );
  // }

  // if (isError) {
  //   console.error(error);

  //   return (
  //     <Background>
  //       <ScreenContent>
  //         <Alert status="error" />
  //       </ScreenContent>
  //     </Background>
  //   );
  // }

  return (
    <>
      <StatusBar />

      <Background>
        <ScreenContent>
          <ScrollViewContainer
          // refreshControl={
          //   <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
          // }
          >
            <HStack alignItems={"center"} space={2}>
              <HStack space={2} alignItems="center">
                <View
                  width={4}
                  height={4}
                  borderRadius={50}
                  backgroundColor={true ? "#A7E179" : "#E17979"}
                />
                <Text fontSize="lg" fontWeight={"600"}>
                  {courseMock.route_name}
                </Text>
              </HStack>

              <Spacer />

              <FavoriteButton
                favorite={favorite}
                handlePress={() => setFavorite(!favorite)}
              />
            </HStack>

            <Box>
              <HStack alignItems={"flex-start"} mb={2}>
                <VStack space={1}>
                  <Text fontWeight={500} fontSize="sm">
                    Saida: 10h
                  </Text>
                  <Text fontWeight={500} fontSize="sm">
                    Chegada: 23h
                  </Text>
                </VStack>
                <Spacer />
                <VStack space={1} alignItems="flex-end">
                  <StatusInfo statusCorrida={EStatusType.EM_MOVIMENTO} />
                </VStack>
              </HStack>

              {/* <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              /> */}
            </Box>
            <Box mt={2}>
              <Button
                onPress={() =>
                  navigation.navigate("Map", {
                    routeId: routeIdMock,
                  })
                }
                title="Ver rota de Ônibus"
                fontColor={"white"}
                disabled={isRefetching || isLoading}
              />
            </Box>
          </ScrollViewContainer>
        </ScreenContent>
      </Background>
    </>
  );
};
