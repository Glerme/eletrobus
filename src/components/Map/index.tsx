import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

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

import { IMap, IMarker } from "~/interfaces/IMap";

import { useModal } from "~/hooks/useModal";

import { CustomMarker } from "./components/CustomMarker";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { ModalDescription } from "./components/ModalDescription";

import { THEME } from "~/styles/theme";

export const Map = ({ markers }: IMap) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [dataPoint, setDataPoint] = useState<IMarker | null>(null);

  const openModal = (data: IMarker) => {
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
            <ListRoutesButton />
            <MyLocationButton getCurrentPosition={getCurrentPosition} />
            <MapView
              ref={mapRef}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: "110%",
                height: "110%",
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
