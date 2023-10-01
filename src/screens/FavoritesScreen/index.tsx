import { Box, FlatList, Text } from "native-base";

import { Title } from "~/components/Layouts/Title";
import { RouteCard } from "~/components/RouteCard";
import { Background } from "~/components/Layouts/Background";
import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { ScreenContent } from "~/components/Layouts/ScreenContent";

import CorridasSalvasSvg from "~/assets/corridas-salvas.svg";

import { NavigationProps } from "~/routes";

import { THEME } from "~/styles/theme";

const mockedData: any[] = [
  {
    id: 1,
    name: "Unip/Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    statusCorrida: EStatusType.EM_MOVIMENTO,
    tipo: "estudantes",
    trafegando: true,
  },
  {
    id: 2,
    name: "Shopping Center",
    favorite: false,
    saida: new Date("2023-07-25T14:00:00"),
    chegada: new Date("2023-07-25T15:30:00"),
    statusCorrida: EStatusType.EM_MOVIMENTO,
    tipo: "todos",
    trafegando: true,
  },
  {
    id: 3,
    name: "Parque Municipal",
    favorite: true,
    saida: new Date("2023-07-26T11:00:00"),
    chegada: new Date("2023-07-26T13:00:00"),
    statusCorrida: EStatusType.EM_MOVIMENTO,
    tipo: "todos",
    trafegando: true,
  },
];

export const FavoritesScreen = ({
  navigation,
  route,
}: NavigationProps<"Favorites">) => {
  return (
    <Background>
      <ScreenContent>
        <Text fontSize={"lg"} fontWeight={"600"}>
          Favoritos
        </Text>

        <FlatList
          mt={3}
          w={"full"}
          style={{ alignSelf: "flex-start" }}
          contentContainerStyle={{ alignSelf: "center", width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={mockedData}
          ListEmptyComponent={
            <Box flex={1} alignItems={"center"} display={"flex"} mt={4}>
              <CorridasSalvasSvg />
              <Box display={"flex"} alignItems={"center"} mt={2}>
                <Text textAlign={"center"} color={THEME.colors.gray["900"]}>
                  No momento sem corridas salvas
                </Text>
              </Box>
            </Box>
          }
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <RouteCard
              route={item}
              onPressCard={() =>
                navigation.navigate("PointDetails", { id: "123" })
              }
              w={"full"}
            />
          )}
        />
      </ScreenContent>
    </Background>
  );
};
