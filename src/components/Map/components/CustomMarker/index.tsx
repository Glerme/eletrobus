import { Image } from "native-base";
import { Marker } from "react-native-maps";

import { RouteInterface } from "~/interfaces/Route.interface";

type CustomMarkerProps = {
  marker: RouteInterface;
  handleOpenModal: (data: RouteInterface) => void;
};

export const CustomMarker = ({
  marker,
  handleOpenModal,
}: CustomMarkerProps) => {
  const markerDescription = {
    point: "Ponto de ônibus",
    bus: "Ônibus",
  };

  const imgMarkerType = {
    point: require("~/assets/img/bus-stop.png"),
    bus: require("~/assets/img/bus.png"),
  };

  return (
    <Marker
      coordinate={{
        latitude: marker.coordinate.latitude,
        longitude: marker.coordinate.longitude,
      }}
      onPress={() => handleOpenModal(marker)}
    >
      <Image
        source={imgMarkerType[marker.markerType]}
        alt={markerDescription[marker.markerType]}
        style={{
          height: 30,
          width: 30,
          resizeMode: "center",
        }}
      />
    </Marker>
  );
};
