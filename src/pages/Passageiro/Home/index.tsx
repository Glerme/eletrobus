import { Box, Heading, ScrollView, Text } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { ScreenContent } from "~/components/ScreenContent";
import { Background } from "~/components/Background";

import { ContentForm } from "./styles";
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

export const Home: React.FC = () => {
  return (
    <>
      <Background>
        <ScreenContent>
          <Box>
            <Heading size="sm">Pederneiras - SP</Heading>
          </Box>

          <Box style={styles.container}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                longitudeDelta: 0.01,
                latitudeDelta: 0.0922,
                latitude: -22.355457,
                longitude: -48.776611,
              }}
              showsUserLocation
              showsMyLocationButton
              showsScale
              showsBuildings
              scrollEnabled
              toolbarEnabled
            />
          </Box>
        </ScreenContent>

        <ScrollView flex={1}>
          <ListRouteCards description="Favoritos" data={mockedData} />
          <ListRouteCards description="Ônibus em tráfego" data={mockedData} />
          <ListRouteCards
            description="Corridas cadastradas"
            data={mockedData}
          />
        </ScrollView>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
});
