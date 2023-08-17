import { Image } from "native-base";
import { Marker } from "react-native-maps";

import { IMarker } from "~/interfaces/IMap";

type CustomMarkerProps = {
  marker: IMarker;
  handleOpenModal: (data: IMarker) => void;
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

  return (
    <Marker
      coordinate={marker.coordinate}
      description={markerDescription[marker.type]}
      onPress={() => handleOpenModal(marker)}
    >
      <Image
        source={imgMarkerType[marker.type]}
        alt={markerDescription[marker.type]}
        style={{
          height: 40,
          width: 40,
          resizeMode: "center",
        }}
      />
    </Marker>
  );
};
