import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Linking } from "react-native";

import { Box, Flex } from "native-base";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { requestForegroundPermissionsAsync } from "expo-location";

import { MapInterface } from "~/interfaces/Map.interface";
import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import api from "~/services/axios";

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
<<<<<<< HEAD
import { useAuth } from "~/contexts/AuthContext";
import { RouteButton } from "./components/RouteButton";
import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { StartRunButton } from "./components/StartRunButton";
import { StateButton } from "./components/StateButton";
import { FinalizeButton } from "./components/FinalizeButton";

interface Params {
  routeId?: string;
  pointId?: string;
}
=======
>>>>>>> 345e95d839032e43c21065b4d8a9d1aa41d6c08e

export const Map = ({ markers, pointId }: MapInterface) => {
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
  const navigation = useNavigation();
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

<<<<<<< HEAD
  const getCurrentPosition = async (zoom: number = 17) => {
    if (!location) return;
    mapRef.current?.animateCamera({
      center: {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      },
      zoom: zoom,
=======
  const getCurrentPosition = () => {
    mapRef.current?.animateCamera({
      center: location?.coords,
      zoom: 17,
>>>>>>> 345e95d839032e43c21065b4d8a9d1aa41d6c08e
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

<<<<<<< HEAD
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
=======
  const handleOpenBus = async (route: RoutesProps) => {
>>>>>>> 345e95d839032e43c21065b4d8a9d1aa41d6c08e
    const { data } = await api.get<RoutesBusStopsInterface>(
      `/route/${route.route_id}`
    );

    setBusStops(data);
  };

  useEffect(() => {
    (async () => await requestLocationPermissions())();

    // setInterval(async () => {
    //   if (isRunning && busStops) {
    //     await getActualCurrentPosition();
    //     setBusStops((busStops) => {
    //       if (!busStops) return null;
    //       const position = busStops.bus_stops.length - 1;
    //       const newBusStops = [...busStops.bus_stops];
    //       newBusStops[position] = {
    //         bus_stop_id: "0",
    //         latitude: location?.coords?.latitude ?? 0,
    //         longitude: location?.coords?.longitude ?? 0,
    //       };
    //       return { ...busStops, bus_stops: newBusStops };
    //     });
    //   }
    // }, 5000);
  }, []);

  const cleanParams = () => {
    navigation.dispatch((state) => {
      const map = state.routes.find((route) => route.name === "Map");

      const newRoutes = state.routes.map((route) => {
        if (route.name === "Map") {
          return {
            ...route,
            params: {
              routeId: undefined,
              pointId: undefined,
            },
          };
        }
        return route;
      });

      // Remova o parâmetro 'paramToRemove' da rota atual

      return CommonActions.reset({
        ...state,
        routes: newRoutes,
      });
    });
  };

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
      setBusStops(await getRouteById(routeId));
      console.log("sim");
    })();
  }, [routeId]);

  return (
    <>
      <Box flex={1}>
        {(locationError && !location?.coords) || false ? (
          <Flex
            flex={1}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
            p={2}
          >
<<<<<<< HEAD
            <Alert
              status="warning"
              text="Atenção! Permita acesso a sua localização para que possamos te mostrar os pontos de ônibus mais próximos de você."
=======
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
                    await Linking.openSettings()
                      .then(() => {
                        checkLocationPermission();
                      })
                      .catch((err) => {
                        console.error(err);
                      });
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
              provider={PROVIDER_GOOGLE}
            >
              {markers?.map((marker, i) => (
                <CustomMarker
                  key={i}
                  marker={marker}
                  handleOpenModal={openModal}
                />
              ))}

              {/* {busStops &&
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
                })} */}
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
>>>>>>> 345e95d839032e43c21065b4d8a9d1aa41d6c08e
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
              <RouteButton
                cleanParams={cleanParams}
                busRoute={busStops}
                setBusRoute={setBusStops}
                user={user}
              />
              {user?.user.driver && busStops ? (
                <>
                  <StartRunButton
                    setIsRunning={setIsRunning}
                    isRunning={isRunning}
                    busRoute={busStops}
                  />
                  {isRunning && (
                    <>
                      <StateButton />
                      <FinalizeButton
                        cleanParams={cleanParams}
                        setBusRoute={setBusStops}
                        setIsRunning={setIsRunning}
                      />
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

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
                    key={marker.id}
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
                        <></>
                        // <MapViewDirections
                        //   origin={origin}
                        //   destination={destination}
                        //   apikey={process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}
                        //   strokeWidth={5}
                        //   strokeColor="blue"
                        //   optimizeWaypoints={true}
                        //   key={index}
                        //   mode="TRANSIT"
                        // />
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
          handleOpenRoute={handleOpenBus}
        />
      )}
    </>
  );
};
