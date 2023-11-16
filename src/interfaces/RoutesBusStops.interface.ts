import { EStatusRun } from "~/enum/EStatusRun";
import { ICurrentPosition } from "~/services/CoursesServices/getCurrentPositionId";

export interface IPosition {
  latitude: string;
  longitude: string;
}

export interface RoutesBusStopsInterface {
  bus_stops: {
    bus_stop_id: string;
    latitude: number;
    longitude: number;
  }[];
  id: string;
  courses: ICourse[];
  name: string | null;
}

export interface ICourse {
  id: string;
  vehicle: any;
  current_positions: IPosition;
  status: EStatusRun;
}
