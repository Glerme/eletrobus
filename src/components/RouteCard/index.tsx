import {
  Box,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";

import { Star } from "phosphor-react-native";

import { formatDate } from "~/utils/format";

interface RouteCardProps {
  onPressCard: () => void;
  route: any;
}

export const RouteCard = ({ onPressCard, route }: RouteCardProps) => {
  return (
    <Pressable px="4" marginY={1} onPress={onPressCard}>
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
              <Text fontFamily="medium" fontSize="md" color="gray.900">
                {route?.name}
              </Text>

              <Spacer />

              <Pressable
                zIndex={1}
                onPress={() => {
                  // logica para add aos fav
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
                        color={route.favorite ? "#E9C25F" : "#9C9C9C"}
                      />
                    </Box>
                  );
                }}
              </Pressable>
            </HStack>

            <VStack space="0">
              <Text fontSize="sm" color="coolGray.700">
                Saída: {formatDate(route?.saida)}
              </Text>

              <Text fontSize="sm" color="coolGray.700">
                Chegada: {formatDate(route?.chegada)}
              </Text>
            </VStack>

            <HStack alignItems="center" mt="2" space="1">
              <Spacer />
              <View
                width={11}
                height={11}
                borderRadius={50}
                backgroundColor={route?.status ? "#A7E179" : "#E17979"}
              />
              <Text fontSize={11} fontWeight="medium" color="coolGray.500">
                {route?.status ? "Disponível" : "Indisponivel"}
              </Text>
            </HStack>
          </Box>
        );
      }}
    </Pressable>
  );
};