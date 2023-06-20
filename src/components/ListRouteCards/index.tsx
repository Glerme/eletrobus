import {
  Box,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
  View,
} from "native-base";
import { CaretRight, Star } from "phosphor-react-native";
import { THEME } from "~/styles/theme";

import { formatDate } from "~/utils/format";

interface ListRouteCardsProps {
  description: string;
  data: any[];
}

export const ListRouteCards = ({ data, description }: ListRouteCardsProps) => {
  return (
    <>
      <VStack mt="2" mb="3">
        <HStack
          px="4"
          py="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading size="md">{description}</Heading>
          <HStack alignItems="center">
            <Text color="primary.400">saiba mais</Text>
            <CaretRight color={THEME.colors.primary[400]} size={16} />
          </HStack>
        </HStack>

        <ScrollView horizontal>
          {data?.map((item) => (
            <Pressable
              px="4"
              key={item?.id}
              onPress={() => console.log("aqui")}
            >
              {({ isPressed }) => {
                return (
                  <Box
                    minW="72"
                    bg={isPressed ? "coolGray.100" : "white"}
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
                        {item?.name}
                      </Text>

                      <Spacer />

                      <Star
                        size={14}
                        weight="fill"
                        color={item.favorite ? "#E9C25F" : "#9C9C9C"}
                      />
                    </HStack>

                    <VStack space="0">
                      <Text fontSize="sm" color="coolGray.700">
                        Saída: {formatDate(item?.saida)}
                      </Text>

                      <Text fontSize="sm" color="coolGray.700">
                        Chegada: {formatDate(item?.chegada)}
                      </Text>
                    </VStack>

                    <HStack alignItems="center" mt="2" space="1">
                      <Spacer />
                      <View
                        width={11}
                        height={11}
                        borderRadius={50}
                        backgroundColor={item?.status ? "#A7E179" : "#E17979"}
                      ></View>
                      <Text
                        fontSize={11}
                        fontWeight="medium"
                        color="coolGray.500"
                      >
                        {item?.status ? "Disponível" : "Indisponivel"}
                      </Text>
                    </HStack>
                  </Box>
                );
              }}
            </Pressable>
          ))}
        </ScrollView>
      </VStack>
    </>
  );
};
