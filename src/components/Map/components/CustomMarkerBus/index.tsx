import { memo } from "react";
import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import { BusStopProps } from "~/interfaces/BusStop.interface";
import Bus from "~/assets/svg/bus.svg";
import { ICurrentPosition } from "~/services/CoursesServices/getCurrentPositionId";
import { ModalDescriptionBus } from "../ModalDescriptionBus";
import { useModal } from "~/hooks/useModal";
import { ICourse } from "~/interfaces/RoutesBusStops.interface";
import { Box, Text } from "native-base";
import { getColorFromState } from "~/utils/getColorFromState";

type CustomMarkerProps = {
  course: ICourse;
  handleOpenModal: (data: ICourse) => void;
};

export const CustomMarkerBus = memo(
  ({ course, handleOpenModal }: CustomMarkerProps) => {
    // const { modalRef, handleOpenModal } = useModal();
    return (
      <>
        <Marker
          coordinate={{
            latitude: +course.current_positions?.latitude,
            longitude: +course.current_positions?.longitude,
          }}
          onPress={() => handleOpenModal(course)}
          tracksViewChanges
        >
          <Bus width={scale(40)} height={scale(40)} />
          <Box
            position={"absolute"}
            width={3}
            height={3}
            borderColor={"white"}
            borderWidth={"1px"}
            borderStyle={"solid"}
            background={getColorFromState(course.status)}
            borderRadius={100}
            top={0}
            left={0}
          ></Box>
        </Marker>

        {/* <Box
        position={"absolute"}
        top={0}
        right={0}
        bg={"white"}
        borderRadius={2}
        p={2}
      >
       
      </Box> */}
        {/* <ModalDescriptionBus forwardedRef={modalRef} onClose={() => {}} /> */}
      </>
    );
  }
);
