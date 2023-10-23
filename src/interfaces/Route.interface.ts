import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";
import { UserGoogleProps } from "./User.interface";

export interface RouteInterface {
  id: string;
  name: string;
  image?: string;
  description: string;
  status: EStatusType;
  coordinate: {
    latitude: number;
    longitude: number;
  }; // fixo qnd for ponto
  coordinateBus: {};
  markerType: MarkerType;
  favorite: boolean;
  saida?: Date;
  chegada?: Date;
}

export type MarkerType = "point" | "bus";

interface Institution {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  avatar: string;
  drivers: Driver[];
  buses: Bus[];
  routes: Route[];
  points: Ponto[];
}

interface Driver extends UserGoogleProps {
  cpf: string;
  cnh: string;
}

interface Bus {
  id: string;
  name: string;
  route: Route;
  status: EStatusType;
  currentPosition: {
    latitude: string;
    longitude: string;
  };
  driver: Driver;
}

interface Route {
  id: string;
  name: string;
  points?: Ponto[] | null;
}

interface Ponto {
  id: string;
  name: string;
  image?: string[];
  description?: string;
  coordinate: {
    latitude: string;
    longitude: string;
  };
  routes?: Route[] | null;
}
