import { useState } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import {
  Box,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { Info } from "phosphor-react-native";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "~/contexts/AuthContext";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

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

import { THEME } from "~/styles/theme";

export const RouteDetailsScreen = ({
  navigation,
  route,
}: NavigationProps<"RouteDetails">) => {
  const { user } = useAuth();

  const [favorite, setFavorite] = useState<boolean>(false);

  const {
    data: point,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery<BusStopInterface>({
    queryKey: ["point-bus-details"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface>(
        `/bus-stop/${route.params.id}`
      );

      return data;
    },
  });

  if (isLoading) {
    return (
      <Background>
        <ScreenContent>
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <ActivityIndicator
              size={"large"}
              color={THEME.colors.primary["900"]}
            />
          </Box>
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
    <Background>
      <ScreenContent>
        <ScrollViewContainer
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
          }
        >
          <VStack space={4} flex={1}>
            <HStack alignItems={"center"}>
              <HStack space={2} alignItems="center">
                <View
                  width={4}
                  height={4}
                  borderRadius={50}
                  backgroundColor={true ? "#A7E179" : "#E17979"}
                />
                <Text fontSize="lg" fontWeight={"600"}>
                  {point?.name}
                </Text>
              </HStack>

              <Spacer />

              <FavoriteButton
                favorite={favorite}
                handlePress={() => setFavorite(!favorite)}
              />
            </HStack>

            <Box w={"full"}>
              <Image
                source={
                  point?.images
                    ? { uri: point?.images[0] ?? point.images[1] }
                    : require("~/assets/img/not-found.png")
                }
                w={"full"}
                h="56"
                borderRadius={"md"}
                alt={point?.name}
              />
            </Box>

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
                  {/* <TypeRoute mt={1} tipo={"estudantes"} /> */}
                </VStack>
              </HStack>

              {/* <FlatList
                data={mockedData}
                horizontal
                keyExtractor={(item) => `${item.id}`}
                renderItem={({ item }) => <HourCard isToday={item.isToday} />}
              /> */}
            </Box>

            <Box>
              <HStack alignItems={"center"} space={1} mb={1}>
                <Info size={18} color="#e8b10e" weight="duotone" />
                <Text fontSize={"sm"} fontWeight={"500"}>
                  Descrição
                </Text>
              </HStack>
              <Text fontSize={"sm"} flex={1} color={"gray.700"}>
                {point?.description}
              </Text>
            </Box>
            <Spacer />
            <Box>
              {user?.driver ? (
                <Button
                  onPress={() => console.log("click")}
                  title="Iniciar Viagem"
                  fontColor={"white"}
                />
              ) : (
                <Button
                  onPress={() =>
                    navigation.navigate("Map", {
                      pointId: point?.id,
                    })
                  }
                  title="Acompanhar Viagem"
                  fontColor={"white"}
                />
              )}
            </Box>
          </VStack>
        </ScrollViewContainer>
      </ScreenContent>
    </Background>
  );
};
