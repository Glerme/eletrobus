import { EStatusType } from "~/components/BusStatus/StatusInfo/EStatusType";

export interface IMap {
  markers: IMarker[];
}

export interface IMarker {
  id: string;
  title: string;
  image?: string;
  description: string;
  status: EStatusType;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  type: "point" | "bus";
  tipo: "estudantes" | "circulares";
  favorite: boolean;
}
