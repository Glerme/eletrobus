import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import { Box } from "native-base";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { MapInterface } from "~/interfaces/Map.interface";
import { RoutesProps } from "~/interfaces/Routes.interface";
import { BusStopInterface } from "~/interfaces/BusStop.interface";
import { RoutesBusStopsInterface } from "~/interfaces/RoutesBusStops.interface";

import { api } from "~/services/axios";

import { useModal } from "~/hooks/useModal";

import { useLocation } from "~/contexts/LocationContext";

import { ZoomButtons } from "./components/ZoomButtons";
import { CustomMarker } from "./components/CustomMarker";
import { MyLocationButton } from "./components/MyLocationButton";
import { ListRoutesButton } from "./components/ListRoutesButton";
import { ModalDescription } from "./components/ModalDescription";

import { THEME } from "~/styles/theme";

export const Map = ({ markers }: MapInterface) => {
  const mapRef = useRef<MapView>(null);

  const { modalRef, handleOpenModal } = useModal();

  const [zoom, setZoom] = useState<number>(17);
  const [dataPoint, setDataPoint] = useState<BusStopInterface | null>(null);
  const [directions, setDirections] = useState<RoutesBusStopsInterface | null>(
    null
  );

  const {
    location,
    locationError,
    getActualCurrentPosition,
    requestLocationPermissions,
  } = useLocation();

  const openModal = (data: BusStopInterface) => {
    setDataPoint(data);
    handleOpenModal();
  };

  const getCurrentPosition = () => {
    mapRef.current?.animateCamera({
      center: location?.coords,
      zoom: 17,
    });
  };

  const onPressRoute = (route: BusStopInterface) => {
    mapRef?.current?.animateCamera({
      center: { latitude: route.latitude, longitude: route.longitude },
      zoom: 17,
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

    console.log({
      test: data?.bus_stops,
    });

    setDirections(data);
  };

  useEffect(() => {
    requestLocationPermissions();
    getActualCurrentPosition();
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
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
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

              {directions && (
                <MapViewDirections
                  apikey="AIzaSyDj5Q9JKX4XIsYXFde1CZcRuv7Y3P2pZzQ"
                  origin={{
                    latitude: directions?.bus_stops[0]?.latitude,
                    longitude: directions?.bus_stops[0]?.longitude,
                  }}
                  destination={{
                    latitude: directions?.bus_stops[1].latitude,
                    longitude: directions?.bus_stops[1].longitude,
                  }}
                  strokeWidth={3}
                  strokeColor="hotpink"
                />
              )}
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
