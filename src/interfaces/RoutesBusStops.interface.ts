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
  courses: {
    id: string;
    current_positions: IPosition;
  }[];
  name: string | null;
}
