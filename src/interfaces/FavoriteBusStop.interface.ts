export interface FavoriteBusStopInterface {
  data: FavoriteBusStopProps[];
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
  image_bus_stop: ImageBusStop[];
}

export interface ImageBusStop {
  image: string;
}
