import { RoutesProps } from "./Routes.interface";

// /bus-stop
export interface BusStopInterface {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  images: string[];
  rotas: RoutesProps[];
  favorito?: boolean;
}
