import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { Box } from "native-base";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
} from "expo-location";

import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";

export const Map = () => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  };

  const getCurrentPosition = () => {
    mapRef.current?.animateCamera({
      center: location?.coords,
    });
  };

  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        setLocation(response);
        mapRef.current?.animateCamera({
          center: response.coords,
        });
      }
    );
  }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <Box flex={1}>
      <ListRoutesButton />
      <MyLocationButton getCurrentPosition={getCurrentPosition} />

      {location && (
        <MapView
          ref={mapRef}
          // provider={PROVIDER_GOOGLE}
          style={{
            ...StyleSheet.absoluteFillObject,
            width: "100%",
            height: "100%",
          }}
          region={{
            longitudeDelta: 0.005,
            latitudeDelta: 0.005,
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsScale
          showsBuildings
          scrollEnabled
          toolbarEnabled
          showsCompass={false}
        >
          <Marker
            coordinate={{
              latitude: location?.coords?.latitude ?? 0,
              longitude: location?.coords?.longitude ?? 0,
            }}
          />
        </MapView>
      )}
    </Box>
  );
};
