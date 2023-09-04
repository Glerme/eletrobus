import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";

import { Box } from "native-base";
import MapView from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { MapInterface } from "~/interfaces/Map.interface";
import { RouteInterface } from "~/interfaces/Route.interface";

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
  const [dataPoint, setDataPoint] = useState<RouteInterface | null>(null);

  const {
    location,
    locationError,
    getActualCurrentPosition,
    requestLocationPermissions,
  } = useLocation();

  const openModal = (data: RouteInterface) => {
    setDataPoint(data);
    handleOpenModal();
  };

  const getCurrentPosition = () => {
    mapRef.current?.animateCamera({
      center: location?.coords,
      zoom: 17,
    });
  };

  const onPressRoute = (route: RouteInterface) => {
    mapRef?.current?.animateCamera({
      center: route?.coordinate,
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
              {markers.map((marker, i) => (
                <CustomMarker
                  key={i}
                  marker={marker}
                  handleOpenModal={openModal}
                />
              ))}

              <MapViewDirections
                key={markers[0].id}
                apikey="AIzaSyDj5Q9JKX4XIsYXFde1CZcRuv7Y3P2pZzQ"
                origin={location.coords}
                destination={markers[0].coordinate}
                strokeWidth={3}
                strokeColor="hotpink"
              />
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
          data={dataPoint}
          forwardedRef={modalRef}
          onClose={() => setDataPoint(null)}
        />
      )}
    </>
  );
};
