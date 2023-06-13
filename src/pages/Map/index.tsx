import { useRef } from "react";
import { StyleSheet } from "react-native";

import { Box } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import { MaterialIcons } from "@expo/vector-icons";

export const Map = () => {
  const mapRef = useRef<any>(null);

  return (
    <Box style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={{
          ...StyleSheet.absoluteFillObject,
          width: "100%",
          height: "100%",
        }}
        region={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.0922,
          latitude: -22.355457,
          longitude: -48.776611,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsScale
        showsBuildings
        scrollEnabled
        toolbarEnabled
      />

      <MaterialIcons
        name="my-location"
        onPress={() => {
          mapRef.current.animateToRegion({
            latitude: -22.366881,
            longitude: -48.77125,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
