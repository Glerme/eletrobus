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

import { BusStopInterface, BusStopProps } from "~/interfaces/BusStop.interface";

import { api } from "~/services/axios";

import { NavigationProps } from "~/routes";

import { Alert } from "~/components/Alert";
import { HourCard } from "~/components/HourCard";
import { Button } from "~/components/Form/Button";
import { TypeRoute } from "~/components/TypeRoute";
import { Background } from "~/components/Layouts/Background";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { ScreenContent } from "~/components/Layouts/ScreenContent";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { ScrollViewContainer } from "~/components/Layouts/ScrollViewContainer";
import { ListBusStops } from "~/components/ListBusStops";
import { ListRoutes } from "~/components/ListRoutes";

import { THEME } from "~/styles/theme";
import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

export const PointDetailsScreen = ({
  navigation,
  route,
}: NavigationProps<"PointDetails">) => {
  const { user } = useAuth();

  console.log({ user });

  const [favorite, setFavorite] = useState<boolean>(false);

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useQuery<BusStopProps>({
      queryKey: ["point-bus-details"],
      queryFn: async () => {
        const { data } = await api.get<BusStopProps>(
          `/bus-stop/${route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );

        return data;
      },
    });

  const handleFavorite = async () => {
    try {
      console.log(user?.token);
      console.log("params", route.params.id);

      const { data } = await api.post(`/route/${route.params.id}/favorite`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log({ data });
    } catch (err) {
      const axiosError = axiosErrorHandler(err);

      console.log({ axiosError });
    }
  };

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

  console.log(user?.user);

  return (
    <Background>
      <ScreenContent>
        <ScrollViewContainer
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
          }
        >
          <HStack alignItems={"center"} space={2} mb={2}>
            <HStack space={2} alignItems="center">
              <View
                width={4}
                height={4}
                borderRadius={50}
                backgroundColor={true ? "#A7E179" : "#E17979"}
              />
              <Text fontSize="lg" fontWeight={"600"}>
                {data?.name}
              </Text>
            </HStack>

            <Spacer />

            {user && (
              <FavoriteButton
                // favorite={user?.user.favorite?.bus_stops?.includes(data?.id)}
                favorite={false}
                handlePress={handleFavorite}
              />
            )}
          </HStack>

          <Box w={"full"}>
            <Image
              source={
                data?.images
                  ? { uri: data?.images[0] ?? data.images[1] }
                  : require("~/assets/img/not-found.png")
              }
              w={"full"}
              h="56"
              borderRadius={"md"}
              alt={data?.name}
            />
          </Box>
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
                  <TypeRoute mt={1} tipo={"estudantes"} />
                </VStack>
              </HStack>

              <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              />
            </Box> */}

          <VStack>
            <HStack alignItems={"center"} mt={2} space={2}>
              <Info size={18} color="#4d34dd" weight="duotone" />
              <Text fontSize={"sm"} fontWeight={"600"}>
                Descrição
              </Text>
            </HStack>
            <Text fontSize={"sm"} color={"gray.700"}>
              {data?.description}
            </Text>
          </VStack>

          <VStack>
            <HStack alignItems={"center"} mt={2} space={2}>
              <Path size={18} color="#46B99E" weight="duotone" />
              <Text fontSize={"sm"} fontWeight={"600"}>
                Rotas
              </Text>
            </HStack>

            {data?.rotas?.map((rota) => (
              <ListRoutes
                key={rota.route_id}
                route={rota}
                onPress={() => alert(JSON.stringify(rota, null, 2))}
              />
            ))}
          </VStack>

          <Box mt={2}>
            <Button
              onPress={() =>
                navigation.navigate("Map", {
                  pointId: data?.id,
                })
              }
              title="Ver Ponto de Ônibus"
              fontColor={"white"}
              disabled={isRefetching || isLoading}
            />
          </Box>
        </ScrollViewContainer>
      </ScreenContent>
    </Background>
  );
};
