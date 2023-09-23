export interface RoutesBusStopsInterface {
  bus_stops: {
    bus_stop_id: string;
    latitude: number;
    longitude: number;
  }[];
  id: string;
  name: string | null;
}
