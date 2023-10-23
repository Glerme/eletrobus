import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Linking } from "react-native";

import { Box, Flex } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { requestForegroundPermissionsAsync } from "expo-location";

import { MapInterface } from "~/interfaces/Map.interface";
import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { api } from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { useLocation } from "~/contexts/LocationContext";

import { Alert } from "../Alert";
import { Button } from "../Form/Button";
import { ZoomButtons } from "./components/ZoomButtons";
import { CustomMarker } from "./components/CustomMarker";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { ModalDescription } from "./components/ModalDescription";
import { BusRouteSelected } from "./components/BusRouteSelected";

import { THEME } from "~/styles/theme";

export const Map = ({ markers, pointId }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();
  const [zoom, setZoom] = useState<number>(17);
  const [dataPoint, setDataPoint] = useState<BusStopProps | null>(null);
  const [busStops, setBusStops] = useState<RoutesBusStopsInterface | null>(
    null
  );
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  const {
    location,
    locationError,
    getActualCurrentPosition,
    requestLocationPermissions,
  } = useLocation();

  const openModal = (marker: BusStopProps) => {
    setDataPoint(marker);
    handleOpenModal();
  };

  const getCurrentPosition = () => {
    mapRef.current?.animateCamera({
      center: location?.coords,
      zoom: 17,
    });
  };

  const onPressRoute = async (route: BusStopProps) => {
    mapRef?.current?.animateCamera({
      center: { latitude: route.latitude, longitude: route.longitude },
      zoom: 20,
    });
  };

  const onZoomPress = (type: "in" | "out") => {
    let currentZoom = type === "in" ? zoom + 1 : zoom - 1;

    if (zoom < 0 && currentZoom < 0) currentZoom = 0;

    setZoom(currentZoom);

    mapRef?.current?.animateCamera({
      zoom: currentZoom,
    });
  };

  const handleOpenBus = async (route: RoutesProps) => {
    const { data } = await api.get<RoutesBusStopsInterface>(
      `/route/${route.route_id}`
    );

    setBusStops(data);
  };

  useEffect(() => {
    (async () => await requestLocationPermissions())();
    (async () => await getActualCurrentPosition())();
  }, []);

  useEffect(() => {
    if (pointId) {
      const point = markers?.find((marker) => marker.id === pointId) ?? false;
      if (point) {
        mapRef?.current?.animateCamera({
          center: { latitude: point?.latitude, longitude: point.longitude },
          zoom: 20,
        });
      }
    }
  }, [pointId]);

  return (
    <>
      <Box flex={1}>
        {locationError ? (
          <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            p={2}
          >
            {locationPermissionGranted ? (
              <Alert
                status="info"
                text="Reinicie o App para que possamos buscar sua localização."
              />
            ) : (
              <>
                <Alert
                  status="warning"
                  text="Atenção! Permita acesso a sua localização para que possamos te mostrar os pontos de ônibus mais próximos de você."
                />
                <Button
                  mt={2}
                  title="Permitir acesso à localização"
                  fontColor="white"
                  onPress={async () => {
                    await Linking.openSettings();
                  }}
                />
              </>
            )}
          </Flex>
        ) : location ? (
          <>
            {busStops && <BusRouteSelected busRoute={busStops} />}
            <ZoomButtons onZoomPress={onZoomPress} />
            <ListRoutesButton onPressRoute={onPressRoute} />
            <MyLocationButton getCurrentPosition={getCurrentPosition} />
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={{
                ...StyleSheet.absoluteFillObject,
                width: "120%",
                height: "120%",
              }}
              region={{
                longitudeDelta: 0.005,
                latitudeDelta: 0.005,
                latitude: location?.coords?.latitude,
                longitude: location?.coords?.longitude,
              }}
              showsUserLocation={true}
              showsMyLocationButton={false}
              scrollEnabled
              zoomEnabled
              zoomControlEnabled={false}
            >
              {markers?.map((marker, i) => (
                <CustomMarker
                  key={i}
                  marker={marker}
                  handleOpenModal={openModal}
                />
              ))}

              {busStops &&
                busStops?.bus_stops?.map((stop, index) => {
                  if (index < busStops?.bus_stops?.length - 1) {
                    const origin = stop;
                    const destination = busStops?.bus_stops[index + 1];

                    return (
                      <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                        strokeWidth={5}
                        strokeColor="blue"
                        key={index}
                        mode="TRANSIT"
                      />
                    );
                  }
                })}
            </MapView>
          </>
        ) : (
          <Box
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"gray.400"}
          >
            <ActivityIndicator
              size={"large"}
              color={THEME.colors.primary["900"]}
            />
          </Box>
        )}
      </Box>

      {dataPoint && (
        <ModalDescription
          point={dataPoint}
          forwardedRef={modalRef}
          onClose={() => setDataPoint(null)}
          handleOpenRoute={handleOpenBus}
        />
      )}
    </>
  );
};
