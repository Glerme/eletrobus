import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";

import { Star, Student, UsersThree } from "phosphor-react-native";
import { useState } from "react";
import { THEME } from "~/styles/theme";

import { formatDate } from "~/utils/format";
import { StatusInfo } from "../StatusInfo";
import { IRoute } from "../../interfaces/IRoute";
import { RouteStudents } from "./RouteStudents";

interface RouteCardProps {
  onPressCard: () => void;
  route: IRoute;
}

export const RouteCard = ({ onPressCard, route }: RouteCardProps) => {
  const [favorite, setFavorite] = useState(route?.favorite);

  return (
    <Pressable marginY={1} onPress={onPressCard}>
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
            <HStack alignItems="center" mb="3">
              <Text fontSize="md" fontWeight={"500"} color="gray.900">
                {route?.name}
              </Text>

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
                Saída: {formatDate(route?.saida)}
              </Text>

              <Text fontSize="sm" color="coolGray.700">
                Chegada: {formatDate(route?.chegada)}
              </Text>
              <HStack alignItems="center" mt="2" space="1">
                <RouteStudents tipo={route?.tipo} />
                <Spacer />
                <StatusInfo status={route.status} />
              </HStack>
            </VStack>
          </Box>
        );
      }}
    </Pressable>
  );
};
