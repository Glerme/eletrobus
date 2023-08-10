import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import { Box } from "native-base";
import MapView, { Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
  LocationPermissionResponse,
} from "expo-location";

import { IMap } from "~/interfaces/IMap";

import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";

import { THEME } from "~/styles/theme";
import { CustomMarker } from "./components/CustomMarker";

export const Map = ({ markers }: IMap) => {
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocationPermissions = async () => {
    const { granted }: LocationPermissionResponse =
      await requestForegroundPermissionsAsync();

    if (granted) {
      try {
        const currentPosition = await getCurrentPositionAsync();
        setLocation(currentPosition);
      } catch (error) {
        setLocationError("Falha ao buscar a localização.");
      }
    } else {
      setLocationError("Permita o acesso à localização para continuar.");
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
      {locationError ? (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <Text>{locationError}</Text>
        </Box>
      ) : location ? (
        <>
          <ListRoutesButton />
          <MyLocationButton getCurrentPosition={getCurrentPosition} />
          <MapView
            ref={mapRef}
            style={{
              ...StyleSheet.absoluteFillObject,
              width: "100%",
              height: "100%",
            }}
            region={{
              longitudeDelta: 0.005,
              latitudeDelta: 0.005,
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsScale
            showsBuildings
            scrollEnabled
            toolbarEnabled
            showsCompass={false}
            zoomEnabled
          >
            {markers.map((marker) => (
              <CustomMarker key={marker.id} marker={marker} />
            ))}
          </MapView>
        </>
      ) : (
        <Box flex={1} justifyContent={"center"} alignItems={"center"}>
          <ActivityIndicator
            size={"large"}
            color={THEME.colors.primary["900"]}
          />
        </Box>
      )}
    </Box>
  );
};
