import { Box, Heading, ScrollView } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { ScreenContent } from "~/components/ScreenContent";
import { Background } from "~/components/Background";

import { ListRouteCards } from "~/components/ListRouteCards";

const mockedData = [
  {
    id: 1,
    name: "Unip/Unesp",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 2,
    name: "UFSC",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 3,
    name: "USP",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: false,
  },
  {
    id: 4,
    name: "UFRJ",
    favorite: false,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
  {
    id: 5,
    name: "PUC-RS",
    favorite: true,
    saida: new Date(),
    chegada: new Date(),
    status: true,
  },
];

export const HomeScreen = () => {
  return (
    <Background>
      <ScreenContent>
        <Box>
          <Heading size="sm">Pederneiras - SP</Heading>
        </Box>
      </ScreenContent>

      <ScrollView flex={1}>
        <ListRouteCards description="Favoritos" data={mockedData} />
        <ListRouteCards description="Ônibus em tráfego" data={mockedData} />
        <ListRouteCards description="Corridas cadastradas" data={mockedData} />
      </ScrollView>
    </Background>
  );
};
