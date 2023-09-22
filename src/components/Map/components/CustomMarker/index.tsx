import { Image, View } from "native-base";
import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import { BusStopInterface } from "~/interfaces/BusStop.interface";

type CustomMarkerProps = {
  marker: BusStopInterface;
  handleOpenModal: (data: BusStopInterface) => void;
};

export const CustomMarker = ({
  marker,
  handleOpenModal,
}: CustomMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: marker.latitude,
        longitude: marker.longitude,
      }}
      onPress={() => handleOpenModal(marker)}
      tracksViewChanges
    >
      <View w={50} h={50}>
        <Image
          source={require("~/assets/img/bus-stop.png")}
          alt={"Pontos de ônibus"}
          style={{ height: scale(40), width: scale(40) }}
        />
      </View>
    </Marker>
  );
};
