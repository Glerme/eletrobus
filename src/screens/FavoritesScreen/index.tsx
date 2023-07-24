import { Box, ScrollView, Text, VStack } from "native-base";

import { Title } from "~/components/Layouts/Title";
import { RouteCard } from "~/components/RouteCard";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

import { NavigationProps } from "~/routes";

import CorridasSalvasSvg from "~/assets/corridas-salvas.svg";
import { IRoute } from "~/interfaces/IRoute";
import { EStatusType } from "~/components/StatusInfo/EStatusType";

const mockedData: IRoute = {
  id: 1,
  name: "Unip/Unesp",
  favorite: true,
  saida: new Date(),
  chegada: new Date(),
  status: EStatusType.DISPONIVEL,
  tipo: "estudantes",
};

export const FavoritesScreen = ({
  navigation,
  route,
}: NavigationProps<"Favorites">) => {
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
                navigation.navigate("RouteDetails", { id: "123" })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate("RouteDetails", { id: "123" })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate("RouteDetails", { id: "123" })
              }
            />

            <RouteCard
              route={mockedData}
              onPressCard={() =>
                navigation.navigate("RouteDetails", { id: "123" })
              }
            />
          </VStack>
        </ScreenContent>
      </ScrollView>
    </Background>
  );
};
