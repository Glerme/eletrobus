import { Box, HStack, Pressable, Spacer, Text, VStack } from "native-base";

import { useState } from "react";

import { Star } from "phosphor-react-native";

import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";

import { StatusRun } from "../BusStatus/StatusRun";
import { StatusInfo } from "../BusStatus/StatusInfo";
import { StatusTime } from "../BusStatus/StatusTime";
import { IBusRoute } from "../../interfaces/IBusRoute";

import { formatHours } from "~/utils/format";

interface RouteCardProps extends InterfacePressableProps {
  onPressCard: () => void;
  route: IBusRoute;
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
            <HStack alignItems="center" mb="2">
              <HStack alignItems="center" space={1}>
                <HStack space={2} alignItems="center">
                  <Text fontSize="md" fontWeight={"500"} color="gray.900">
                    {route?.name}
                  </Text>
                </HStack>
              </HStack>

              <Spacer />
              {/* componentizar */}
              <Pressable
                zIndex={1}
                onPress={() => {
                  setFavorite(!favorite);
                }}
              >
                {({ isPressed }: any) => {
                  return (
                    <Box
                      p={2}
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.8 : 1,
                          },
                        ],
                      }}
                    >
                      <Star
                        size={18}
                        weight="fill"
                        color={favorite ? "#E9C25F" : "#9C9C9C"}
                      />
                    </Box>
                  );
                }}
              </Pressable>
              {/* componentizar */}
            </HStack>

            <VStack space="1">
              <Text fontSize="md" color="coolGray.700">
                Saída: {formatHours(route?.saida)}
              </Text>
              <StatusTime busRoute={route}></StatusTime>
              {/* <Text fontSize="md" color="coolGray.700"></Text> */}
              <HStack alignItems="center" mt="2" space="1">
                <StatusRun busRoute={route} />
                <Spacer />
                <StatusInfo statusCorrida={route?.statusCorrida} />
              </HStack>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
