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
import { useAuth } from "~/contexts/AuthContext";

export const Map = ({ markers, pointId, routeId }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();
  const [zoom, setZoom] = useState<number>(17);
  const [dataPoint, setDataPoint] = useState<BusStopProps | null>(null);
  const [busStops, setBusStops] = useState<RoutesBusStopsInterface | null>(
    null
  );
  const [isRunning, setIsRunning] = useState(false);

  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);

  const {
    location,
    locationError,
    getActualCurrentPosition,
    requestLocationPermissions,
  } = useLocation();

  const { user } = useAuth();

  const openModal = (marker: BusStopProps) => {
    setDataPoint(marker);
    handleOpenModal();
  };

  const getCurrentPosition = async (zoom: number = 17) => {
    if (!location?.coords) {
      await getActualCurrentPosition();
    }
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

  const getRouteById = async (route_id: string) => {
    try {
      const { data } = await api.get<RoutesBusStopsInterface>(
        `/route/${route_id}`
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
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

    setInterval(async () => {
      if (isRunning && busStops) {
        await getActualCurrentPosition();
        setBusStops((busStops) => {
          if (!busStops) return null;
          const position = busStops.bus_stops.length - 1;
          const newBusStops = [...busStops.bus_stops];
          newBusStops[position] = {
            bus_stop_id: "0",
            latitude: location?.coords?.latitude ?? 0,
            longitude: location?.coords?.longitude ?? 0,
          };
          return { ...busStops, bus_stops: newBusStops };
        });
      }
    }, 5000);
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

  useEffect(() => {
    (async () => {
      if (!routeId) return;
      if (!busStops) {
        setIsRunning(false);
        setBusStops(await getRouteById(routeId));
      } else {
        setIsRunning(true);
      }
    })();
  }, [routeId, location?.coords]);

  return (
    <>
      <Box flex={1}>
        {locationError && !location?.coords ? (
          <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            p={2}
          >
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
          </Flex>
        ) : (
          location?.coords && (
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
                          optimizeWaypoints={true}
                          key={index}
                          mode="TRANSIT"
                        />
                      );
                    }
                  })}
              </MapView>
            </>
          )
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
