import { useEffect, useState } from "react";

import Toast from "react-native-toast-message";
import { Modalize } from "react-native-modalize";
import { useQuery } from "@tanstack/react-query";
import { Box, HStack, Image, Spacer, Text, VStack } from "native-base";

import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { MyQueryInterface } from "~/interfaces/User.interface";

import { useAuth } from "~/contexts/AuthContext";

import api from "~/services/axios";
import { getFavoritesModalService } from "~/services/MapServices/getFavoritesModalService";

import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

import { Modal } from "~/components/Modal";
import { Alert } from "~/components/Alert";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ListRoutes } from "~/components/ListRoutes";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { Bus, Info, Path } from "phosphor-react-native";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";
import { getColorFromState } from "~/utils/getColorFromState";

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
  // point: any;
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
  course: any;

  routeActive?: RoutesBusStopsInterface | null;
}

export const ModalDescriptionBus = ({
  forwardedRef,
  routeActive,
  onClose,
  course,
}: ModalDescriptionProps) => {
  const { user, updateUser, getRefreshToken } = useAuth();
  const [favorite, setFavorite] = useState(false);
  console.log("routeActive", {
    routeActive,
  });

  // const { data: favorites } = useQuery({
  //   queryKey: ["favorites", user?.user?.id, point],
  //   queryFn: () => getFavoritesModalService(user, getRefreshToken),
  //   initialData: [],
  //   placeholderData: [],
  // });

  // const handleFavorite = async (fav: boolean) => {
  //   try {
  //     if (!fav) {
  //       const { status } = await api.post(`/bus-stop/${point?.id}/favorite`);

  //       if (status === 200) {
  //         const { data } = await api.get<MyQueryInterface>("/user/my");
  //         await updateUser(data);

  //         setFavorite(true);
  //       }
  //     } else {
  //       const { status } = await api.delete(`/bus-stop/${point?.id}/favorite`);

  //       if (status) {
  //         const { data } = await api.get<MyQueryInterface>("/user/my");
  //         await updateUser(data);

  //         setFavorite(false);
  //       }
  //     }
  //   } catch (err) {
  //     const axiosError = axiosErrorHandler(err);
  //     console.error(axiosError);

  //     Toast.show({
  //       type: "error",
  //       text1: "Erro",
  //       text2: `Ocorreu um erro: ${axiosError.message}`,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const favoritePoint = favorites?.find(
  //     (favorite: FavoriteBusStopProps) => favorite?.bus_stop_id === point?.id
  //   );

  //   setFavorite(favoritePoint ? true : false);
  // }, [user?.user?.id, point?.id, favorites]);

  return (
    <Modal
      forwardedRef={forwardedRef}
      modalHeight={400}
      adjustToContentHeight={false}
      onClose={onClose}
    >
      <VStack px={23} mt={6} space={2}>
        <HStack space={2} alignItems="center">
          <Path color="#46B99E" weight="duotone" />
          <Text fontSize="md" fontWeight={"600"}>
            {routeActive?.name}
          </Text>
        </HStack>
        <HStack space={2} alignItems="center">
          <Bus color={getColorFromState(course?.status)} weight="duotone" />
          <Text fontSize="lg" fontWeight={"600"}>
            Veículo: {course?.vehicle?.plate ?? "-"}
          </Text>
        </HStack>

        <VStack
          borderBottomColor={"primary.500"}
          borderBottomWidth={"1px"}
          p={2}
        >
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.800"}>
            Placa:{" "}
            <Text color={"secondary.500"}>{course?.vehicle?.plate ?? "-"}</Text>
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"} color={"gray.800"}>
            Status:{" "}
            <Text color={getColorFromState(course?.status)}>
              {course?.status ?? "Sem Status"}
            </Text>
          </Text>
        </VStack>
      </VStack>
    </Modal>
  );
};
