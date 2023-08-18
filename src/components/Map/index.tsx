import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text } from "react-native";

import { Box } from "native-base";
import MapView from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
  LocationObject,
  LocationPermissionResponse,
} from "expo-location";

import { MapInterface } from "~/interfaces/Map.interface";
import { RouteInterface } from "~/interfaces/Route.interface";

import { useModal } from "~/hooks/useModal";

import { CustomMarker } from "./components/CustomMarker";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { ModalDescription } from "./components/ModalDescription";

import { THEME } from "~/styles/theme";

export const Map = ({ markers }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();
  const [zoomLevel, setZoomLevel] = useState(10);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dataPoint, setDataPoint] = useState<RouteInterface | null>(null);

  const openModal = (data: RouteInterface) => {
    setDataPoint(data);
    handleOpenModal();
  };

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
      zoom: 17,
      altitude: 1000,
    });
  };

  const onPressRoute = (route: RouteInterface) => {
    console.log(route);
    setDataPoint(route);
  };

  // useEffect(() => {
  //   watchPositionAsync(
  //     {
  //       accuracy: LocationAccuracy.Highest,
  //       timeInterval: 5000,
  //       distanceInterval: 1,
  //     },
  //     (response) => {
  //       setLocation(response);
  //       mapRef.current?.animateCamera({
  //         center: response.coords,
  //       });
  //     }
  //   );
  // }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <>
      <Box flex={1}>
        {locationError ? (
          <Box flex={1} justifyContent={"center"} alignItems={"center"}>
            <Text>{locationError}</Text>
          </Box>
        ) : location ? (
          <>
            <ListRoutesButton onPressRoute={onPressRoute} />
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
              scrollEnabled
              zoomEnabled
              zoomControlEnabled={false}
              loadingEnabled
            >
              {markers.map((marker) => (
                <CustomMarker
                  key={marker.id}
                  marker={marker}
                  handleOpenModal={openModal}
                />
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

      <ModalDescription data={dataPoint} forwardedRef={modalRef} />
    </>
  );
};
