import { useNavigation } from "@react-navigation/native";
import { Flex, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
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
      <VStack mt="2" mb="3">
        <HStack
          px="4"
          py="2"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text
            fontFamily="heading"
            fontSize={"md"}
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
              <Text color="primary.400">saiba mais</Text>
              <CaretRight color={THEME.colors.primary[400]} size={16} />
            </Flex>
          </Pressable>
        </HStack>

        <ScrollView horizontal>
          {data?.map((item) => (
            <RouteCard
              key={item?.id}
              route={item}
              onPressCard={() =>
                navigation.navigate("RouteDetails", {
                  params: {
                    id: item?.id,
                  },
                })
              }
            />
          ))}
        </ScrollView>
      </VStack>
    </>
  );
};
