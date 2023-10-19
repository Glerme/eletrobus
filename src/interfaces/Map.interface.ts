import { BusStopInterface } from "./BusStop.interface";

export interface MapInterface {
  markers: BusStopInterface[];
  pointId?: string;

  routeId?: string;
}
