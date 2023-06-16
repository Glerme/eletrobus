import {
  Box,
  HStack,
  Heading,
  Pressable,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";

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
          <Text>saiba mais</Text>
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
                    bg={isPressed ? "coolGray.200" : "white"}
                    p="5"
                    rounded="8"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                  >
                    <HStack alignItems="center">
                      <Heading size="md" color="gray.800">
                        {item?.name}
                      </Heading>

                      <Spacer />

                      <Text fontSize={10} color="coolGray.800">
                        {item?.favorite ? "Favorito" : "Não favorito"}
                      </Text>
                    </HStack>

                    <VStack>
                      <Text fontSize="sm" color="coolGray.700">
                        Saída: {formatDate(item?.saida)}
                      </Text>

                      <Text fontSize="sm" color="coolGray.700">
                        Chegada: {formatDate(item?.chegada)}
                      </Text>
                    </VStack>

                    <HStack>
                      <Spacer />
                      <Text
                        mt="2"
                        fontSize={12}
                        fontWeight="medium"
                        color="darkBlue.600"
                      >
                        {item?.status ? "Ativo" : "Inativo"}
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
