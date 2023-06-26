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
    <Pressable px="4" onPress={onPressCard}>
      {({ isPressed }) => {
        return (
          <Box
            minW="72"
            bg={"coolGray.100"}
            p="3"
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

              <Star
                size={14}
                weight="fill"
                color={route.favorite ? "#E9C25F" : "#9C9C9C"}
              />
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
