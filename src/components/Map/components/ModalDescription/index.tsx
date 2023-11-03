import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import Toast from "react-native-toast-message";
import { Modalize } from "react-native-modalize";
import { useQuery } from "@tanstack/react-query";
import { Box, HStack, Image, Spacer, VStack } from "native-base";

import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";

import { useAuth } from "~/contexts/AuthContext";

import api from "~/services/axios";
import { getBusStopById } from "~/services/MapServices/getBusStopById";
import { getFavoritesModalService } from "~/services/MapServices/getFavoritesModalService";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { Modal } from "~/components/Modal";
import { Alert } from "~/components/Alert";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ListRoutes } from "~/components/ListRoutes";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

import { THEME } from "~/styles/theme";
import { MyQueryInterface } from "~/interfaces/User.interface";

interface FavoriteBusStopProps {
  id: string;
  bus_stop_id: string;
  user_id: string;
  bus_stop: {
    id: string;
    name: string;
    route_id: string;
    description: string;
    latitude: number;
    longitude: number;
    image_bus_stop: [
      {
        image: string;
      }
    ];
  };
}

interface ModalDescriptionProps {
  point: BusStopProps;
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
  handleOpenRoute: (route: RoutesProps) => void;
}

export const ModalDescription = ({
  point,
  forwardedRef,
  onClose,
  handleOpenRoute,
}: ModalDescriptionProps) => {
  const { user, updateUser, getRefreshToken } = useAuth();
  const [favorite, setFavorite] = useState(point?.favorito ?? false);

  const { data, isLoading, isError } = useQuery<BusStopProps>({
    queryKey: ["routes-bus"],
    queryFn: async () => getBusStopById(point?.id),
  });

  const { data: favorites } = useQuery({
    queryKey: ["favorites", user?.user?.id, point],
    queryFn: () => getFavoritesModalService(user, getRefreshToken),
    initialData: [],
    placeholderData: [],
  });

  const handleFavorite = async (fav: boolean) => {
    try {
      if (!fav) {
        const { status } = await api.post(`/bus-stop/${point?.id}/favorite`);

        if (status === 200) {
          const { data } = await api.get<MyQueryInterface>("/user/my");
          await updateUser(data);

          setFavorite(true);
        }
      } else {
        const { status } = await api.delete(`/bus-stop/${point?.id}/favorite`);

        if (status) {
          const { data } = await api.get<MyQueryInterface>("/user/my");
          await updateUser(data);

          setFavorite(false);
        }
      }
    } catch (err) {
      const axiosError = axiosErrorHandler(err);
      console.error(axiosError);

      Toast.show({
        type: "error",
        text1: "Erro",
        text2: `Ocorreu um erro: ${axiosError.message}`,
      });
    }
  };

  useEffect(() => {
    const favoritePoint = favorites?.find(
      (favorite: FavoriteBusStopProps) => favorite?.bus_stop_id === point?.id
    );

    setFavorite(favoritePoint ? true : false);
  }, [user?.user?.id, point?.id, favorites]);

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
            handlePress={() => handleFavorite(favorite)}
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
              //!MUDAR  point?.images
              false
                ? { uri: point?.images[0] ?? point?.images[1] }
                : require("~/assets/img/not-found.png")
            }
            alt={point?.name}
            w={"full"}
            h={"150"}
            resizeMode={"contain"}
          />
        </Box>

        <VStack mt={6}>
          <Title size="md">Rotas</Title>
        </VStack>

        <VStack mt={1} space={1}>
          {user?.user?.driver ? (
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
                  <Alert status="error" />
                </Box>
              ) : data?.rotas?.length > 0 ? (
                data?.rotas?.map((route) => (
                  <ListRoutes
                    key={route.route_id}
                    route={route}
                    onPress={() => handleOpenRoute(route)}
                  />
                ))
              ) : (
                <Box>
                  <Alert
                    status="warning"
                    text="Ainda não há rotas cadastradas!"
                  />
                </Box>
              )}
            </>
          )}
        </VStack>
      </VStack>
    </Modal>
  );
};
