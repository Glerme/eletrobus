import { useEffect, useRef, useState } from "react";

import { Box } from "native-base";

import { NavigationProps } from "~/routes";

import { useLocation } from "~/contexts/LocationContext";

import { Map } from "~/components/Map";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";
import { useBusStopInfo } from "~/hooks/useBusStopInfo";
import { useBusCourseInfo } from "~/hooks/useBusCourseInfo";
import { useRouteActive } from "~/hooks/useRouteActive";
import { ModalDescriptionPoint } from "~/components/Map/components/ModalDescriptionPoint";
import { ModalDescriptionBus } from "~/components/Map/components/ModalDescriptionBus";
import { Modalize } from "react-native-modalize";
import { ICourse } from "~/interfaces/RoutesBusStops.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  const pointId = route.params?.pointId ?? "";

  const courseId = route.params?.courseId ?? "";

  const [routeId, setRouteId] = useState<string>(route.params?.routeId ?? "");

  const { requestLocationPermissions } = useLocation();
  const { dataPoint, setDataPoint } = useBusStopInfo();
  const { dataCourse, setDataCourse } = useBusCourseInfo();
  const { routeActive } = useRouteActive();
  const modalRefPoint = useRef<Modalize>(null);

  const openModalPoint = (data: BusStopProps) => {
    setDataPoint(data);
    modalRefPoint.current?.open();
  };

  const modalRefCourse = useRef<Modalize>(null);
  const openModalCourse = (data: ICourse) => {
    setDataCourse(data);
    modalRefCourse.current?.open();
  };

  useEffect(() => {
    (async () => await requestLocationPermissions())();
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#0DAC86" }}>
        <Box flex={1}>
          <Map
            pointId={pointId}
            routeId={routeId}
            courseId={courseId}
            openModalCourse={openModalCourse}
            openModalPoint={openModalPoint}
          />

          <ModalDescriptionPoint
            point={dataPoint}
            forwardedRef={modalRefPoint}
            onClose={() => setDataPoint(null)}
            handleOpenRoute={({ id }) => setRouteId(id)}
          />

          <ModalDescriptionBus
            routeActive={routeActive}
            forwardedRef={modalRefCourse}
            course={dataCourse}
            onClose={() => setDataCourse(null)}
          />
        </Box>
      </SafeAreaView>
    </>
  );
};
