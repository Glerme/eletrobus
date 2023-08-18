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

// interface Ponto {
//   id: string;
//   name: string;
//   image?: string;
//   description: string;
//   coordinate: {
//     latitude: number;
//     longitude: number;
//   };
//   markerType: "point";
//   favorite: boolean;
// }
// interface Onibus {
//   id: string;
//   name: string;
//   image?: string;
//   description: string;
//   broken: boolean;
//   coordinate: {
//     latitude: number;
//     longitude: number;
//   };
//   markerType:  "bus";
//   typeBus: "estudantes" | "circulares";
//   driver: DriverInterface
//   course: CourseInterface;
//   busNumber: string;
//   renavam: string;
//   status: EStatusType;
//   favorite: boolean;
//   saida?: Date;
//   chegada?: Date;

// }

interface DriverInterface {}
