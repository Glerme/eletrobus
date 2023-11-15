import { useEffect, useState } from "react";

import Toast from "react-native-toast-message";
import { Modalize } from "react-native-modalize";
import { useQuery } from "@tanstack/react-query";
import { Box, HStack, Image, Spacer, VStack } from "native-base";

import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { MyQueryInterface } from "~/interfaces/User.interface";

import { useAuth } from "~/contexts/AuthContext";

import api from "~/services/axios";
import { getFavoritesModalService } from "~/services/MapServices/getFavoritesModalService";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { Modal } from "~/components/Modal";
import { Alert } from "~/components/Alert";
import { Title } from "~/components/Layouts/Title";
import { ListRoutes } from "~/components/ListRoutes";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

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

  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState<boolean>(false);

  const { data: favorites } = useQuery({
    queryKey: ["favorites", user?.user?.id, point],
    queryFn: () => getFavoritesModalService(user, getRefreshToken),
    initialData: [],
    placeholderData: [],
  });

  const handleFavorite = async (fav: boolean) => {
    try {
      setFavoriteLoading(true);
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
    } finally {
      setFavoriteLoading(false);
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

          {user?.user && !user?.user?.driver && (
            <FavoriteButton
              favorite={favorite}
              handlePress={() => handleFavorite(favorite)}
              isLoading={favoriteLoading}
            />
          )}
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
          {point?.routes?.length > 0 ? (
            point?.routes?.map((route, i) => (
              <ListRoutes
                key={i}
                route={route}
                onPress={() => handleOpenRoute(route)}
                disabled={!!user?.user?.driver}
              />
            ))
          ) : (
            <Box>
              <Alert status="warning" text="Ainda não há rotas cadastradas!" />
            </Box>
          )}
        </VStack>
      </VStack>
    </Modal>
  );
};
