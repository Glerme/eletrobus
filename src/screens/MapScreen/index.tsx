import { useEffect, useRef, useState } from "react";

import { Box } from "native-base";
import { Modalize } from "react-native-modalize";
import { useQuery } from "@tanstack/react-query";

import { NavigationProps } from "~/routes";

import { useLocation } from "~/contexts/LocationContext";

import { getAllStatusService } from "~/services/StatusServices/getAllStatusService";

import { IStatus } from "~/interfaces/Status.interface";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import {
  ICourse,
  RoutesBusStopsInterface,
} from "~/interfaces/RoutesBusStops.interface";

import { useBusStopInfo } from "~/hooks/useBusStopInfo";
import { useBusCourseInfo } from "~/hooks/useBusCourseInfo";

import { Map } from "~/components/Map";
import { SafeAreaView } from "~/components/Layouts/SafeAreaView";
import { ModalDescriptionBus } from "~/components/Map/components/ModalDescriptionBus";
import { ModalDescriptionPoint } from "~/components/Map/components/ModalDescriptionPoint";

export const MapScreen = ({ navigation, route }: NavigationProps<"Map">) => {
  const pointId = route.params?.pointId ?? "";
  const courseId = route.params?.courseId ?? "";

  const [routeId, setRouteId] = useState<string>("");

  const { requestLocationPermissions } = useLocation();
  const { dataPoint, setDataPoint } = useBusStopInfo();
  const { dataCourse, setDataCourse } = useBusCourseInfo();
  const [routeActive, setRouteActive] =
    useState<RoutesBusStopsInterface | null>(null);

  const modalRefPoint = useRef<Modalize>(null);
  const modalRefCourse = useRef<Modalize>(null);
  const openModalPoint = (data: BusStopProps) => {
    setDataPoint(data);
    modalRefPoint.current?.open();
  };

  const closeModalPoint = () => {
    modalRefPoint.current?.close();
  };

  const openModalCourse = (data: ICourse) => {
    setDataCourse(data);
    modalRefCourse.current?.open();
  };

  const { data: allStatus } = useQuery<IStatus[]>({
    queryKey: ["all-status"],
    queryFn: async () => getAllStatusService(),
    initialData: [],
    placeholderData: [],
  });

  useEffect(() => {
    (async () => await requestLocationPermissions())();
  }, []);

  useEffect(() => {
    setRouteId(route.params?.routeId ?? "");
  }, [route.params]);

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
            setRouteActive={setRouteActive}
            allStatus={allStatus}
          />

          <ModalDescriptionPoint
            point={dataPoint}
            closeModalPoint={closeModalPoint}
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
