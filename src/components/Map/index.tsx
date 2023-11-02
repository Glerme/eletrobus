import { useEffect, useRef, useState } from "react";
import { StyleSheet, Linking } from "react-native";

import { Box, Flex } from "native-base";
import { List } from "phosphor-react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { MapInterface } from "~/interfaces/Map.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import api from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { useAuth } from "~/contexts/AuthContext";
import { useLocation } from "~/contexts/LocationContext";

import { RootStackParamList } from "~/routes";

import { Alert } from "../Alert";
import { Button } from "../Form/Button";
import { ZoomButtons } from "./components/ZoomButtons";
import { RouteButton } from "./components/RouteButton";
import { StateButton } from "./components/StateButton";
import { CustomMarker } from "./components/CustomMarker";
import { StartRunButton } from "./components/StartRunButton";
import { FinalizeButton } from "./components/FinalizeButton";
import { MyLocationButton } from "./components/MyLocationButton";
import { ModalDescription } from "./components/ModalDescription";
import { BusRouteSelected } from "./components/BusRouteSelected";
import { ListRoutesButton } from "./components/ListRoutesButton";

interface Params {
  routeId?: string;
  pointId?: string;
}

export const Map = ({ markers, pointId, routeId }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();
  const [zoom, setZoom] = useState<number>(17);
  const [dataPoint, setDataPoint] = useState<BusStopProps | null>(null);
  const [busStops, setBusStops] = useState<RoutesBusStopsInterface | null>(
    null
  );

  const [isRunning, setIsRunning] = useState(false);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "Map", undefined>
    >();
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

  const getCurrentPosition = async () => {
    if (!location) return;
    mapRef?.current?.animateCamera({
      center: {
        latitude: location?.coords.latitude,
        longitude: location?.coords.longitude,
      },
      zoom: zoom,
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

  const navigationToCourses = () => {
    if (user?.user.driver) navigation.navigate("Courses");
    else navigation.navigate("Points");
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
          location && (
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
              <ListRoutesButton onPressRoute={navigationToCourses} />
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
          handleOpenRoute={({ route_id }) => handleOpenBus(route_id)}
        />
      )}
    </>
  );
};
