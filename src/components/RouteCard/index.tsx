import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";

import { useState } from "react";

import { RouteInterface } from "~/interfaces/Route.interface";

import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";

import { StatusInfo } from "../BusStatus/StatusInfo";
import { StatusTime } from "../BusStatus/StatusTime";
import { FavoriteButton } from "../Form/FavoriteButton";

import { formatHoursDataMin } from "~/utils/format";

interface RouteCardProps extends InterfacePressableProps {
  onPressCard: () => void;
  route: RouteInterface;
}

export const RouteCard = ({ onPressCard, route, ...rest }: RouteCardProps) => {
  const [favorite, setFavorite] = useState(route?.favorite);

  return (
    <Pressable marginY={1} onPress={onPressCard} {...rest}>
      {({ isPressed }: any) => {
        return (
          <Box
            minW="72"
            bg={"white"}
            p="3"
            shadow={"0"}
            rounded="8"
            style={{
              transform: [
                {
                  scale: isPressed ? 0.96 : 1,
                },
              ],
            }}
          >
            <HStack alignItems="center" mb="1">
              <HStack alignItems="center" space={1}>
                <HStack space={2} alignItems="center">
                  <Text fontSize="sm" fontWeight={"500"} color="gray.900">
                    {route?.name}
                  </Text>
                </HStack>
              </HStack>

              <Spacer />
              <FavoriteButton
                favorite={route?.favorite}
                handlePress={() => {}}
                disabled
                size={18}
              />
            </HStack>

            <VStack space="1">
              <Text fontSize="sm" color="coolGray.700">
                Saída: {formatHoursDataMin(route?.saida)}
              </Text>
              <StatusTime busRoute={route}></StatusTime>
              <HStack alignItems="center" mt="1" space="1">
                <Spacer />
                <StatusInfo statusCorrida={route?.status} />
              </HStack>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
