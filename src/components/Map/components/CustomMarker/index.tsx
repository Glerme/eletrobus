import { Image, View } from "native-base";
import { Marker } from "react-native-maps";

import { scale } from "react-native-size-matters";

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
    <Marker
      coordinate={{
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
      }}
      onPress={() => handleOpenModal(marker)}
      tracksViewChanges
    >
      <View w={50} h={50}>
        <Image
          source={point.image}
          alt={point.description}
          style={{ height: scale(40), width: scale(40) }}
        />
      </View>
    </Marker>
  );
};
