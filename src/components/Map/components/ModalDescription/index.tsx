import { useState } from "react";
import { ActivityIndicator } from "react-native";

import {
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "native-base";

import { Modalize } from "react-native-modalize";
import { useQuery } from "@tanstack/react-query";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

import { useAuth } from "~/contexts/AuthContext";

import { api } from "~/services/axios";

import { Modal } from "~/components/Modal";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ListRoutes } from "~/components/ListRoutes";
import { ErrorAlert } from "~/components/ErrorAlert";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

import { THEME } from "~/styles/theme";
import { RoutesProps } from "~/interfaces/Routes.interface";

interface ModalDescriptionProps {
  point: BusStopInterface | null;
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
}

export const ModalDescription = ({
  point,
  forwardedRef,
  onClose,
}: ModalDescriptionProps) => {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(point?.favorito ?? false);

  const handleFavoritePoint = () => {
    setFavorite(!favorite);
  };

  const { data, isLoading, isError, error } = useQuery<BusStopInterface>({
    queryKey: ["routes-bus"],
    queryFn: async () => {
      const { data } = await api.get<BusStopInterface>(
        `/bus-stop/${point?.id}`
      );
      return data;
    },
  });

  const handleOpenBus = async (route: RoutesProps) => {
    console.log({ route });
    const { data } = await api.get(`/bus-stop/${route.route_id}`);

    console.log("BUSCAR ROTA", data);
  };

  return (
    <Modal
      forwardedRef={forwardedRef}
      modalHeight={500}
      adjustToContentHeight={false}
      onClose={onClose}
    >
      <VStack px={23} mt={6} space={2}>
        <HStack alignItems={"center"}>
          <Title size="md" textAlign={"left"}>
            {point?.name}
          </Title>

          <Spacer />

          <FavoriteButton
            favorite={favorite}
            handlePress={handleFavoritePoint}
          />
        </HStack>

        <Box
          width={"full"}
          p={2}
          borderWidth={2}
          borderRadius={4}
          borderColor={"primary.400"}
        >
          <Image
            source={
              point?.images
                ? { uri: point?.images[0] }
                : require("~/assets/img/not-found.png")
            }
            alt={point?.name}
            w={"full"}
            h={"150"}
            resizeMode={"contain"}
          />
        </Box>

        <VStack mt={6}>
          <Title size="md">Pontos</Title>
        </VStack>

        <VStack mt={1} space={1}>
          {user?.driver ? (
            <>
              <Button
                title="Iniciar Corrida"
                onPress={() => console.log("iniciar corrida")}
                fontColor="white"
              />
            </>
          ) : (
            <>
              {isLoading ? (
                <Box flex={1} justifyContent={"center"} alignItems={"center"}>
                  <ActivityIndicator
                    size={"large"}
                    color={THEME.colors.primary["900"]}
                  />
                </Box>
              ) : isError ? (
                <Box>
                  <ErrorAlert error={error} />
                </Box>
              ) : (
                data?.rotas?.map((route) => (
                  <ListRoutes
                    key={route.route_id}
                    route={route}
                    onPress={() => handleOpenBus(route)}
                  />
                ))
              )}
            </>
          )}
        </VStack>
      </VStack>
    </Modal>
  );
};
