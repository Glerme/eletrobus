import { memo } from "react";
import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import { BusStopProps } from "~/interfaces/BusStop.interface";
import Bus from "~/assets/svg/bus.svg";
import { ICurrentPosition } from "~/services/CoursesServices/getCurrentPositionId";

type CustomMarkerProps = {
  marker: ICurrentPosition;
};

export const CustomMarkerBus = memo(({ marker }: CustomMarkerProps) => {
  return (
    <Marker
      coordinate={{
        latitude: Number(marker.latitude),
        longitude: Number(marker.longitude),
      }}
      // onPress={() => handleOpenModal(marker)}
      tracksViewChanges
    >
      <Bus width={scale(40)} height={scale(40)} />
    </Marker>
  );
});
