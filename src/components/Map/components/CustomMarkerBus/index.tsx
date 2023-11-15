import { memo } from "react";
import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import { BusStopProps } from "~/interfaces/BusStop.interface";
import Bus from "~/assets/svg/bus.svg";
import { ICurrentPosition } from "~/services/CoursesServices/getCurrentPositionId";
import { ModalDescriptionBus } from "../ModalDescriptionBus";
import { useModal } from "~/hooks/useModal";
import { IPosition } from "~/interfaces/RoutesBusStops.interface";

type CustomMarkerProps = {
  marker: IPosition;
};

export const CustomMarkerBus = memo(({ marker }: CustomMarkerProps) => {
  const { modalRef, handleOpenModal } = useModal();
  console.log(marker);
  return (
    <>
      <Marker
        onPress={() => handleOpenModal()}
        coordinate={{
          latitude: +marker?.latitude,
          longitude: +marker?.longitude,
        }}
        // onPress={() => handleOpenModal(marker)}
        tracksViewChanges
      >
        <Bus width={scale(40)} height={scale(40)} />
      </Marker>
      <ModalDescriptionBus forwardedRef={modalRef} onClose={() => {}} />
    </>
  );
});
