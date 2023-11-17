import { Dispatch } from "react";

import { IStatus } from "./Status.interface";
import { BusStopProps } from "./BusStop.interface";
import { ICourse } from "./RoutesBusStops.interface";

export interface MapInterface {
  courseId?: string;
  pointId?: string;
  routeId?: string;
  allStatus: IStatus[];
  openModalCourse: (data: ICourse) => void;
  openModalPoint: (data: BusStopProps) => void;
  setRouteActive: Dispatch<any | null>;
}
