import { useState } from "react";
import { Box, HStack, Image, Spacer, Text, VStack } from "native-base";

import { Modalize } from "react-native-modalize";

import { RouteInterface } from "~/interfaces/Route.interface";

import { Modal } from "~/components/Modal";
import { Title } from "~/components/Layouts/Title";
import { TypeRoute } from "~/components/TypeRoute";
import { StatusInfo } from "~/components/BusStatus/StatusInfo";
import { FavoriteButton } from "~/components/Form/FavoriteButton";

interface ModalDescriptionProps {
  data: RouteInterface | null;
  forwardedRef: React.RefObject<Modalize>;
}

export const ModalDescription = ({
  data,
  forwardedRef,
}: ModalDescriptionProps) => {
  if (!data) return null;

  const [favorite, setFavorite] = useState(data?.favorite ?? false);

  const handleFavoritePoint = () => {
    setFavorite(!favorite);
  };

  return (
    <Modal
      forwardedRef={forwardedRef}
      modalHeight={500}
      adjustToContentHeight={false}
    >
      <VStack px={23} mt={6} mb={10} space={2}>
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
              data?.image
                ? { uri: data?.image }
                : require("~/assets/img/not-found.png")
            }
            alt={data?.name}
            w={"full"}
            h={"150"}
            resizeMode={"contain"}
          />
        </Box>

        <HStack alignItems="center" space={1}>
          <TypeRoute tipo={data?.tipo} />
          <Spacer />
          <StatusInfo statusCorrida={data?.status} />
        </HStack>

        <VStack mt={1} space={1}>
          <Box>
            <Text bold fontSize={"md"}>
              Descrição:
            </Text>

            <Text fontSize={"md"}>{data?.description}</Text>
          </Box>
        </VStack>
      </VStack>
    </Modal>
  );
};
