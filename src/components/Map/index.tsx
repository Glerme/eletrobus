import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { Box, Flex } from "native-base";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { MapInterface } from "~/interfaces/Map.interface";
import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { api } from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { useLocation } from "~/contexts/LocationContext";

import { Alert } from "../Alert";
import { ZoomButtons } from "./components/ZoomButtons";
import { CustomMarker } from "./components/CustomMarker";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { ModalDescription } from "./components/ModalDescription";
import { BusRouteSelected } from "./components/BusRouteSelected";

import { THEME } from "~/styles/theme";
import { useAuth } from "~/contexts/AuthContext";

export const Map = ({ markers, pointId, routeId }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();

  const [zoom, setZoom] = useState<number>(17);
  const [dataPoint, setDataPoint] = useState<BusStopProps | null>(null);
  const [busStops, setBusStops] = useState<RoutesBusStopsInterface | null>(
    null
  );

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

  const getCurrentPosition = (zoom: number = 17) => {
    mapRef.current?.animateCamera({
      center: location?.coords,
      zoom: zoom,
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

  const handleOpenBus = async (route_id: string, location?: any) => {
    const { data } = await api.get<RoutesBusStopsInterface>(
      `/route/${route_id}`
    );
    if (location) {
      const busStop = data;
      busStop.bus_stops?.push({
        bus_stop_id: "0",
        latitude: location.latitude,
        longitude: location.longitude,
      });
      setBusStops(busStop);
      return;
    }

    setBusStops(data);
  };

  useEffect(() => {
    (async () => await requestLocationPermissions())();
    (async () => await getActualCurrentPosition())();
  }, [locationError]);

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

  useEffect(() => {
    if (routeId && location) {
      getCurrentPosition(10);
      console.log("location ", location);
      handleOpenBus(routeId, location?.coords);
    }
  }, [routeId, location]);

  return (
    <>
      <Box flex={1}>
        {locationError ? (
          <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
          >
            <Alert
              status="warning"
              text="Atenção! Permita acesso a sua localização para que possamos te mostrar os pontos de ônibus mais próximos de você."
            />
          </Flex>
        ) : location ? (
          <>
            {busStops && <BusRouteSelected busRoute={busStops} />}
            <ZoomButtons onZoomPress={onZoomPress} />
            <ListRoutesButton onPressRoute={onPressRoute} />
            <MyLocationButton getCurrentPosition={getCurrentPosition} />
            <MapView
              ref={mapRef}
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
          handleOpenRoute={({ route_id }) => handleOpenBus(route_id)}
        />
      )}
    </>
  );
};
