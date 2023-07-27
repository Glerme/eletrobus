import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";

import { useState } from "react";

import { Info, Star } from "phosphor-react-native";

import { InterfacePressableProps } from "native-base/lib/typescript/components/primitives/Pressable/types";

import { formatDate, formatHours } from "~/utils/format";
import { StatusInfo } from "../StatusInfo";
import { IRoute } from "../../interfaces/IRoute";
import { RouteStudents } from "./RouteStudents";

interface RouteCardProps extends InterfacePressableProps {
  onPressCard: () => void;
  route: IRoute;
}

export const RouteCard = ({ onPressCard, route, ...rest }: RouteCardProps) => {
  const [favorite, setFavorite] = useState(route?.favorite);

  return (
    <Pressable marginY={1} onPress={onPressCard} {...rest}>
      {({ isPressed }) => {
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
                  <View
                    width={11}
                    height={11}
                    borderRadius={50}
                    // backgroundColor={color}
                    backgroundColor={route?.trafegando ? "#A7E179" : "#E17979"}
                  />
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
                {({ isPressed }) => {
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

            <VStack space="0">
              <Text fontSize="sm" color="coolGray.700">
                Saída: {formatHours(route?.saida)}
              </Text>

              <Text fontSize="sm" color="coolGray.700">
                Chegada: {formatHours(route?.chegada)}
              </Text>
              <HStack alignItems="center" mt="2" space="1">
                <RouteStudents tipo={route?.tipo} />
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
