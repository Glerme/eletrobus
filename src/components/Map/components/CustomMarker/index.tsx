import { Image } from "native-base";
import { Marker } from "react-native-maps";

import busImage from "~/assets/img/bus.png";
import busStopImage from "~/assets/img/bus-stop.png";

import { RouteInterface } from "~/interfaces/Route.interface";

type CustomMarkerProps = {
  marker: RouteInterface;
  handleOpenModal: (data: RouteInterface) => void;
};

export const CustomMarker = ({
  marker,
  handleOpenModal,
}: CustomMarkerProps) => {
  const point = {
    image:
      marker?.markerType === "bus"
        ? require("~/assets/img/bus.png")
        : require("~/assets/img/bus-stop.png"),
    description: marker?.markerType === "bus" ? "Ônibus" : "Ponto de ônibus",
  };

  return (
    <Marker.Animated
      coordinate={{
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
      }}
      onPress={() => handleOpenModal(marker)}
      image={marker?.markerType === "bus" ? busImage : busStopImage}
    >
      {/* <Image source={point.image} alt={point.description} /> */}
    </Marker.Animated>
  );
};
