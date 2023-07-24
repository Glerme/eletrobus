import { Box, ScrollView, Text, HStack, VStack } from "native-base";

import { Title } from "~/components/Layouts/Title";
import { RouteCard } from "~/components/RouteCard";
import { Background } from "~/components/Layouts/Background";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import { THEME } from "~/styles/theme";

import { NavigationProps } from "~/routes";

import CorridasSalvasSvg from "~/assets/corridas-salvas.svg";
import { IRoute } from "~/interfaces/IRoute";
import { EStatusType } from "~/components/StatusInfo/EStatusType";
import { Bus } from "phosphor-react-native";

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
      <ScreenContent flex={1}>
        <HStack alignItems="center" space={1}>
          <Text fontSize={"lg"} fontWeight={"600"}>
            Corridas Salvas
          </Text>
        </HStack>
        {/* <Box alignItems={"center"} display={"flex"} mt={4}>
            <CorridasSalvasSvg />
            <Box display={"flex"} alignItems={"center"} mt={2}>
              <Text textAlign={"center"} color={THEME.colors.gray["900"]}>
                Confira as corridas que foram favoritadas por você abaixo:
              </Text>
            </Box>
          </Box> */}

        <ScrollView>
          <VStack mb={10} mt={2} space={2}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <RouteCard
                key={item}
                route={mockedData}
                onPressCard={() =>
                  navigation.navigate("RouteDetails", { id: "123" })
                }
              />
            ))}
          </VStack>
        </ScrollView>
      </ScreenContent>
    </Background>
  );
};
