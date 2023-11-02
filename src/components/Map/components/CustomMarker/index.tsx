import { memo } from "react";
import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import { BusStopProps } from "~/interfaces/BusStop.interface";

import BusStop from "~/assets/svg/bus-stop.svg";

type CustomMarkerProps = {
  marker: BusStopProps;
  handleOpenModal: (data: BusStopProps) => void;
};

export const CustomMarker = memo(
  ({ marker, handleOpenModal }: CustomMarkerProps) => {
    return (
      <Marker
        coordinate={{
          latitude: marker.latitude,
          longitude: marker.longitude,
        }}
        onPress={() => handleOpenModal(marker)}
        tracksViewChanges
      >
        <BusStop width={scale(40)} height={scale(40)} />
      </Marker>
    );
  }
);
