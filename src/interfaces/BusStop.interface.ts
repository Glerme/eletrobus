import { RoutesProps } from "./Routes.interface";

// /bus-stop
export interface BusStopInterface {
  data: BusStopProps[];
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BusStopProps {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  images: string[];
  routes: RoutesProps[];
  favorito?: boolean;
  description?: string;
}
