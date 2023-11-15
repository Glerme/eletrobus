export interface FavoriteBusStopInterface {
  data: FavoriteBusStopProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface FavoriteBusStopProps {
  id: string;
  bus_stop_id: string;
  user_id: string;
  bus_stop: BusStopClass;
}

export interface BusStopClass {
  id: string;
  name: string;
  route_id: null;
  description: string;
  latitude: number;
  longitude: number;
  images: string[];
}
