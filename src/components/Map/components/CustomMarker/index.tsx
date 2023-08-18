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
    point: require("~/assets/img/point.png"),
    bus: require("~/assets/img/bus.png"),
  };

  console.log(marker.coordinate);

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
          height: 40,
          width: 40,
          resizeMode: "center",
        }}
      />
    </Marker>
  );
};
