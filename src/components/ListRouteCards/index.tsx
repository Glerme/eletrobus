import { useNavigation } from "@react-navigation/native";
import {
  Box,
  FlatList,
  Flex,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { CaretRight } from "phosphor-react-native";

import { RouteCard } from "../RouteCard";

import { THEME } from "~/styles/theme";

interface ListRouteCardsProps {
  description: string;
  data: any[];
}

export const ListRouteCards = ({ data, description }: ListRouteCardsProps) => {
  const navigation = useNavigation<any>();

  return (
    <>
      <VStack mt="2" mb="2">
        <HStack py="2" justifyContent="space-between" alignItems="center">
          <Text
            fontSize={"md"}
            fontWeight={"600"}
            color="gray.900"
            lineHeight={"md"}
          >
            {description}
          </Text>
          <Pressable
            alignItems="center"
            onPress={() => navigation.navigate("Favorites")}
            display={"flex"}
            justifyContent={"center"}
            alignContent={"center"}
          >
            <Flex direction="row" alignItems={"center"}>
              <Text fontWeight={500} color="primary.400">
                exibir mais
              </Text>
              <CaretRight color={THEME.colors.primary[400]} size={16} />
            </Flex>
          </Pressable>
        </HStack>

        <FlatList
          data={data}
          keyExtractor={(item) => `${item.id}`}
          horizontal
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
          ItemSeparatorComponent={() => <Box w={2} />}
          renderItem={({ item }) => (
            <RouteCard
              key={item.id}
              route={item}
              onPressCard={() =>
                navigation.navigate("PointDetails", {
                  params: {
                    id: item?.id,
                  },
                })
              }
            />
          )}
        />
      </VStack>
    </>
  );
};
