import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <>
      <View style={styles.container}>
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
          showsCompass
          showsScale
          showsTraffic
          showsIndoors
          showsBuildings
          zoomControlEnabled
          rotateEnabled
          scrollEnabled
          toolbarEnabled
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
