import { memo } from "react";
import { Box } from "native-base";

import { Marker } from "react-native-maps";
import { scale } from "react-native-size-matters";

import Bus from "~/assets/svg/bus.svg";

import { ICourse } from "~/interfaces/RoutesBusStops.interface";

import { getColorFromState } from "~/utils/getColorFromState";

type CustomMarkerProps = {
  course: ICourse;
  handleOpenModal: (data: ICourse) => void;
};

export const CustomMarkerBus = memo(
  ({ course, handleOpenModal }: CustomMarkerProps) => {
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
      </>
    );
  }
);
