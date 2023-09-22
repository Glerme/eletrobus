import { useState } from "react";
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

import { useAuth } from "~/contexts/AuthContext";

import { Modal } from "~/components/Modal";
import { Button } from "~/components/Form/Button";
import { Title } from "~/components/Layouts/Title";
import { ListRoutes } from "~/components/ListRoutes";
import { FavoriteButton } from "~/components/Form/FavoriteButton";
import { BusStopInterface } from "~/interfaces/BusStop.interface";

interface ModalDescriptionProps {
  data: BusStopInterface | null;
  forwardedRef: React.RefObject<Modalize>;
  onClose: () => void;
}

export const ModalDescription = ({
  data,
  forwardedRef,
  onClose,
}: ModalDescriptionProps) => {
  const { user } = useAuth();
  const [favorite, setFavorite] = useState(data?.favorite ?? false);

  const handleFavoritePoint = () => {
    setFavorite(!favorite);
  };

  //COLOCAR DOIS BOTOES
  // UM PARA CONFIRMAR Q ESTA NO ONIBUS
  // OUTRO PARA COLOCAR AVISOS DE ATRASO ETC

  const handleOpenBus = (route: any) => {
    console.log("BUSCAR ROTA", route);
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
            {data?.name}
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
              data?.images
                ? { uri: data?.images[0] }
                : require("~/assets/img/not-found.png")
            }
            alt={data?.name}
            w={"full"}
            h={"150"}
            resizeMode={"contain"}
          />
        </Box>

        <VStack px={23} mt={6}>
          <Title size="md" textAlign={"left"}>
            Pontos
          </Title>
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
              <FlatList
                keyExtractor={(item) => `${item.id}`}
                data={[
                  {
                    id: 1,
                    name: "Rota 1",
                    description: "Rota 1",
                  },
                  {
                    id: 2,
                    name: "Rota 2",
                    description: "Rota 2",
                  },
                ]}
                maxH={"500"}
                ItemSeparatorComponent={() => <Divider />}
                ListEmptyComponent={() => (
                  <Box
                    flex={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Text fontSize={"md"} fontWeight={"semibold"}>
                      Nenhuma rota encontrada
                    </Text>
                  </Box>
                )}
                borderWidth={1}
                borderRadius={4}
                marginBottom={"full"}
                borderColor={"gray.400"}
                p={2}
                renderItem={({ item }: { item: any }) => (
                  <ListRoutes
                    route={item}
                    onPress={() => handleOpenBus(item)}
                  />
                )}
              />
            </>
          )}
        </VStack>
      </VStack>
    </Modal>
  );
};
