import { LocationObject } from "expo-location";
import { BusStopProps } from "./BusStop.interface";
import { ICourse } from "./RoutesBusStops.interface";
import { Dispatch } from "react";

export interface MapInterface {
  // location: LocationObject | null;
  // locationError: string | null;
  // markers: BusStopProps[];

  courseId?: string;
  pointId?: string;
  routeId?: string;
  openModalCourse: (data: ICourse) => void;
  openModalPoint: (data: BusStopProps) => void;
  setRouteActive: Dispatch<any | null>;
}
