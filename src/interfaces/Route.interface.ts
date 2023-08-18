import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";

export interface RouteInterface {
  id: string;
  name: string;
  image?: string;
  description: string;
  status: EStatusType;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  markerType: "point" | "bus";
  tipo: "estudantes" | "circulares";
  favorite: boolean;
  saida?: Date;
  chegada?: Date;
}
