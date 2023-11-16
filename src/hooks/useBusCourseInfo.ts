import { useState } from "react";
import { BusStopProps } from "~/interfaces/BusStop.interface";
import { ICourse } from "~/interfaces/RoutesBusStops.interface";

export const useBusCourseInfo = () => {
  const [dataCourse, setDataCourse] = useState<ICourse | null>(null);

  return { dataCourse, setDataCourse };
};
