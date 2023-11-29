import { memo, useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, ActivityIndicator, Linking } from "react-native";

import { Box, Flex } from "native-base";
import { useQuery } from "@tanstack/react-query";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  LocationAccuracy,
  LocationObject,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

import { MapInterface } from "~/interfaces/Map.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { IStatus } from "~/interfaces/Status.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import api from "~/services/axios";
import { getAllBusStopsService } from "~/services/MapServices/getAllBusStopsService";
import { postCurrentPositionId } from "~/services/CoursesServices/postCurrentPositionId";

import { useAuth } from "~/contexts/AuthContext";

import { RootStackParamList } from "~/routes";

import { Alert } from "../Alert";
import { Button } from "../Form/Button";
import { ZoomButtons } from "./components/ZoomButtons";
import { RouteButton } from "./components/RouteButton";
import { StatusButton } from "./components/StatusButton";
import { CustomMarker } from "./components/CustomMarker";
import { StartRunButton } from "./components/StartRunButton";
import { FinalizeButton } from "./components/FinalizeButton";
import { CustomMarkerBus } from "./components/CustomMarkerBus";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { axiosErrorHandler } from "~/functions/axiosErrorHandler";

export const Map = memo(
  ({
    pointId,
    routeId,
    courseId,
    allStatus,
    openModalCourse,
    openModalPoint,
    setRouteActive,
  }: MapInterface) => {
    const mapRef = useRef<MapView>(null);

    const [zoom, setZoom] = useState<number>(17);

    const [busStops, setBusStops] = useState<RoutesBusStopsInterface | null>(
      null
    );
    const [isRunning, setIsRunning] = useState(false);
    const [visibleMarkers, setVisibleMarkers] = useState<any[]>([]);
    const [location, setLocation] = useState<LocationObject | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [timeoutId, setTimeoutId] = useState<any>(null);

    const [region, setRegion] = useState<Region>({
      longitude: location?.coords?.longitude ?? 0,
      latitude: location?.coords?.latitude ?? 0,
      longitudeDelta: 0.005,
      latitudeDelta: 0.005,
    });

    const [statusActive, setStatusActive] = useState<IStatus>();

    const navigation =
      useNavigation<
        NativeStackNavigationProp<RootStackParamList, "Map", undefined>
      >();

    const { user } = useAuth();

    const { data: markers, isLoading } = useQuery<BusStopProps[]>({
      queryKey: ["bus-stop"],
      queryFn: async () => getAllBusStopsService(),
      initialData: [],
      placeholderData: [],
    });

    const getCurrentPosition = useCallback(async () => {
      if (!location) return;
      mapRef.current?.animateCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: zoom,
      });
    }, [location, zoom]);

    const onZoomPress = useCallback(
      (type: "in" | "out") => {
        let currentZoom = type === "in" ? zoom + 1 : zoom - 1;
        if (zoom < 0 && currentZoom < 0) currentZoom = 0;
        setZoom(currentZoom);
        mapRef.current?.animateCamera({
          zoom: currentZoom,
        });
      },
      [zoom]
    );

    const getRouteById = useCallback(async (route_id: string) => {
      try {
        const { data } = await api.get<RoutesBusStopsInterface>(
          `/route/${route_id}`
        );

        setBusStops(data);
        setRouteActive(data);
        return data;
      } catch (e) {
        const axiosError = axiosErrorHandler(e);
        console.error(axiosError);
        return null;
      }
    }, []);

    const handleRegionChange = useCallback(
      (region: Region) => {
        const markersInVisibleArea = markers?.filter(
          ({ latitude, longitude }) => {
            return (
              latitude >= region.latitude - region.latitudeDelta / 2 &&
              latitude <= region.latitude + region.latitudeDelta / 2 &&
              longitude >= region.longitude - region.longitudeDelta / 2 &&
              longitude <= region.longitude + region.longitudeDelta / 2
            );
          }
        );

        if (markersInVisibleArea.length > 0) {
          let maxLat = -90;
          let minLat = 90;
          let maxLng = -180;
          let minLng = 180;
          markersInVisibleArea.forEach((marker) => {
            maxLat = Math.max(maxLat, marker.latitude);
            minLat = Math.min(minLat, marker.latitude);
            maxLng = Math.max(maxLng, marker.longitude);
            minLng = Math.min(minLng, marker.longitude);
          });

          const latitude = (maxLat + minLat) / 2;
          const longitude = (maxLng + minLng) / 2;
          const latitudeDelta = maxLat - minLat + 0.02; // Ajuste para mostrar todos os marcadores
          const longitudeDelta = maxLng - minLng + 0.02; // Ajuste para mostrar todos os marcadores

          setRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          });
        }

        setVisibleMarkers(markersInVisibleArea);
      },
      [markers]
    );

    const cleanParams = useCallback(() => {
      setBusStops(null);
      setRouteActive(null);
      setIsRunning(false);
      navigation.dispatch((state) => {
        const newRoutes = state.routes.map((route) => {
          if (route.name === "Map") {
            return {
              ...route,
              params: {
                routeId: undefined,
                pointId: undefined,
                courseId: undefined,
              },
            };
          }
          return route;
        });

        return CommonActions.reset({
          ...state,
          routes: newRoutes,
        });
      });
    }, [navigation]);

    const navigationToCourses = useCallback(() => {
      if (user?.user.driver) navigation.navigate("Courses");
      else navigation.navigate("Points");
    }, [user, navigation]);

    const requestLocationPermissions = async () => {
      const { granted } = await requestForegroundPermissionsAsync();
      setLocationError(null);

      if (granted) {
        try {
          const currentPosition = await getCurrentPositionAsync();

          setLocation(currentPosition);
          setRegion({
            latitude: currentPosition.coords.latitude,
            longitude: currentPosition.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } catch (error) {
          setLocationError("Falha ao buscar a localização.");
        }
        return;
      }
    };

    useEffect(() => {
      requestLocationPermissions();
    }, []);

    // useEffect(() => {
    //   if (busStops && !user?.user.driver) {
    //     mapRef.current?.animateCamera({
    //       center: {
    //         latitude: busStops.bus_stops[0].latitude,
    //         longitude: busStops.bus_stops[0].longitude,
    //       },
    //       zoom,
    //     });
    //   }
    // }, [busStops]);

    useEffect(() => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const fetchCurrentPositionOfBus = async () => {
        if (!routeId) return;
        if (user?.user.driver) return;

        try {
          await getRouteById(routeId);
        } catch (error) {
          const axiosError = axiosErrorHandler(error);
          console.error(axiosError);
        }

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          fetchCurrentPositionOfBus();
        }, 10000);

        setTimeoutId(newTimeoutId);
      };

      fetchCurrentPositionOfBus();

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      };
    }, [routeId]);

    useEffect(() => {
      if (pointId) {
        const point = markers?.find((marker) => marker.id === pointId) ?? false;
        if (point) {
          mapRef.current?.animateCamera({
            center: { latitude: point.latitude, longitude: point.longitude },
            zoom,
          });
        }
      }
    }, [pointId]);

    useEffect(() => {
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.BestForNavigation,
          timeInterval: 10000,
        },
        async (response) => {
          setLocation(response);

          if (isRunning && user?.user.driver && courseId) {
            try {
              await postCurrentPositionId({
                id: courseId,
                latitude: response?.coords?.latitude ?? 0,
                longitude: response?.coords?.longitude ?? 0,
              });
            } catch (error) {
              const axiosError = axiosErrorHandler(error);

              return axiosError;
            }
          }
        }
      );
    }, [isRunning, courseId, routeId, user?.user?.driver]);

    useEffect(() => {
      if (routeId && user?.user?.driver) {
        getRouteById(routeId);
      }
    }, [routeId, user?.user?.driver]);

    return (
      <>
        <Box flex={1}>
          {isLoading ? (
            <Box flex={1} justifyContent={"center"}>
              <ActivityIndicator color={"white"} size={100} />
            </Box>
          ) : locationError && !location?.coords ? (
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
          ) : location ? (
            routeId && !busStops ? (
              <>
                <Flex
                  flex={1}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDir={"column"}
                  p={2}
                >
                  <Alert status="info" text="Carregando rota..." />
                  <ActivityIndicator
                    color={"white"}
                    size={100}
                    style={{
                      marginTop: 10,
                    }}
                  />
                </Flex>
              </>
            ) : (
              <>
                <RouteButton
                  isRunning={isRunning}
                  cleanParams={cleanParams}
                  busRoute={busStops}
                  setBusRoute={setBusStops}
                  user={user}
                />
                {user?.user.driver && busStops && courseId ? (
                  <>
                    <StartRunButton
                      courseId={courseId}
                      setIsRunning={setIsRunning}
                      isRunning={isRunning}
                      busRoute={busStops}
                      allStatus={allStatus}
                    />

                    {isRunning && (
                      <>
                        <StatusButton
                          setIsRunning={setIsRunning}
                          courseId={courseId}
                          statusActive={statusActive}
                          cleanParams={cleanParams}
                          setStatusActive={setStatusActive}
                          busRoute={busStops}
                          setBusRoute={setBusStops}
                          allStatus={allStatus}
                        />
                        <FinalizeButton
                          courseId={courseId}
                          cleanParams={cleanParams}
                          setBusRoute={setBusStops}
                          setIsRunning={setIsRunning}
                          allStatus={allStatus}
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
                  onRegionChangeComplete={handleRegionChange}
                  initialRegion={region}
                  showsUserLocation={true}
                  showsMyLocationButton={false}
                  scrollEnabled
                  zoomEnabled
                  zoomControlEnabled={false}
                >
                  {busStops?.courses?.map((course) => (
                    <CustomMarkerBus
                      key={course?.id}
                      course={course}
                      handleOpenModal={openModalCourse}
                    />
                  ))}

                  {visibleMarkers?.map((marker, i) => (
                    <CustomMarker
                      key={i}
                      handleOpenModal={openModalPoint}
                      marker={marker}
                    />
                  ))}
                  {/* {busStops &&
                    busStops.bus_stops.map((stop, index) => {
                      if (index < busStops.bus_stops.length - 1) {
                        const origin = stop;
                        const destination = busStops.bus_stops[index + 1];

                        const routeCoordinates = [origin, destination];

                        return (
                          <Polyline
                            coordinates={routeCoordinates}
                            strokeWidth={3}
                            strokeColor="blue"
                            key={index}
                          />
                        );
                      }
                    })} */}
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
                            optimizeWaypoints={false}
                            key={index}
                            mode="DRIVING"
                          />
                        );
                      }
                    })}
                </MapView>
              </>
            )
          ) : (
            <Flex
              flex={1}
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              p={2}
            >
              <Alert status="info" text="Buscando sua localização..." />
              <ActivityIndicator
                color={"white"}
                size={100}
                style={{
                  marginTop: 10,
                }}
              />
            </Flex>
          )}
        </Box>
      </>
    );
  }
);
