import { Box, ScrollView, Text } from "native-base";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { Card } from "~/components/Card";
import { Background } from "~/components/Background";
import { ContentForm } from "./styles";

export const PHome: React.FC = () => {
  return (
    <>
      <Background>
        <Card>
          <Box>
            <Text>Pederneiras - SP</Text>
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
        </Card>
        <ScrollView flex={1} position={"relative"}>
          <ContentForm>
            <Box>
              <Box>
                <Text>Favoritos</Text>
                <Text>saiba mais</Text>
              </Box>
              <ScrollView horizontal showsVerticalScrollIndicator>
                <Box flexDirection={"row"}>
                  <Text>Favoritos</Text>
                  <Text>Favoritos</Text>
                  <Text>Favoritos</Text>
                  <Text>Favoritos</Text>
                  <Text>Favoritos</Text>
                  <Text>Favoritos</Text>
                </Box>
              </ScrollView>
            </Box>
          </ContentForm>

          <ContentForm>
            <Box>
              <Box>
                <Text>Ônibus em tráfego</Text>
                <Text>saiba mais</Text>
              </Box>
              <ScrollView horizontal showsVerticalScrollIndicator>
                <Box flexDirection={"row"}>
                  <Text>trafego</Text>
                  <Text>trafego</Text>
                  <Text>trafego</Text>
                  <Text>trafego</Text>
                  <Text>trafego</Text>
                  <Text>trafego</Text>
                </Box>
              </ScrollView>
            </Box>
          </ContentForm>

          <ContentForm>
            <Box>
              <Box>
                <Text>Corridas cadastradas</Text>
                <Text>saiba mais</Text>
              </Box>
              <ScrollView horizontal showsVerticalScrollIndicator>
                <Box flexDirection={"row"}>
                  <Text>cadastradas</Text>
                  <Text>cadastradas</Text>
                  <Text>cadastradas</Text>
                  <Text>cadastradas</Text>
                  <Text>cadastradas</Text>
                  <Text>cadastradas</Text>
                </Box>
              </ScrollView>
            </Box>
          </ContentForm>
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
