import { useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import { Info, Path } from "phosphor-react-native";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Center,
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
} from "native-base";

import { useAuth } from "~/contexts/AuthContext";

import api from "~/services/axios";

import { NavigationProps } from "~/routes";

import { Alert } from "~/components/Alert";
import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { TypeRoute } from "~/components/TypeRoute";
import { StatusBar } from "~/components/StatusBar";
import { Background } from "~/components/Layouts/Background";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { ScrollViewContainer } from "~/components/Layouts/ScrollViewContainer";

import { THEME } from "~/styles/theme";

interface CourseDataProps {
  id: string;
  name: string;
  bus_stops: [
    {
      bus_stop: {
        id: string;
        latitude: number;
        longitude: number;
        name: string;
      };
      bus_stop_id: string;
      latitude: number;
      longitude: number;
    }
  ];
}

export const CourseDetailsScreen = ({
  navigation,
  route,
}: NavigationProps<"CouseDetails">) => {
  const { user } = useAuth();

  const [favorite, setFavorite] = useState<boolean>(false);

  console.log("id", route.params.id);

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useQuery<CourseDataProps>({
      queryKey: ["route", route.params.id],
      queryFn: async () => {
        const { data } = await api.get<CourseDataProps>(
          `/route/${route.params.id}`
        );

        return data;
      },
    });

  console.log({ data });

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

  return (
    <>
      <StatusBar />

      <Background>
        <ScreenContent>
          <ScrollViewContainer
            refreshControl={
              <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
            }
          >
            <HStack alignItems={"center"} space={2}>
              <HStack space={2} alignItems="center">
                <Path color="#46B99E" weight="duotone" />
                <Text fontSize="lg" fontWeight={"600"}>
                  {data?.name}
                </Text>
              </HStack>

              <Spacer />

              {/* <FavoriteButton
                favorite={favorite}
                handlePress={() => setFavorite(!favorite)}
              /> */}
            </HStack>

            <VStack mt={2}>
              <HStack alignItems={"center"} mt={2} space={2}>
                <Info size={18} color="#4d34dd" weight="duotone" />
                <Text fontSize={"sm"} fontWeight={"600"}>
                  Pontos de parada
                </Text>
              </HStack>
              {data?.bus_stops?.map((busStop) => (
                <Text fontSize={"sm"} color={"gray.700"}>
                  {busStop?.bus_stop?.name}
                </Text>
              ))}
            </VStack>

            <Divider mt={4} mb={4} bg={"gray.300"} />

            {/* <Box>
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

              <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              />
            </Box> */}

            <Box mt={2}>
              <Button
                onPress={() =>
                  navigation.navigate("Map", {
                    routeId: data.id,
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
