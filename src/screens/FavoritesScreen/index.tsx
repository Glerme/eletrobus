import { Box, ScrollView, Text, VStack } from "native-base";

import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Title } from "~/components/Layouts/Title";
import { RouteCard } from "~/components/RouteCard";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

import ROUTES from "~/constants/routes";

import CorridasSalvasSvg from "~/assets/corridas-salvas.svg";
import { useAlternativeHeader } from "~/hooks/useAlternativeHeader";

const mockedData = {
  id: 1,
  name: "Unip/Unesp",
  favorite: true,
  saida: new Date(),
  chegada: new Date(),
  status: true,
};

export const FavoritesScreen = ({}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Background>
      <ScrollView>
        <ScreenContent>
          <Title>Corridas salvas</Title>

          <Box alignItems={"center"} display={"flex"} mt={4}>
            <CorridasSalvasSvg />
            <Box display={"flex"} alignItems={"center"} mt={2}>
              <Text textAlign={"center"} color={THEME.colors.gray["900"]}>
                Confira as corridas que foram favoritadas por você abaixo:
              </Text>
            </Box>
          </Box>

          <VStack mb={10} mt={2} space={2}>
            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate(ROUTES.ROUTE_DETAILS, {
                  id: mockedData?.id,
                })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate(ROUTES.ROUTE_DETAILS, {
                  id: mockedData?.id,
                })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate(ROUTES.ROUTE_DETAILS, {
                  id: mockedData?.id,
                })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate(ROUTES.ROUTE_DETAILS, {
                  id: mockedData?.id,
                })
              }
            />
          </VStack>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
