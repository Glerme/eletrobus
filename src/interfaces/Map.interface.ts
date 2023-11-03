import { LocationObject } from "expo-location";
import { BusStopProps } from "./BusStop.interface";

export interface MapInterface {
  // location: LocationObject | null;
  // locationError: string | null;
  // markers: BusStopProps[];
  pointId?: string;
  routeId?: string;
}
