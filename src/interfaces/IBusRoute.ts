import { EStatusType } from "../components/BusStatus/StatusInfo/EStatusType";

export interface IBusRoute {
  id: number;
  name: string;
  favorite: boolean;
  saida: Date;
  chegada: Date;
  statusCorrida?: EStatusType;
  trafegando: boolean;
  tipo?: "estudantes" | "todos" | string;
}
